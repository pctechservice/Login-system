console.log("Frontend carregado");

const form = document.querySelector("form");
const usuario = document.getElementById("Username");
const senha = document.getElementById("Senha");
const mensagem = document.getElementById("mensagem");

if (form && usuario && senha && mensagem) {
  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    console.log("Formulário enviado");

    try {
      const response = await fetch("http://localhost:8080/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: usuario.value, password: senha.value })
      });

      const dados = await response.json();
      console.log(dados);

      if (response.ok) {
        localStorage.setItem("usuario", usuario.value);
        window.location.href = "chat.html";
      } else {
        mensagem.textContent = dados.message;
      }
    } catch (erro) {
      mensagem.textContent = "Não foi possível conectar ao servidor.";
    }
    
  });
}

const mostrarSenha = document.getElementById("mostrarSenha");

mostrarSenha.addEventListener("click", () => {
    if (senha.type === "password") {
        senha.type = "text";
        mostrarSenha.classList.remove("fa-eye");
        mostrarSenha.classList.add("fa-eye-slash");
    } else {
        senha.type = "password";
        mostrarSenha.classList.remove("fa-eye-slash");
        mostrarSenha.classList.add("fa-eye");
    }
});
