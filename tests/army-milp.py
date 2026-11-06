"""Independent large-army checks using SciPy's HiGHS integer optimizer.

Optional dependency: python -m pip install scipy
Run: python tests/army-milp.py
The standard Node test suites do not require Python or third-party packages.
"""
import json
import pathlib
import random
import subprocess

import numpy as np
from scipy.optimize import Bounds, LinearConstraint, milp

ROOT = pathlib.Path(__file__).resolve().parent.parent
data = json.loads(subprocess.check_output(
    ["node", "-e", "process.stdout.write(JSON.stringify(require('./tests/army-test-helpers.cjs').loadCalculator().unitData))"],
    cwd=ROOT, text=True,
))
types = ["infantry", "vehicles", "aircraft"]
labels = {"Infantry": "infantry", "Vehicles": "vehicles", "Aircraft": "aircraft"}
cases = []
for level in [10, 22, 55, 98, 150, 185, 224, 350]:
    alliance = level * 5 + 1
    for goal in ["attack", "defense", "balanced"]:
        members = min(alliance, level * 5)
        full_cost = sum(members * multiplier * max(
            (unit for unit in data[category] if unit["unlock_lvl"] <= level),
            key=lambda unit: (unit[goal] if goal != "balanced" else unit["attack"] + unit["defense"], -unit["upkeep"]),
        )["upkeep"] for category, multiplier in zip(types, [10, 3, 1]))
        for fraction in [0.05, 0.5]:
            cases.append([level, int(full_cost * fraction) + 1, alliance, goal])
cases += [[350, 1_000_000_000, 1750, "attack"], [350, 10_000_000_000, 1750, "defense"]]
rng = random.Random(0xA17C)
for _ in range(20):
    level = rng.randint(10, 350)
    cases.append([level, rng.randint(1, 2_000_000_000), rng.randint(1, level * 5), rng.choice(["attack", "defense", "balanced"])])

bridge = subprocess.Popen(["node", "tests/army-solver-bridge.cjs"], cwd=ROOT,
                          stdin=subprocess.PIPE, stdout=subprocess.PIPE, text=True)
checked = 0
worst_time = 0
try:
    for level, budget, alliance, goal in cases:
        members = min(alliance, level * 5)
        slots = [members * 10, members * 3, members]
        units = [(category, unit) for category in types for unit in data[category] if unit["unlock_lvl"] <= level]
        values = [unit[goal] if goal != "balanced" else unit["attack"] + unit["defense"] for _, unit in units]
        matrix = [[int(category == target) for category, _ in units] for target in types]
        matrix.append([unit["upkeep"] for _, unit in units])
        oracle = milp(c=-np.array(values, dtype=float), integrality=np.ones(len(units)),
                      bounds=Bounds(0, np.inf),
                      constraints=LinearConstraint(matrix, -np.inf, slots + [budget]),
                      options={"mip_rel_gap": 0, "time_limit": 60})
        assert oracle.success, (level, budget, alliance, goal, oracle.message)
        counts = np.rint(oracle.x).astype(np.int64).tolist()
        assert all(count >= 0 for count in counts)
        assert all(sum(row[i] * counts[i] for i in range(len(units))) <= maximum
                   for row, maximum in zip(matrix, slots + [budget]))
        expected = sum(count * value for count, value in zip(counts, values))
        # Even a tiny reported relative gap can be nonzero from roundoff at
        # million-point objectives. Certify the integer objective using the
        # absolute dual bound, with a margin well below one objective point.
        assert -oracle.mip_dual_bound - expected < 0.999, (level, budget, expected, oracle.mip_dual_bound)
        params = [level, budget, alliance, goal]
        bridge.stdin.write(json.dumps(params) + "\n")
        bridge.stdin.flush()
        actual = json.loads(bridge.stdout.readline())
        assert "error" not in actual, actual
        result = actual["result"]
        objective = result["totalAttack"] if goal == "attack" else result["totalDefense"] if goal == "defense" else result["totalAttack"] + result["totalDefense"]
        assert objective == expected, (params, objective, expected)
        assert result["exact"] is True
        assert result["totalUpkeep"] <= budget
        assert result["remainingUpkeep"] == budget - result["totalUpkeep"]
        for category, maximum in zip(types, slots):
            assert sum(unit["quantity"] for unit in result["army"] if labels[unit["type"]] == category) == maximum
        checked += 1
        worst_time = max(worst_time, actual["milliseconds"])
        print(f"{checked}/{len(cases)} HiGHS comparisons passed: {params} ({actual['milliseconds']:.0f} ms)", flush=True)
finally:
    bridge.terminate()
    bridge.wait()
print(f"Passed {checked} independent large-army MILP comparisons; slowest calculation {worst_time:.0f} ms.")
