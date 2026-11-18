document.addEventListener('DOMContentLoaded', () => {
    const linkAjuda = document.getElementById('linkAjuda');
    const linkConfig = document.getElementById('linkConfig');

    // ===== PAINEL DE AJUDA =====
    const ajuda = document.createElement('div');
    ajuda.className = 'continuar-panel';
    ajuda.id = 'ajudaPanel';
    ajuda.innerHTML = `
        <div class="continuar-header">
            <strong>Ajuda</strong>
            <button id="closeAjuda"><i class="fa-solid fa-xmark"></i></button>
        </div>
        <div class="painel-corpo">
            <h3>Primeiros passos</h3>
            <ol>
                <li>Crie seu perfil na tela inicial.</li>
                <li>Digite sua mensagem e clique em Enviar.</li>
                <li>Use o Pesquisar para achar conversas antigas.</li>
            </ol>

            <h3>Perguntas frequentes</h3>

            <details>
                <summary>Como crio meu perfil?</summary>
                <p>Na tela inicial, clique em "Criar perfil" e preencha seus dados. Você só precisa fazer isso uma vez.</p>
            </details>

            <details>
                <summary>Como encontro uma conversa antiga?</summary>
                <p>Abra o menu e clique em "Pesquisar". Digite uma palavra ou parte do título, e a lista mostra os chats que combinam. Clique em um para continuar.</p>
            </details>

            <details>
                <summary>Como começo uma conversa nova?</summary>
                <p>Em "Pesquisar", clique em "Novo chat".</p>
            </details>

            <details>
                <summary>Como ativo o modo escuro?</summary>
                <p>Clique em "Modo escuro" no menu, ou use as Configurações. A escolha fica salva.</p>
            </details>

            <details>
                <summary>Onde ficam salvas as minhas conversas?</summary>
                <p>No navegador que você está usando. Se limpar os dados do navegador ou trocar de computador, elas não aparecem.</p>
            </details>

            <h3>Contato</h3>
            <p>Não encontrou o que procurava? <a href="mailto:seuemail@exemplo.com">seuemail@exemplo.com</a></p>
        </div>
    `;
    document.body.appendChild(ajuda);

    // ===== PAINEL DE CONFIGURAÇÕES =====
    const config = document.createElement('div');
    config.className = 'continuar-panel';
    config.id = 'configPanel';
    config.innerHTML = `
        <div class="continuar-header">
            <strong>Configurações</strong>
            <button id="closeConfig"><i class="fa-solid fa-xmark"></i></button>
        </div>
        <div class="painel-corpo">
            <h3>Aparência</h3>

            <div class="painel-linha">
                <span>Tema</span>
                <div class="painel-opcoes">
                    <label><input type="radio" name="tema" value="claro"> Claro</label>
                    <label><input type="radio" name="tema" value="escuro"> Escuro</label>
                </div>
            </div>

            <div class="painel-linha">
                <span>Tamanho do texto no chat</span>
                <div class="painel-opcoes">
                    <label><input type="radio" name="fonte" value="pequena"> Pequeno</label>
                    <label><input type="radio" name="fonte" value="media"> Médio</label>
                    <label><input type="radio" name="fonte" value="grande"> Grande</label>
                </div>
            </div>

            <h3>Conversas</h3>

            <div class="painel-linha">
                <span>Baixar meus dados (perfil e conversas)</span>
                <button id="exportarBtn" class="painel-btn"><i class="fa-solid fa-download"></i> Exportar JSON</button>
            </div>

            <div class="painel-linha">
                <span>Apagar todas as conversas salvas</span>
                <button id="limparBtn" class="painel-btn painel-perigo"><i class="fa-solid fa-trash"></i> Apagar conversas</button>
            </div>

            <h3>Conta</h3>

            <div class="painel-linha">
                <span>Apagar meu perfil e todos os dados</span>
                <button id="apagarPerfilBtn" class="painel-btn painel-perigo"><i class="fa-solid fa-user-xmark"></i> Apagar perfil</button>
            </div>

            <p id="avisoConfig" class="painel-aviso"></p>
        </div>
    `;
    document.body.appendChild(config);

    // ===== ABRIR E FECHAR =====
    const fecharOutros = () => {
        document.querySelectorAll('.continuar-panel, .perfil-panel')
            .forEach(painel => painel.classList.remove('open'));
    };

    const fecharEstes = () => {
        ajuda.classList.remove('open');
        config.classList.remove('open');
    };

    const aviso = document.getElementById('avisoConfig');

    // marca as opções conforme o que está salvo agora
    const sincronizar = () => {
        const escuro = document.body.classList.contains('escuro');
        config.querySelectorAll('input[name="tema"]').forEach(r => {
            r.checked = r.value === (escuro ? 'escuro' : 'claro');
        });

        const fonte = localStorage.getItem('fonte') || 'media';
        config.querySelectorAll('input[name="fonte"]').forEach(r => {
            r.checked = r.value === fonte;
        });

        aviso.textContent = '';
    };

    if (linkAjuda) {
        linkAjuda.addEventListener('click', (event) => {
            event.preventDefault();
            fecharOutros();
            ajuda.classList.add('open');
        });
    }

    if (linkConfig) {
        linkConfig.addEventListener('click', (event) => {
            event.preventDefault();
            fecharOutros();
            sincronizar();
            config.classList.add('open');
        });
    }

    document.getElementById('closeAjuda').addEventListener('click', fecharEstes);
    document.getElementById('closeConfig').addEventListener('click', fecharEstes);

    // os painéis também fecham quando o menu fecha ou outro painel abre
    ['sidebarOverlay', 'closeSidebar', 'usuarioSidebar', 'linkPerfil', 'linkContinuar'].forEach(id => {
        const el = document.getElementById(id);
        if (el) el.addEventListener('click', fecharEstes);
    });

    // ===== FUNÇÕES DAS CONFIGURAÇÕES =====

    // tema: reaproveita o botão "Modo escuro" do menu, para os dois ficarem sempre iguais
    config.querySelectorAll('input[name="tema"]').forEach(opcao => {
        opcao.addEventListener('change', () => {
            const querEscuro = opcao.value === 'escuro';
            if (document.body.classList.contains('escuro') === querEscuro) return;

            const temaBtn = document.getElementById('temaBtn');
            if (temaBtn) {
                temaBtn.click();
            } else {
                document.body.classList.toggle('escuro', querEscuro);
                localStorage.setItem('tema', querEscuro ? 'escuro' : 'claro');
            }
        });
    });

    // tamanho do texto
    config.querySelectorAll('input[name="fonte"]').forEach(opcao => {
        opcao.addEventListener('change', () => {
            document.body.classList.remove('fonte-pequena', 'fonte-grande');
            if (opcao.value !== 'media') {
                document.body.classList.add('fonte-' + opcao.value);
            }
            localStorage.setItem('fonte', opcao.value);
        });
    });

    // exportar dados
    document.getElementById('exportarBtn').addEventListener('click', () => {
        const dados = {
            perfil: JSON.parse(localStorage.getItem('perfil') || 'null'),
            conversas: JSON.parse(localStorage.getItem('conversas') || '[]')
        };

        const arquivo = new Blob([JSON.stringify(dados, null, 2)], { type: 'application/json' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(arquivo);
        link.download = 'meus-dados.json';
        link.click();
        URL.revokeObjectURL(link.href);

        aviso.textContent = 'Arquivo meus-dados.json baixado.';
    });

    // apagar conversas
    document.getElementById('limparBtn').addEventListener('click', () => {
        if (confirm('Apagar todas as conversas salvas? Isso não pode ser desfeito.')) {
            localStorage.removeItem('conversas');
            if (window.Historico) window.Historico.nova();
            aviso.textContent = 'Conversas apagadas.';
        }
    });

    // apagar perfil
    document.getElementById('apagarPerfilBtn').addEventListener('click', () => {
        if (confirm('Apagar seu perfil e todos os dados? Você voltará para a tela inicial.')) {
            localStorage.removeItem('perfil');
            localStorage.removeItem('perfilId');
            localStorage.removeItem('conversas');
            window.location.href = 'perfil.html';
        }
    });
});