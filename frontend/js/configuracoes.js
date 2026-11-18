document.addEventListener('DOMContentLoaded', () => {
    const aviso = document.getElementById('aviso');
    const mostrarAviso = (texto) => {
        aviso.textContent = texto;
    };

    // ===== TEMA =====
    const temaSalvo = localStorage.getItem('tema') === 'escuro' ? 'escuro' : 'claro';

    document.querySelectorAll('input[name="tema"]').forEach(opcao => {
        opcao.checked = opcao.value === temaSalvo;

        opcao.addEventListener('change', () => {
            document.body.classList.toggle('escuro', opcao.value === 'escuro');
            localStorage.setItem('tema', opcao.value);
        });
    });

    // ===== TAMANHO DO TEXTO =====
    const fonteSalva = localStorage.getItem('fonte') || 'media';

    document.querySelectorAll('input[name="fonte"]').forEach(opcao => {
        opcao.checked = opcao.value === fonteSalva;

        opcao.addEventListener('change', () => {
            document.body.classList.remove('fonte-pequena', 'fonte-grande');
            if (opcao.value !== 'media') {
                document.body.classList.add('fonte-' + opcao.value);
            }
            localStorage.setItem('fonte', opcao.value);
        });
    });

    // ===== EXPORTAR DADOS =====
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

        mostrarAviso('Arquivo meus-dados.json baixado.');
    });

    // ===== APAGAR CONVERSAS =====
    document.getElementById('limparBtn').addEventListener('click', () => {
        if (confirm('Apagar todas as conversas salvas? Isso não pode ser desfeito.')) {
            localStorage.removeItem('conversas');
            mostrarAviso('Conversas apagadas.');
        }
    });

    // ===== APAGAR PERFIL =====
    document.getElementById('apagarPerfilBtn').addEventListener('click', () => {
        if (confirm('Apagar seu perfil e todos os dados? Você voltará para a tela inicial.')) {
            localStorage.removeItem('perfil');
            localStorage.removeItem('perfilId');
            localStorage.removeItem('conversas');
            window.location.href = 'perfil.html';
        }
    });
});

