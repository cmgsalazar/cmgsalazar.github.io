function checkOverflow() {
    const grid = document.querySelector('.grid');
    const gridWidth = grid.offsetWidth;
    const contentWidth = Array.from(grid.children).reduce((total, child) => total + child.offsetWidth, 0);
    const gapWidth = (grid.children.length - 1) * 30; // 30px gap between items

    if (contentWidth + gapWidth > gridWidth) {
        grid.classList.add('overflow');
    } else {
        grid.classList.remove('overflow');
    }
}

// Run on page load
window.addEventListener('load', checkOverflow);

// Run on window resize
window.addEventListener('resize', checkOverflow);
