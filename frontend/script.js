const formLogin = document.getElementById("login-form");

if (formLogin) {
  const usuario = document.getElementById("Username");
  const senha = document.getElementById("senha");
  const mensagem = document.getElementById("mensagem");

  formLogin.addEventListener("submit", async (event) => {
    event.preventDefault();

    try {
      const response = await fetch("http://localhost:8080/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: usuario.value,
          password: senha.value,
        }),
      });

      const dados = await response.json();
      mensagem.textContent = dados.message;

      if (dados.success === true) {
        const username =
          typeof dados.username === "string" && dados.username.trim()
            ? dados.username.trim()
            : usuario.value.trim();
        const params = new URLSearchParams({ username });

        window.setTimeout(() => {
          window.location.href = `perfil.html?${params.toString()}`;
        }, 1000);
      }
    } catch (error) {
      mensagem.textContent = "Não foi possível conectar ao servidor. Tente novamente.";
    }
  });
}

const formCadastro = document.getElementById("cadastro-form");
if (formCadastro) {
  const usuarioCadastro = document.getElementById("usernameCadastro");
  const senhaCadastro = document.getElementById("senhaCadastro");
  const mensagemCadastro = document.getElementById("mensagemCadastro");

  formCadastro.addEventListener("submit", async (event) => {
    event.preventDefault();

    try {
      const response = await fetch("http://localhost:8080/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: usuarioCadastro.value,
          password: senhaCadastro.value,
        }),
      });

      const dados = await response.json();
      mensagemCadastro.textContent = dados.message;
    } catch (error) {
      mensagemCadastro.textContent = "Não foi possível conectar ao servidor. Tente novamente.";
    }
  });
}

const profileUsername = document.getElementById("profile-username");
if (profileUsername) {
  const params = new URLSearchParams(window.location.search);
  const username = params.get("username") || "Usuário";
  profileUsername.textContent = username;

  const profileUsernameCard = document.getElementById("profile-username-card");
  if (profileUsernameCard) {
    profileUsernameCard.textContent = username;
  }

  const profileAvatar = document.getElementById("profile-avatar");
  if (profileAvatar) {
    profileAvatar.textContent = username.charAt(0).toUpperCase();
  }
}

const logoutButton = document.getElementById("logout-button");
if (logoutButton) {
  logoutButton.addEventListener("click", () => {
    window.location.href = "login.html";
  });
}
