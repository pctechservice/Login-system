(() => {
    const raiz = document.documentElement;

    const LARGURA_PADRAO = 260;
    const LARGURA_MINIMA = 200;
    const LIMITE_PARA_RECOLHER = 120;
    const maximo = () => Math.min(420, Math.floor(window.innerWidth * 0.5));

    const aplicar = (px) => raiz.style.setProperty('--sidebar-w', px + 'px');

    // largura salva da última vez (ou o padrão; em tela estreita, começa recolhida)
    const salvo = localStorage.getItem('sidebarLargura');
    let largura = salvo !== null
        ? Number(salvo)
        : (window.innerWidth < 500 ? 0 : LARGURA_PADRAO);

    aplicar(largura);

    // guarda a última largura aberta, para o clique duplo reabrir no mesmo tamanho
    let ultimaAberta = largura > 0 ? largura : LARGURA_PADRAO;

    // ===== PAINEL ABERTO: o chat abre espaço para ele =====
    document.addEventListener('DOMContentLoaded', () => {
        const atualizarPainel = () => {
            const aberto = document.querySelector('.perfil-panel.open, .continuar-panel.open');
            document.body.classList.toggle('painel-aberto', !!aberto);
        };

        // os painéis são criados pelo JS e abrem trocando a classe "open"
        new MutationObserver(atualizarPainel).observe(document.body, {
            subtree: true,
            childList: true,
            attributes: true,
            attributeFilter: ['class']
        });

        atualizarPainel();
    });

    // ===== ARRASTAR A SIDEBAR =====
    document.addEventListener('DOMContentLoaded', () => {
        const barra = document.getElementById('sidebarResizer');
        if (!barra) return;

        let arrastando = false;

        const guardar = () => localStorage.setItem('sidebarLargura', largura);

        barra.addEventListener('pointerdown', (event) => {
            arrastando = true;
            barra.setPointerCapture(event.pointerId);
            document.body.classList.add('arrastando');
            event.preventDefault();
        });

        barra.addEventListener('pointermove', (event) => {
            if (!arrastando) return;
            largura = Math.max(0, Math.min(event.clientX, maximo()));
            aplicar(largura);
        });

        const soltar = () => {
            if (!arrastando) return;
            arrastando = false;
            document.body.classList.remove('arrastando');

            // arrastou quase tudo para a esquerda: recolhe; senão respeita o mínimo
            largura = largura < LIMITE_PARA_RECOLHER ? 0 : Math.max(LARGURA_MINIMA, largura);
            if (largura > 0) ultimaAberta = largura;

            aplicar(largura);
            guardar();
        };

        barra.addEventListener('pointerup', soltar);
        barra.addEventListener('pointercancel', soltar);

        // clique duplo: recolhe ou reabre
        barra.addEventListener('dblclick', () => {
            largura = largura > 0 ? 0 : ultimaAberta;
            aplicar(largura);
            guardar();
        });

        // se a janela diminuir, a sidebar não pode passar do limite
        window.addEventListener('resize', () => {
            if (largura > maximo()) {
                largura = maximo();
                aplicar(largura);
            }
        });
    });
})();

