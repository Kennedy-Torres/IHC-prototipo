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
    localStorage.removeItem('userLogado');
    localStorage.removeItem('token');
    window.location.href = './login_logout/html/signin.html'; // Redireciona para a página de login
}

  function perfil() {
    window.location.replace('../login_logout/html/perfil.html');
  }
