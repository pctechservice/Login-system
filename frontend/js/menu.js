document.addEventListener('DOMContentLoaded', () => {
    const menuBtn = document.getElementById('menubtn');
    const closeBtn = document.getElementById('closeSidebar');
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('sidebarOverlay');

    if (!menuBtn || !closeBtn || !sidebar || !overlay) return;

    const abrir = () => {
        sidebar.classList.add('open');
        overlay.classList.add('active');
    };

    const fechar = () => {
        sidebar.classList.remove('open');
        overlay.classList.remove('active');
    };

    menuBtn.addEventListener('click', abrir);
    closeBtn.addEventListener('click', fechar);
    overlay.addEventListener('click', fechar);
});