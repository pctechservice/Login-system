document.addEventListener('DOMContentLoaded', () => {
    // Seleciona os elementos do HTML
    const menuBtn = document.getElementById('menubtn');
    const closeBtn = document.getElementById('closeSidebar');
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('sidebarOverlay');

    // Função para abrir o menu
    const openMenu = () => {
        sidebar.classList.add('open');
        overlay.classList.add('active');
    };

    // Função para fechar o menu
    const closeMenu = () => {
        sidebar.classList.remove('open');
        overlay.classList.remove('active');
    };

    // Eventos de clique
    if (menuBtn) {
        menuBtn.addEventListener('click', openMenu);
    }

    if (closeBtn) {
        closeBtn.addEventListener('click', closeMenu);
    }

    if (overlay) {
        overlay.addEventListener('click', closeMenu);
    }
});

