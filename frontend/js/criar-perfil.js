// Se a pessoa já criou o perfil, não precisa ver essa tela de novo
if (localStorage.getItem('perfilId')) {
    window.location.href = 'chat.html';
}

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

    // ===== CRIAR PERFIL =====
    const form = document.getElementById('formPerfil');

    if (form) {
        form.addEventListener('submit', async (event) => {
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

            const perfil = { nome, sobrenome, idade: Number(idade), cidade, telefone };

            try {
                const response = await fetch('http://localhost:8080/perfis', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(perfil)
                });

                const dados = await response.json();

                if (response.status === 201) {
                    localStorage.setItem('perfilId', dados.id);
                    localStorage.setItem('perfil', JSON.stringify(perfil));
                    window.location.href = 'chat.html';
                } else {
                    alert(dados.message || 'Erro ao criar perfil.');
                }
            } catch (error) {
                console.error('Erro na requisição:', error);
                alert('Não foi possível conectar ao servidor.');
            }
        });
    }
});