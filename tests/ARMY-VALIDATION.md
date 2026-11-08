# Best Army correctness validation

Validated locally on 30 September 2026 with Node 24.13.0, Python 3.13,
and SciPy 1.18.1. All comparisons passed against the final calculator.

| Check | Cases | Independent evidence |
| --- | ---: | --- |
| Generated integer optimization problems | 1,000,000 | Enumerates every affordable combination without production pruning |
| Real troop optimality matrix | 81,657 | Minimum-cost dynamic programming over raw attack/defense values |
| Zero and saturated budgets with alliance cap boundaries | 10,500 | Direct maximum-per-slot arithmetic, across all 350 levels and all three goals |
| Large real armies | 70 | SciPy/HiGHS mixed integer optimization with an integer dual certificate |
| Regular troop data | 97 | Attack, defense, upkeep, and unlock level checked against the three local guides |

The 18 focused test groups also cover invalid inputs, fractional quantities,
duplicate troops, dominance and ties, affordability boundaries, category
filters, result totals, purchase-price completeness, background worker
messages, worker failures, matching script versions on both page routes, and
owned-special results against an independent slot-and-budget dynamic program.

The real-data matrix covers every level from 1 to 350, attack/defense/balanced,
all categories together and each category separately, zero budgets, large
budgets, randomized budgets, and both sides of newly unlocked upkeep costs.
It also checks that increasing the budget never decreases the selected
objective. Generated problems include large integer costs and values, equal
troops, zero slot pools, and shared budgets. 341,545 generated cases and 37,743
matrix cases entered branch-and-bound rather than returning a certified seed.

The large-army checks include the full alliance cap and over-cap inputs at
levels 10, 22, 55, 98, 150, 185, 224, and 350, all three goals, and another 20
randomized armies. Every returned objective matched HiGHS. The slowest local
case took approximately 9.5 seconds while other validation was also running.
Production runs these searches in a Web Worker and never substitutes an
approximation or stops early to report a guessed optimum.

Five actual browser calculations on `/best_army/` matched their reference
attack, defense, upkeep, and purchase totals, including formatted numbers,
zero budgets, every goal, and maximum safe budget / alliance cap inputs.
Troop details and the extensionless `/best_army/` route were also inspected.
Browser alert handling was verified in the automated DOM harness; the browser
automation connector stalled on a native alert during the additional manual
invalid-input check.

## Reproduce the checks

No third-party JavaScript dependencies are needed:

```text
node tests/run-army-tests.cjs
node tests/run-army-tests.cjs --stress
```

The default generated suite uses 30,000 cases; `--stress` runs 1,000,000.
`ARMY_FUZZ_CASES` can override either count. The seeded inputs are deterministic.
Each command exits unsuccessfully on any failing suite.

Run the optional independent large-army solver:

```text
python -m pip install -r tests/requirements-army.txt
python tests/army-milp.py
```

The GitHub Actions workflow runs the stress suite and the large-army solver
on relevant pushes and pull requests. It has been added locally; its remote
execution has not been observed in this task.

## Why the search is exact

Let `x[i]` be the nonnegative integer quantity of an upgrade, `c[i]` its upkeep,
and `v[i]` its gain over the best free troop in that category. The constraints
are one shared upkeep budget `B` and independent slot limits `S[t]`:

```text
maximize sum(v[i] * x[i])
sum(c[i] * x[i]) <= B
sum(x[i] in category t) <= S[t]
```

1. Every category has free troops at every valid player level. Filling unused
   slots with its best free troop cannot reduce the selected objective. Any
   army can therefore be represented as the free baseline plus upgrades.
2. A troop is removed as dominated only when a troop in the same category
   costs no more and has at least as much objective value, with a strict
   improvement in one of those quantities. Replacing it preserves feasibility.
3. Greedy seeds are feasible incumbents, not the final answer unless an upper
   bound certifies them. The remaining search enumerates integer quantities.
4. For any nonnegative rational multiplier `lambda`, define
   `M[t] = max(0, max(v[i] - lambda*c[i]) in category t)`. Then every feasible
   army is bounded by `lambda*B + sum(S[t]*M[t])`. This follows by adding the
   budget inequality and the per-slot maximum inequalities.
5. All bounds and relaxation losses used for pruning are evaluated as rational
   integers with `BigInt`. Floating-point bisection only selects a multiplier;
   any multiplier it selects is valid. No epsilon or floating-point rounding
   decides whether to discard a solution. The objective is integer, so a bound
   below `incumbent + 1` proves that no better solution exists.
6. Selecting one upgrade loses `M[t] - (v[i] - lambda*c[i])` from the relaxation.
   Unspent upkeep and unused slots also have nonnegative loss. An item or branch
   is removed only if its unavoidable loss exceeds the exact room for an
   improvement. The quantity interval includes equality at the improvement
   threshold and is derived from the same inequality for remaining slots.
7. Reported quantities and totals are checked again before returning a result.
   Fractional/duplicate quantities, excess slots, inconsistencies, and an
   exceeded upkeep budget produce an error instead of a displayed army.

Under the current bounded dataset, all troop totals, monetary sums, and slot
counts used outside the rational bounds remain below JavaScript's exact integer
limit. An affordable army of the strongest unlocked troop in every category
is also trivially optimal, so very large budgets use that direct solution.

## Scope of the guarantee

The optimization argument applies to the current regular-troop data and rules:
five active alliance members per level, ten infantry / three vehicles / one
aircraft per active member, unlimited purchases, and one hourly upkeep budget.
Balanced means maximizing attack plus defense. Purchase price is a reported
total, not another budget constraint. War-loot troop selection and inventory
remain outside the model. The calculator can apply the owned Allied Rebels
(-5% upkeep) and Radar Tank (+5% attack) bonuses to the army calculation.

Tests cannot prove that the game will never change. The data audit checks the
repository's guides, not a live game account. Purchase prices are the existing
account-supplied table and have been checked for completeness and arithmetic,
not independently re-observed in-game.
