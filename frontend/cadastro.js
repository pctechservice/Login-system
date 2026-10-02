const formLogin = document.querySelector('#formLogin');

if (formLogin) {
  // todo o código do login fica aqui dentro
}
const formulario = document.querySelector('#formCadastro');
const mensagem = document.querySelector('#mensagem');

if (formulario) {
  formulario.addEventListener('submit', async (evento) => {
    evento.preventDefault();

    const username = document.querySelector('#Nome').value.trim();
    const password = document.querySelector('#SenhaCadastro').value;

    if (username === '' || password === '') {
      mensagem.textContent = 'Preencha o usuário e a senha.';
      return;
    }

    try {
      const resposta = await fetch('http://localhost:8080/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: username, password: password })
      });

      if (resposta.status === 201) {
        mensagem.textContent = 'Usuário cadastrado com sucesso!';
        formulario.reset();
      } else if (resposta.status === 409) {
        mensagem.textContent = 'Esse usuário já existe. Escolha outro.';
      } else if (resposta.status === 400 || resposta.status === 422) {
        mensagem.textContent = 'Dados inválidos. Confira o que você digitou.';
      } else {
        mensagem.textContent = 'Erro inesperado (código ' + resposta.status + ').';
      }
    } catch (erro) {
      mensagem.textContent = 'Não foi possível conectar ao servidor.';
    }
  });
}