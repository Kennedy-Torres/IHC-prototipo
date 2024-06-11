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
  localStorage.removeItem('token');
  localStorage.removeItem('usuarioLogado');
  window.location.href = 'signin.html';
}

function sair() {
  console.log("Função sair() foi chamada."); // Adicionando um log para depuração
  localStorage.removeItem('userLogado');
  localStorage.removeItem('token');
  window.location.href = 'signin.html'; // Redireciona para a página de login
  document.addEventListener('DOMContentLoaded', function () {
    carregarDadosPerfil();
  });
}

document.getElementById('profileForm').addEventListener('submit', function (event) {
  event.preventDefault();
  alterarSenhaForm();
});

document.getElementById('deleteAccountBtn').addEventListener('click', function () {
  deletarConta();
});

function carregarDadosPerfil() {
  const usuarioLogado = localStorage.getItem('usuarioLogado');
  if (!usuarioLogado) {
    alert("Nenhum usuário logado.");
    window.location.href = 'login.html';
    return;
  }

  const listaUser = JSON.parse(localStorage.getItem('listaUser')) || [];
  const usuario = listaUser.find(user => user.userCad === usuarioLogado);

  if (usuario) {
    document.getElementById('nome').value = usuario.nomeCad || '';
    document.getElementById('usuario').value = usuario.userCad;
    document.getElementById('email').value = usuario.emailCad || '';
  } else {
    alert("Usuário não encontrado.");
    window.location.href = 'login.html';
  }
}

function alterarSenhaForm() {
  const usuario = document.getElementById('usuario').value.trim();
  const novaSenha = document.getElementById('senha').value.trim();
  const confirmSenha = document.getElementById('confirmSenha').value.trim();

  if (!usuario || !novaSenha || !confirmSenha) {
    alert("Por favor, preencha todos os campos.");
    return;
  }

  if (novaSenha !== confirmSenha) {
    alert("As senhas não coincidem.");
    return;
  }

  alterarSenha(usuario, novaSenha);
  alert("Senha alterada com sucesso!");
  sair(); // Deslogar e redirecionar para a página de login
}

function alterarSenha(usuario, novaSenha) {
  let listaUser = JSON.parse(localStorage.getItem('listaUser')) || [];

  let userIndex = listaUser.findIndex(item => item.userCad === usuario);

  if (userIndex !== -1) {
    listaUser[userIndex].senhaCad = novaSenha;
    localStorage.setItem('listaUser', JSON.stringify(listaUser));
  }
}

function deletarConta() {
  const usuario = document.getElementById('usuario').value.trim();

  if (!usuario) {
    alert("Por favor, preencha o campo de usuário.");
    return;
  }

  let listaUser = JSON.parse(localStorage.getItem('listaUser')) || [];

  let userIndex = listaUser.findIndex(item => item.userCad === usuario);

  if (userIndex !== -1) {
    listaUser.splice(userIndex, 1);
    localStorage.setItem('listaUser', JSON.stringify(listaUser));
    alert("Conta deletada com sucesso!");
    sair(); // Deslogar e redirecionar para a página de login
  } else {
    alert("Usuário não encontrado.");
  }
}

