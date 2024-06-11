// Verifica se existe um token de autenticação armazenado no localStorage
if (localStorage.getItem("token") == null) {
  // Se não houver token, exibe um alerta informando que o usuário precisa estar logado
  alert("Você precisa estar logado para acessar essa página");
  // Redireciona o usuário para a página de login
  window.location.href = "./login_logout/html/signin.html";
} else {
  // Se houver um token armazenado, significa que o usuário está logado
  // Obtém os dados do usuário logado do localStorage
  const userLogado = JSON.parse(localStorage.getItem("userLogado"));

  // Seleciona o elemento com o ID "logado" para exibir uma saudação personalizada
  const logado = document.querySelector("#logado");
  logado.innerHTML = `Olá ${userLogado.nome}`;

  // Modifica o ícone de usuário para exibir "Logout" quando logado
  const userIcon = document.getElementById("userIcon");
  userIcon.innerHTML = '<i class="bx bx-log-out"></i>';

  // Adiciona um ouvinte de evento ao botão de logout
  userIcon.addEventListener("click", sair);
}

// Função para efetuar o logout do usuário
function sair() {
  // Remove os dados do usuário e o token do localStorage
  localStorage.removeItem('userLogado');
  localStorage.removeItem('token');
  // Redireciona o usuário para a página de login
  window.location.href = './login_logout/html/signin.html';
}

// Função para redirecionar o usuário para a página de perfil
function perfil() {
  window.location.replace('../login_logout/html/perfil.html');
}
