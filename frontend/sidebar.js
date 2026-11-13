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
                <h3>Histórico</h3>
                <p>Nenhuma atividade ainda.</p>
            </div>
            <div class="panel-aba" id="aba-pagamentos">
                <h3>Pagamentos</h3>
                <p>Nenhuma forma de pagamento cadastrada.</p>
            </div>
            <div class="panel-aba" id="aba-privacidade">
                <h3>Privacidade</h3>
                <p>Aqui ficam as opções de privacidade da sua conta.</p>
            </div>
        </div>
    `;
    document.body.appendChild(painel);

    // ===== 3. ABRIR E FECHAR O PAINEL =====
    const abrirPainel = () => painel.classList.add('open');
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
    itens[0].classList.add('ativo');
    abas[0].classList.add('ativa');
});