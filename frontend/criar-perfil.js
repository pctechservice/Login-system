document.addEventListener('DOMContentLoaded', function () {

    // ===== MENU LATERAL =====
    const menuBtn = document.getElementById('menubtn');
    const closeBtn = document.getElementById('closeSidebar');
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('sidebarOverlay');

    const toggleMenu = () => {
        if (sidebar && overlay) {
            sidebar.classList.toggle('open');
            overlay.classList.toggle('active');
        }
    };

    if (menuBtn) menuBtn.addEventListener('click', toggleMenu);
    if (closeBtn) closeBtn.addEventListener('click', toggleMenu);
    if (overlay) overlay.addEventListener('click', toggleMenu);

    // ===== NOME NA SIDEBAR =====
    const nomeEl = document.getElementById('nomeUsuario');
    const emailEl = document.getElementById('emailUsuario');
    const perfilSalvo = localStorage.getItem('perfil');

    if (perfilSalvo) {
        const perfil = JSON.parse(perfilSalvo);
        if (nomeEl) nomeEl.textContent = perfil.nome + ' ' + perfil.sobrenome;
        if (emailEl) emailEl.textContent = perfil.idade + ' anos';
    }

    // ===== CRIAR PERFIL =====
    const form = document.getElementById('formPerfil');

    if (form) {
        form.addEventListener('submit', (event) => {
            event.preventDefault();

            const nome = document.getElementById('nome').value.trim();
            const sobrenome = document.getElementById('sobrenome').value.trim();
            const idade = document.getElementById('idade').value.trim();
            const cidade = document.getElementById('cidade').value.trim();
            const telefone = document.getElementById('telefone').value.trim();

            if (!nome || !sobrenome || !idade) {
                alert('Preencha pelo menos nome, sobrenome e idade.');
                return;
            }

            const perfil = { nome, sobrenome, idade, cidade, telefone };

            // o localStorage só guarda texto, então o objeto vira texto com JSON.stringify
            localStorage.setItem('perfil', JSON.stringify(perfil));

            alert('Perfil criado com sucesso!');
            window.location.href = 'perfil.html';
        });
    }
});