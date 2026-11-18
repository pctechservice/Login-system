console.log("Chat carregado");

const form = document.getElementById('formChat');
const input = document.getElementById('mensagemInput');
const div = document.getElementById('mensagens');

// ===== CONVERSAS SALVAS NO NAVEGADOR =====
const Historico = {
    atual: null, // id da conversa aberta (null = conversa nova, ainda sem mensagens)

    todas() {
        try {
            return JSON.parse(localStorage.getItem('conversas')) || [];
        } catch (erro) {
            return [];
        }
    },

    salvar(lista) {
        localStorage.setItem('conversas', JSON.stringify(lista));
    },

    desenhar(tipo, texto) {
        const balao = document.createElement('div');
        balao.textContent = texto;
        balao.classList.add(tipo);
        div.appendChild(balao);
    },

    adicionar(tipo, texto) {
        this.desenhar(tipo, texto);

        const lista = this.todas();
        let conversa = lista.find(c => c.id === this.atual);

        // primeira mensagem: cria a conversa e usa o começo do texto como título
        if (!conversa) {
            conversa = { id: Date.now(), titulo: texto.slice(0, 40), mensagens: [], atualizada: Date.now() };
            lista.unshift(conversa);
            this.atual = conversa.id;
        }

        conversa.mensagens.push({ tipo, texto });
        conversa.atualizada = Date.now();
        this.salvar(lista);
    },

    abrir(id) {
        const conversa = this.todas().find(c => c.id === id);
        if (!conversa) return;

        this.atual = id;
        div.innerHTML = '';
        conversa.mensagens.forEach(m => this.desenhar(m.tipo, m.texto));
    },

    nova() {
        this.atual = null;
        div.innerHTML = '';
    }
};

// deixa o Historico disponível para o continuar.js
window.Historico = Historico;

// ===== ENVIAR MENSAGEM =====
const formChat = document.getElementById("formChat");
const titulo = document.querySelector(".main-content h1");

formChat.addEventListener("submit", function () {
    titulo.style.display = "none";
});


if (form) {
    form.addEventListener('submit', (event) => {
        event.preventDefault();

        const texto = input.value.trim();
        if (texto === '') {
            return;
        }

        Historico.adicionar('usuario', texto);
        Historico.adicionar('ia', 'Resposta do servidor: ' + texto);

        input.value = '';
    });
}

// ===== MENU LATERAL =====
document.addEventListener('DOMContentLoaded', () => {

    const menuBtn = document.getElementById('menubtn');
    const closeBtn = document.getElementById('closeSidebar');
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('sidebarOverlay');


    if (menuBtn && closeBtn && sidebar && overlay) {
        menuBtn.addEventListener('click', () => {
            sidebar.classList.add('open');
            overlay.classList.add('active');
        });

        closeBtn.addEventListener('click', () => {
            sidebar.classList.remove('open');
            overlay.classList.remove('active');
        });

        overlay.addEventListener('click', () => {
            sidebar.classList.remove('open');
            overlay.classList.remove('active');
        });
    }

    
});