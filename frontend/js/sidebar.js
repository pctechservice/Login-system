document.addEventListener('DOMContentLoaded', () => {

    // ===== 1. PREENCHE O RODAPÉ COM OS DADOS SALVOS =====
    const nomeEl = document.getElementById('nomeUsuario');
    const infoEl = document.getElementById('emailUsuario');
    const card = document.getElementById('usuarioSidebar');

    const salvo = localStorage.getItem('perfil');
    const perfil = salvo ? JSON.parse(salvo) : null;

    if (perfil) {
        if (nomeEl) nomeEl.textContent = perfil.nome + ' ' + perfil.sobrenome;

        // segunda linha: e-mail (se existir) ou idade
        if (infoEl) {
            infoEl.textContent = perfil.email ? perfil.email : perfil.idade + ' anos';
        }
    }

    // ===== 2. CRIA O PAINEL LATERAL =====
    const nomeCompleto = perfil ? perfil.nome + ' ' + perfil.sobrenome : 'John Doe';
    const idade = perfil ? perfil.idade + ' anos' : '-';
    const cidade = perfil && perfil.cidade ? perfil.cidade : 'Não informada';
    const telefone = perfil && perfil.telefone ? perfil.telefone : 'Não informado';

    const painel = document.createElement('div');
    painel.className = 'perfil-panel';
    painel.id = 'perfilPanel';
    painel.innerHTML = `
        <div class="panel-header">
            <div class="panel-avatar"><i class="fa-solid fa-user"></i></div>
            <div>
                <strong>${nomeCompleto}</strong>
                <small>${idade}</small>
            </div>
            <button id="closePanel"><i class="fa-solid fa-xmark"></i></button>
        </div>

        <nav class="panel-menu">
            <button class="panel-item" data-alvo="aba-dados">
                <i class="fa-solid fa-id-card"></i> Dados pessoais
            </button>
            <button class="panel-item" data-alvo="aba-historico">
                <i class="fa-solid fa-clock-rotate-left"></i> Histórico
            </button>
            <button class="panel-item" data-alvo="aba-pagamentos">
                <i class="fa-solid fa-credit-card"></i> Pagamentos
            </button>
            <button class="panel-item" data-alvo="aba-privacidade">
                <i class="fa-solid fa-lock"></i> Privacidade
            </button>
        </nav>

        <div class="panel-conteudo">
            <div class="panel-aba" id="aba-dados">
                <h3>Dados pessoais</h3>
                <p><strong>Nome:</strong> ${nomeCompleto}</p>
                <p><strong>Idade:</strong> ${idade}</p>
                <p><strong>Cidade:</strong> ${cidade}</p>
                <p><strong>Telefone:</strong> ${telefone}</p>
            </div>

            <div class="panel-aba" id="aba-historico">
                <h3>Histórico de Conversas</h3>
                <div id="listaHistoricoPanel" class="historico-lista"></div>
                <button id="btnLimparHistorico" class="btn-acao-perigo" style="margin-top: 15px;">
                    <i class="fa-solid fa-trash"></i> Apagar Histórico
                </button>
            </div>

            <div class="panel-aba" id="aba-pagamentos">
                <h3>Pagamentos</h3>
                <p>Nenhuma forma de pagamento cadastrada.</p>
            </div>

            <div class="panel-aba" id="aba-privacidade">
                <h3>Configurações de Privacidade</h3>
                
                <div class="setting-item">
                    <label>
                        <input type="checkbox" id="toggleSalvarHistorico" checked>
                        Salvar histórico de conversas localmente
                    </label>
                </div>

                <div class="setting-item" style="margin-top: 15px;">
                    <label>
                        <input type="checkbox" id="toggleTreinamento">
                        Permitir uso de dados para melhoria da IA
                    </label>
                </div>

                <div style="margin-top: 25px;">
                    <button id="btnExportarDados" class="btn-acao-secundario">
                        <i class="fa-solid fa-download"></i> Exportar meus dados (JSON)
                    </button>
                </div>
            </div>
        </div>
    `;
    document.body.appendChild(painel);

    // ===== 3. ABRIR E FECHAR O PAINEL =====
    const abrirPainel = () => {
        carregarHistoricoNoPainel(); // atualiza a lista sempre que abrir o painel
        painel.classList.add('open');
    };
    const fecharPainel = () => painel.classList.remove('open');

    if (card) card.addEventListener('click', abrirPainel);
    document.getElementById('closePanel').addEventListener('click', fecharPainel);

    // fecha o painel junto com a sidebar
    const overlay = document.getElementById('sidebarOverlay');
    const closeSidebar = document.getElementById('closeSidebar');
    if (overlay) overlay.addEventListener('click', fecharPainel);
    if (closeSidebar) closeSidebar.addEventListener('click', fecharPainel);

    // ===== 4. TROCAR DE ABA DENTRO DO PAINEL =====
    const itens = painel.querySelectorAll('.panel-item');
    const abas = painel.querySelectorAll('.panel-aba');

    itens.forEach(item => {
        item.addEventListener('click', () => {
            itens.forEach(i => i.classList.remove('ativo'));
            abas.forEach(a => a.classList.remove('ativa'));

            item.classList.add('ativo');
            document.getElementById(item.dataset.alvo).classList.add('ativa');
        });
    });

    // abre já na primeira aba
    if (itens.length > 0) {
        itens[0].classList.add('ativo');
        abas[0].classList.add('ativa');
    }

    // ===== 5. LÓGICA DA ABA DE HISTÓRICO =====
    const containerHistorico = painel.querySelector('#listaHistoricoPanel');
    
    function carregarHistoricoNoPainel() {
        const chatsSalvos = JSON.parse(localStorage.getItem('chats_ia')) || [];
        containerHistorico.innerHTML = '';

        if (chatsSalvos.length === 0) {
            containerHistorico.innerHTML = '<p class="vazio">Nenhuma conversa encontrada.</p>';
            return;
        }

        chatsSalvos.forEach(chat => {
            const itemChat = document.createElement('div');
            itemChat.className = 'historico-item-painel';
            itemChat.innerHTML = `
                <span><i class="fa-solid fa-message"></i> ${chat.titulo || 'Nova Conversa'}</span>
                <small>${chat.data || ''}</small>
            `;
            
            itemChat.addEventListener('click', () => {
                if (typeof carregarConversa === 'function') {
                    carregarConversa(chat.id);
                }
                fecharPainel();
            });

            containerHistorico.appendChild(itemChat);
        });
    }

    carregarHistoricoNoPainel();

    const btnLimparHistorico = painel.querySelector('#btnLimparHistorico');
    btnLimparHistorico.addEventListener('click', () => {
        if (confirm('Tem certeza que deseja apagar todo o seu histórico de conversas?')) {
            localStorage.removeItem('chats_ia');
            carregarHistoricoNoPainel();
        }
    });

    // ===== 6. LÓGICA DA ABA DE PRIVACIDADE =====
    const toggleHistorico = painel.querySelector('#toggleSalvarHistorico');
    const toggleTreinamento = painel.querySelector('#toggleTreinamento');
    const btnExportar = painel.querySelector('#btnExportarDados');

    const configsSalvas = JSON.parse(localStorage.getItem('user_configs')) || { salvarHistorico: true, treinamento: false };
    toggleHistorico.checked = configsSalvas.salvarHistorico;
    toggleTreinamento.checked = configsSalvas.treinamento;

    toggleHistorico.addEventListener('change', (e) => {
        configsSalvas.salvarHistorico = e.target.checked;
        localStorage.setItem('user_configs', JSON.stringify(configsSalvas));
    });

    toggleTreinamento.addEventListener('change', (e) => {
        configsSalvas.treinamento = e.target.checked;
        localStorage.setItem('user_configs', JSON.stringify(configsSalvas));
    });

    btnExportar.addEventListener('click', () => {
        const dadosExportacao = {
            perfil: JSON.parse(localStorage.getItem('perfil')) || {},
            historicoConversas: JSON.parse(localStorage.getItem('chats_ia')) || [],
            configuracoes: configsSalvas,
            dataExportacao: new Date().toISOString()
        };

        const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(dadosExportacao, null, 2));
        const downloadAnchor = document.createElement('a');
        downloadAnchor.setAttribute("href", dataStr);
       downloadAnchor.setAttribute("download", `meus_dados_ia_${Date.now()}.json`);
        document.body.appendChild(downloadAnchor);
        downloadAnchor.click();
        downloadAnchor.remove();
    });

    // ===== 7. SAIR (LOGOUT) =====
    const sair = document.querySelector('.menu-sair');
    if (sair) {
        sair.addEventListener('click', () => {
            localStorage.removeItem('perfilId');
            localStorage.removeItem('perfil');
        });
    }

    
});