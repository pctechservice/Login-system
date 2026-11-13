// Se a pessoa já criou o perfil, não precisa ver essa tela de novo
if (localStorage.getItem('perfilId')) {
    window.location.href = 'chat.html';
}

document.addEventListener('DOMContentLoaded', () => {

    // ===== NOME NA SIDEBAR =====
    const nomeEl = document.getElementById('nomeUsuario');
    const emailEl = document.getElementById('emailUsuario');
    const cardUsuario = document.getElementById('usuarioSidebar');

    const perfilSalvo = localStorage.getItem('perfil');

    if (perfilSalvo) {
        // JSON.parse transforma o texto de volta em objeto
        const perfil = JSON.parse(perfilSalvo);

        if (nomeEl) nomeEl.textContent = perfil.nome + ' ' + perfil.sobrenome;
        if (emailEl) emailEl.textContent = perfil.idade + ' anos';
    }

    // ===== MENU LATERAL =====
    const menuBtn = document.getElementById('menubtn');
    const closeBtn = document.getElementById('closeSidebar');
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('sidebarOverlay');

    const openMenu = () => {
        sidebar.classList.add('open');
        overlay.classList.add('active');
    };

    const closeMenu = () => {
        sidebar.classList.remove('open');
        overlay.classList.remove('active');
    };

    if (menuBtn) menuBtn.addEventListener('click', openMenu);
    if (closeBtn) closeBtn.addEventListener('click', closeMenu);
    if (overlay) overlay.addEventListener('click', closeMenu);
});