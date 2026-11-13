console.log("Chat carregado");

const form = document.getElementById('formChat');
const input = document.getElementById('mensagemInput');
const div = document.getElementById('mensagens');

if (form) {
    form.addEventListener('submit', (event) => {
        event.preventDefault();
        const texto = input.value.trim();
        if (texto === "") {
            return;
        }

        const balao = document.createElement("div");
        balao.textContent = texto;
        balao.classList.add('usuario');
        div.appendChild(balao);

        const ia = document.createElement("div");
        ia.textContent = "Resposta do servidor: " + texto;
        ia.classList.add('ia');
        div.appendChild(ia);

        input.value = '';
    });
}

document.addEventListener('DOMContentLoaded', () => {

    // ===== MENU LATERAL =====
    const menuBtn = document.getElementById('menubtn');
    const closeBtn = document.getElementById('closeSidebar');
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('sidebarOverlay');

    const abrirMenu = () => {
        sidebar.classList.add('open');
        overlay.classList.add('active');
    };

    const fecharMenu = () => {
        sidebar.classList.remove('open');
        overlay.classList.remove('active');
    };

    if (menuBtn && closeBtn && sidebar && overlay) {
        menuBtn.addEventListener('click', abrirMenu);
        closeBtn.addEventListener('click', fecharMenu);
        overlay.addEventListener('click', fecharMenu);
    }

    // ===== TROCAR DE SEÇÃO (chat e configurações) =====
    const rotas = {
        "link-chat": "secao-chat",
        "link-config": "secao-config"
    };

    const secoes = document.querySelectorAll(".secao-conteudo");

    Object.keys(rotas).forEach(idLink => {
        const link = document.getElementById(idLink);

        if (link) {
            link.addEventListener("click", (event) => {
                event.preventDefault();

                secoes.forEach(secao => {
                    secao.style.display = "none";
                });

                const secaoAlvo = document.getElementById(rotas[idLink]);

                if (secaoAlvo) {
                    secaoAlvo.style.display = rotas[idLink] === "secao-chat" ? "flex" : "block";
                }

                fecharMenu();
            });
        }
    });
});