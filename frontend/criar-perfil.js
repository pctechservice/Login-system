document  .addEventListener('DOMContentLoaded', function() {

    // ==========================================
    // 1. LÓGICA DO MENU LATERAL (SIDEBAR)
    // ==========================================
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

    // ==========================================
    // 2. LÓGICA DA API COM O SERVIDOR GO
    // ==========================================


    const form = document.querySelector ('.formulario')

    if (form) { 
        form.addEventListener('submit', async(event) => {
        
           event.preventDefault();

           const nome = document.getElementById('nome').value.trim();
           const email = document.getElementById('email').value.trim();
           const senha = document.getElementById('senha').value.trim();

           if (!nome || !email || !senha) {
                alert('Por favor, preencha todos os campos.');
                return;
           }
        
           try {
                const response = await fetch('http://localhost:8080/api/criar-perfil', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ username: nome, email: email, password: senha })
                });

                const dados = await response.json();

                if (response.ok) {
                    alert('Perfil criado com sucesso!');
                    form.reset();
                } else {
                    alert(`Erro ao criar perfil: ${dados.mensagem}`);
                }
            } catch (error) {
                console.error('Erro na requisição:', error);
                alert('Ocorreu um erro ao criar o perfil. Por favor, tente novamente mais tarde.');
            }
        });
    }
});