console.log("Frontend carregado");

const usuario = document.getElementById("Username");
const senha = document.getElementById("senha");
const form = document.querySelector("form");
const mensagem = document.getElementById("mensagem");


form.addEventListener("submit", async (event) => {
  event.preventDefault();
  console.log("Formulário enviado");

const response = await fetch("http://localhost:8080/login", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ username: usuario.value, password: senha.value })
});
const dados = await response.json();
cong(sole.lodados);
mensagem.textContent = "Algum texto...";
});



