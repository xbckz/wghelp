document.querySelectorAll('.menuItem > a.toggle').forEach(toggle => {
  toggle.addEventListener('click', function() {
    const menuItem = this.parentElement;
    const content = menuItem.querySelector('.menuContent');
    const arrow = this.querySelector('.menuArrow');

    // Close other open menus safely
    document.querySelectorAll('.menuItem').forEach(item => {
      if (item !== menuItem) {
        item.classList.remove('active');
        const c = item.querySelector('.menuContent');
        if (c) c.style.display = 'none'; 
        const otherArrow = item.querySelector('.menuArrow');
        if (otherArrow) otherArrow.src = 'arrow.png';
      }
    });

    // Toggle current one
    const isOpen = menuItem.classList.toggle('active');
    if (content) content.style.display = isOpen ? 'block' : 'none'; 
    if (arrow) arrow.src = isOpen ? 'arrow_down.png' : 'arrow.png';
  });
});
