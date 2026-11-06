(function () {
  function closeOpenDetails() {
    document.querySelectorAll('.best-army-unit-detail:not([hidden]), .best-plan-detail:not([hidden])').forEach(detail => {
      detail.hidden = true;
      detail.setAttribute('aria-hidden', 'true');
    });

    document.querySelectorAll('.best-army-unit-card[aria-expanded="true"], .best-plan-card[aria-expanded="true"]').forEach(card => {
      card.setAttribute('aria-expanded', 'false');
      card.setAttribute('aria-pressed', 'false');
    });
  }

  document.addEventListener('click', event => {
    if (event.target.closest('.best-army-unit-card, .best-plan-card, .best-army-unit-detail, .best-plan-detail')) return;
    closeOpenDetails();
  });
})();
