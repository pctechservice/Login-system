document.addEventListener('DOMContentLoaded', () => {
    const fecharTodos = () => {
        document.querySelectorAll('.perfil-panel, .continuar-panel')
            .forEach(painel => painel.classList.remove('open'));
    };

    // qual painel cada item do menu abre
    const painelDoItem = {
        linkContinuar: () => document.getElementById('buscaChat')?.closest('.continuar-panel'),
        linkConfig: () => document.getElementById('configPanel'),
        linkAjuda: () => document.getElementById('ajudaPanel'),
        usuarioSidebar: () => document.getElementById('perfilPanel')
    };

    // clicar no item do menu cujo painel já está aberto fecha o painel
    // (o "true" no final faz este código rodar antes dos outros, que abririam de novo)
    document.addEventListener('click', (event) => {
        const item = event.target.closest('#linkContinuar, #linkConfig, #linkAjuda, #usuarioSidebar');
        if (!item) return;

        const painel = painelDoItem[item.id]();
        if (painel && painel.classList.contains('open')) {
            event.preventDefault();
            event.stopImmediatePropagation();
            painel.classList.remove('open');
        }
    }, true);

    // Esc fecha os painéis
    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') fecharTodos();
    });
});