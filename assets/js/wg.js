document.querySelectorAll('.menuItem > .toggle').forEach(toggle => {
  toggle.addEventListener('click', function() {
    const menuItem = this.parentElement;
    const content = menuItem.querySelector('.menuContent');
    const arrow = this.querySelector('.menuArrow');

    // Close other open menus safely
    document.querySelectorAll('.menuItem').forEach(item => {
      if (item !== menuItem) {
        item.classList.remove('active');
        const c = item.querySelector('.menuContent');
        if (c) c.style.display = 'none'; // ✅ check before using
        const otherToggle = item.querySelector('.toggle');
        if (otherToggle) otherToggle.setAttribute('aria-expanded', 'false');
        const otherArrow = item.querySelector('.menuArrow');
        if (otherArrow) otherArrow.src = 'assets/images/ui/arrow.webp';
      }
    });

    // Toggle current one
    const isOpen = menuItem.classList.toggle('active');
    this.setAttribute('aria-expanded', String(isOpen));
    if (content) content.style.display = isOpen ? 'block' : 'none'; // ✅ safe check
    if (arrow) arrow.src = isOpen ? 'assets/images/ui/arrow_down.webp' : 'assets/images/ui/arrow.webp';
  });
});
