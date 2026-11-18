document.addEventListener('DOMContentLoaded', () => {
    const botao = document.getElementById('temaBtn');
    const texto = document.getElementById('temaTexto');
    const icone = botao ? botao.querySelector('i') : null;

    // liga ou desliga a classe "escuro" no body
    const aplicarTema = (escuro) => {
        document.body.classList.toggle('escuro', escuro);

        if (texto) texto.textContent = escuro ? 'Modo claro' : 'Modo escuro';
        if (icone) {
            icone.classList.toggle('fa-moon', !escuro);
            icone.classList.toggle('fa-sun', escuro);
        }
    };

    // ao abrir a página, lê a escolha que ficou salva
    aplicarTema(localStorage.getItem('tema') === 'escuro');

    // ao clicar, inverte e salva
    if (botao) {
        botao.addEventListener('click', (event) => {
            event.preventDefault();

            const ficouEscuro = !document.body.classList.contains('escuro');
            aplicarTema(ficouEscuro);
            localStorage.setItem('tema', ficouEscuro ? 'escuro' : 'claro');
        });
    }

    // tamanho do texto salvo nas configurações
    const fonte = localStorage.getItem('fonte');
    if (fonte === 'pequena' || fonte === 'grande') {
        document.body.classList.add('fonte-' + fonte);
    }
});