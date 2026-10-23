console.log("Chat carregado");

const form = document.getElementById('formChat');

const input = document.getElementById('mensagemInput');

const div = document.getElementById('mensagens');



form.addEventListener('submit', (event) => { 
    event.preventDefault();
    const texto = input.value.trim();
    if (texto === "") {
  return;
}

    const balao= document.createElement("div"); 
    balao.textContent = texto;
    balao.classList.add('usuario');
    div.appendChild(balao);

    const ia = document.createElement("div");
    ia.textContent = "Resposta do servidor: " + texto;
    ia.classList.add('ia');
    div.appendChild(ia);


    input.value = '';
})

