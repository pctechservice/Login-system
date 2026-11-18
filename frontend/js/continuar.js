document.addEventListener('DOMContentLoaded', () => {
    const link = document.getElementById('linkContinuar');
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('sidebarOverlay');

    if (!link) return;

    // ===== CRIA O PAINEL =====
    const painel = document.createElement('div');
    painel.className = 'continuar-panel';
    painel.innerHTML = `
        <div class="continuar-header">
            <strong>Continuar</strong>
            <button id="closeContinuar"><i class="fa-solid fa-xmark"></i></button>
        </div>
        <button id="novoChat" class="continuar-novo">
            <i class="fa-solid fa-plus"></i> Novo chat
        </button>
        <input type="search" id="buscaChat" placeholder="Buscar palavra ou chat...">
        <div id="listaChats" class="continuar-lista"></div>
    `;
    document.body.appendChild(painel);

    const lista = document.getElementById('listaChats');
    const busca = document.getElementById('buscaChat');

    // tira acentos e maiúsculas, para "açúcar" achar "acucar"
    const normalizar = (texto) =>
        texto.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');

    const fecharPainel = () => painel.classList.remove('open');

    const fecharTudo = () => {
        painel.classList.remove('open');
        if (sidebar) sidebar.classList.remove('open');
        if (overlay) overlay.classList.remove('active');
    };

    // ===== DESENHA A LISTA (já filtrada pela busca) =====
    const desenharLista = () => {
        const termo = normalizar(busca.value.trim());
        lista.innerHTML = '';

        const conversas = window.Historico.todas().filter(c => {
            if (!termo) return true;
            return normalizar(c.titulo).includes(termo) ||
                   c.mensagens.some(m => normalizar(m.texto).includes(termo));
        });

        if (conversas.length === 0) {
            const vazio = document.createElement('p');
            vazio.className = 'continuar-vazio';
            vazio.textContent = termo ? 'Nenhum chat encontrado.' : 'Nenhuma conversa salva ainda.';
            lista.appendChild(vazio);
            return;
        }

        conversas.forEach(c => {
            const item = document.createElement('button');
            item.className = 'continuar-item';

            const nome = document.createElement('span');
            nome.className = 'continuar-titulo';
            nome.textContent = c.titulo;
            item.appendChild(nome);

            // se a palavra está só dentro de uma mensagem, mostra o trecho
            if (termo && !normalizar(c.titulo).includes(termo)) {
                const achada = c.mensagens.find(m => normalizar(m.texto).includes(termo));
                if (achada) {
                    const trecho = document.createElement('span');
                    trecho.className = 'continuar-trecho';
                    trecho.textContent = achada.texto.slice(0, 50);
                    item.appendChild(trecho);
                }
            }

            item.addEventListener('click', () => {
                window.Historico.abrir(c.id);
                fecharTudo();
            });

            lista.appendChild(item);
        });
    };

    // ===== ABRIR E FECHAR =====
    link.addEventListener('click', (event) => {
        event.preventDefault();

        // fecha o painel do perfil, para os dois não ficarem um em cima do outro
        const perfil = document.getElementById('perfilPanel');
        if (perfil) perfil.classList.remove('open');

        busca.value = '';
        desenharLista();
        painel.classList.add('open');
        busca.focus();
    });

    busca.addEventListener('input', desenharLista);
    document.getElementById('closeContinuar').addEventListener('click', fecharPainel);

    document.getElementById('novoChat').addEventListener('click', () => {
        window.Historico.nova();
        fecharTudo();
    });

    // o painel também fecha quando o menu fecha ou o perfil abre
    ['sidebarOverlay', 'closeSidebar', 'usuarioSidebar', 'linkPerfil'].forEach(id => {
        const el = document.getElementById(id);
        if (el) el.addEventListener('click', fecharPainel);
    });
});