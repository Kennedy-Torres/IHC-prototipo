// Função para carregar os dados do usuário logado
function carregarDadosUsuario() {
  let listaUser = JSON.parse(localStorage.getItem('listaUser'));
  let usuarioLogado = JSON.parse(localStorage.getItem('userLogado')); // Carregar como objeto JSON

  if (listaUser && usuarioLogado) {
      let userLogado = listaUser.find(user => user.userCad === usuarioLogado.userCad);

      if (userLogado) {
          document.getElementById('nome').value = userLogado.nomeCad;
          document.getElementById('usuario').value = userLogado.userCad;
          document.getElementById('email').value = userLogado.emailCad || ""; // Adicione o campo de email se não existir
      }
  }
}

// Função para salvar os dados do usuário
function salvarDadosUsuario(event) {
  event.preventDefault();

  let nome = document.getElementById('nome').value;
  let usuario = document.getElementById('usuario').value;
  let email = document.getElementById('email').value;
  let senha = document.getElementById('senha').value;
  let confirmSenha = document.getElementById('confirmSenha').value;

  if (senha !== confirmSenha) {
      alert('As senhas não conferem');
      return;
  }

  let listaUser = JSON.parse(localStorage.getItem('listaUser'));
  let usuarioLogado = JSON.parse(localStorage.getItem('userLogado')); // Carregar como objeto JSON
  let userLogadoIndex = listaUser.findIndex(user => user.userCad === usuarioLogado.userCad);

  if (userLogadoIndex !== -1) {
      listaUser[userLogadoIndex].nomeCad = nome;
      listaUser[userLogadoIndex].userCad = usuario;
      listaUser[userLogadoIndex].emailCad = email;
      listaUser[userLogadoIndex].senhaCad = senha;

      localStorage.setItem('listaUser', JSON.stringify(listaUser));
      localStorage.setItem('userLogado', JSON.stringify(listaUser[userLogadoIndex])); // Atualizar usuarioLogado com os novos dados
      alert('Alterações salvas com sucesso!');
  } else {
      alert('Usuário não encontrado');
  }
}

document.addEventListener('DOMContentLoaded', () => {
  carregarDadosUsuario();
  document.getElementById('profileForm').addEventListener('submit', salvarDadosUsuario);
});

function sair() {
  console.log("Função sair() foi chamada."); // Adicionando um log para depuração
  localStorage.removeItem('userLogado');
  localStorage.removeItem('token');
  window.location.href = './login_logout/html/signin.html'; // Redireciona para a página de login
}
