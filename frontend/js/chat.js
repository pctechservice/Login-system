console.log("Chat carregado");

let chatAtualId = "chat_" + Date.now();

function salvarMensagemNoHistorico(role, texto) {
    // 1. Verifica se o usuário desativou o salvamento na aba Privacidade
    const configs = JSON.parse(localStorage.getItem('user_configs')) || { salvarHistorico: true };
    if (!configs.salvarHistorico) return;

    // 2. Busca os chats existentes ou cria uma lista vazia
    let chats = JSON.parse(localStorage.getItem('chats_ia')) || [];
    let chatExistente = chats.find(c => c.id === chatAtualId);

    if (!chatExistente) {
        // Se for a primeira mensagem desse chat, cria um novo registro
        chatExistente = {
            id: chatAtualId,
            titulo: texto.substring(0, 30) + (texto.length > 30 ? '...' : ''), // Usa o início da 1ª msg como título
            data: new Date().toLocaleDateString('pt-BR'),
            mensagens: []
        };
        chats.unshift(chatExistente); 
    }

    // 3. Adiciona a mensagem e salva de volta no localStorage
    chatExistente.mensagens.push({ role: role, content: texto });
    localStorage.setItem('chats_ia', JSON.stringify(chats));
}

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

        salvarMensagemNoHistorico('user', texto);
        salvarMensagemNoHistorico('assistant', ia.textContent);

    });
}

function carregarConversa(id) {
            const chatsSalvos = JSON.parse(localStorage.getItem('chats_ia')) || [];
            const chatSelecionado = chatsSalvos.find(c => c.id === id);

            div.innerHTML = '';

            if (chatSelecionado) {
                chatAtualId = id;
                chatSelecionado.mensagens.forEach(msg => {
                    const balao = document.createElement("div");
                    balao.textContent = msg.content;
                    balao.classList.add(msg.role === 'user' ? 'usuario' : 'ia');
                    div.appendChild(balao);
                    
                });
            }
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