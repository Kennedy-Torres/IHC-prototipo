if (localStorage.getItem("token") == null) {
  alert("Você precisa estar logado para acessar essa página");
  window.location.href = "./login_logout/html/signin.html";
} else {
  const userLogado = JSON.parse(localStorage.getItem("userLogado"));

  const logado = document.querySelector("#logado");
  logado.innerHTML = `Olá ${userLogado.nome}`;

  // Modifica o ícone de usuário para exibir "Logout" quando logado
  const userIcon = document.getElementById("userIcon");
  userIcon.innerHTML = '<i class="bx bx-log-out"></i>';

  // Adiciona um ouvinte de evento ao botão de logout
  userIcon.addEventListener("click", sair);
}

function sair() {
  localStorage.removeItem("token");
  localStorage.removeItem("userLogado");
  window.location.href = "./login_logout/html/signin.html";
}