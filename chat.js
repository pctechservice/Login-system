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
document.addEventListener("DOMContentLoaded", () => {
  const menuBtn = document.getElementById("menubtn");
  const menu = document.querySelector(".menu");

  // Abre e fecha o menu ao clicar no botão hambúrguer
  menuBtn.addEventListener("click", (event) => {
    event.stopPropagation(); // Impede que o clique propague para o resto da página
    menu.classList.toggle("aberto");
  });

  // Fecha o menu automaticamente se o usuário clicar em qualquer outro lugar da tela
  document.addEventListener("click", () => {
    if (menu.classList.contains("aberto")) {
      menu.classList.remove("aberto");
    }
  });

  // Evita fechar o menu se o usuário clicar dentro dele
  menu.addEventListener("click", (event) => {
    event.stopPropagation();
  });
});
// Mapeia os links do menu e suas respectivas seções
const rotas = {
    "link-chat": "secao-chat",
    "link-perfil": "secao-perfil",
    "link-config": "secao-config"
  };
// Seleciona todas as seções de conteúdo
  const secoes = document.querySelectorAll(".secao-conteudo");
  const menu = document.querySelector(".menu");

  // Adiciona o evento de clique para cada link mapeado
  Object.keys(rotas).forEach(idLink => {
    const link = document.getElementById(idLink);
    
    if (link) {
      link.addEventListener("click", (event) => {
        event.preventDefault(); // Impede a página de recarregar ou subir o scroll

        // 1. Esconde todas as seções
        secoes.forEach(secao => {
          secao.style.display = "none";
        });

        // 2. Mostra apenas a seção que o usuário clicou
        const idSecaoAlvo = rotas[idLink];
        const secaoAlvo = document.getElementById(idSecaoAlvo);
        
        if (secaoAlvo) {
          // Se for a seção de chat, usamos 'flex' para manter seu layout corrigido
          if (idSecaoAlvo === "secao-chat") {
            secaoAlvo.style.display = "flex";
          } else {
            secaoAlvo.style.display = "block";
          }
        }

        // 3. Fecha o menu hambúrguer após o clique
        menu.classList.remove("aberto");
      });
    }
  });
