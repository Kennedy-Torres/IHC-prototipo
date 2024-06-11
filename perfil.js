// Função que é executada quando o DOM da página é completamente carregado
document.addEventListener('DOMContentLoaded', () => {
    // Carrega os dados do usuário logado
    carregarDadosUsuario();
    // Adiciona um ouvinte de evento para o envio do formulário de perfil
    document.getElementById('profileForm').addEventListener('submit', salvarDadosUsuario);
  });
  
  // Função para carregar os dados do usuário logado
  function carregarDadosUsuario() {
    // Obtém a lista de usuários e o usuário logado do localStorage
    let listaUser = JSON.parse(localStorage.getItem('listaUser'));
    let usuarioLogado = JSON.parse(localStorage.getItem('userLogado'));
  
    // Verifica se há uma lista de usuários e um usuário logado
    if (listaUser && usuarioLogado) {
      // Encontra o usuário logado na lista de usuários
      let userLogado = listaUser.find(user => user.userCad === usuarioLogado.userCad);
  
      // Se o usuário logado for encontrado na lista
      if (userLogado) {
        // Preenche os campos do formulário de perfil com os dados do usuário logado
        document.getElementById('nome').value = userLogado.nomeCad;
        document.getElementById('usuario').value = userLogado.userCad;
        document.getElementById('email').value = userLogado.emailCad || "";
      }
    }
  }
  
  // Função para salvar os dados do usuário
  function salvarDadosUsuario(event) {
    // Previne o comportamento padrão de envio do formulário
    event.preventDefault();
  
    // Obtém os valores dos campos do formulário de perfil
    let nome = document.getElementById('nome').value;
    let usuario = document.getElementById('usuario').value;
    let email = document.getElementById('email').value;
    let senha = document.getElementById('senha').value;
    let confirmSenha = document.getElementById('confirmSenha').value;
  
    // Verifica se as senhas coincidem
    if (senha !== confirmSenha) {
      alert('As senhas não conferem');
      return;
    }
  
    // Obtém a lista de usuários e o usuário logado do localStorage
    let listaUser = JSON.parse(localStorage.getItem('listaUser'));
    let usuarioLogado = JSON.parse(localStorage.getItem('userLogado'));
    
    // Encontra o índice do usuário logado na lista de usuários
    let userLogadoIndex = listaUser.findIndex(user => user.userCad === usuarioLogado.userCad);
  
    // Se o usuário logado for encontrado na lista
    if (userLogadoIndex !== -1) {
      // Atualiza os dados do usuário logado na lista de usuários
      listaUser[userLogadoIndex].nomeCad = nome;
      listaUser[userLogadoIndex].userCad = usuario;
      listaUser[userLogadoIndex].emailCad = email;
      listaUser[userLogadoIndex].senhaCad = senha;
  
      // Salva a lista de usuários atualizada no localStorage
      localStorage.setItem('listaUser', JSON.stringify(listaUser));
      // Atualiza os dados do usuário logado no localStorage
      localStorage.setItem('userLogado', JSON.stringify(listaUser[userLogadoIndex]));
      alert('Alterações salvas com sucesso!');
    } else {
      alert('Usuário não encontrado');
    }
  }
  
  // Função para efetuar o logout do usuário
  function sair() {
    // Remove os dados do usuário e o token do localStorage
    localStorage.removeItem('userLogado');
    localStorage.removeItem('token');
    // Redireciona o usuário para a página de login
    window.location.href = 'signin.html';
  }
  
  // Função para carregar os dados do perfil do usuário
  function carregarDadosPerfil() {
    // Obtém o usuário logado do localStorage
    const usuarioLogado = localStorage.getItem('usuarioLogado');
  
    // Se não houver um usuário logado, redireciona para a página de login
    if (!usuarioLogado) {
      alert("Nenhum usuário logado.");
      window.location.href = 'login.html';
      return;
    }
  
    // Obtém a lista de usuários do localStorage
    const listaUser = JSON.parse(localStorage.getItem('listaUser')) || [];
    
    // Encontra o usuário logado na lista de usuários
    const usuario = listaUser.find(user => user.userCad === usuarioLogado);
  
    // Se o usuário logado for encontrado na lista
    if (usuario) {
      // Preenche os campos do formulário de perfil com os dados do usuário
      document.getElementById('nome').value = usuario.nomeCad || '';
      document.getElementById('usuario').value = usuario.userCad;
      document.getElementById('email').value = usuario.emailCad || '';
    } else {
      alert("Usuário não encontrado.");
      window.location.href = 'login.html';
    }
  }
  
  // Função para alterar a senha do usuário
  function alterarSenhaForm() {
    // Obtém os valores dos campos do formulário de perfil
    const usuario = document.getElementById('usuario').value.trim();
    const novaSenha = document.getElementById('senha').value.trim();
    const confirmSenha = document.getElementById('confirmSenha').value.trim();
  
    // Verifica se todos os campos foram preenchidos
    if (!usuario || !novaSenha || !confirmSenha) {
      alert("Por favor, preencha todos os campos.");
      return;
    }
  
    // Verifica se as senhas coincidem
    if (novaSenha !== confirmSenha) {
      alert("As senhas não coincidem.");
      return;
    }
  
    // Chama a função para alterar a senha
    alterarSenha(usuario, novaSenha);
    alert("Senha alterada com sucesso!");
    // Realiza o logout e redireciona para a página de login
    sair();
  }
  
  // Função para alterar a senha do usuário
  function alterarSenha(usuario, novaSenha) {
    // Obtém a lista de usuários do localStorage
    let listaUser = JSON.parse(localStorage.getItem('listaUser')) || [];
    
    // Encontra o índice do usuário na lista de usuários
    let userIndex = listaUser.findIndex(item => item.userCad === usuario);
  
    // Se o usuário for encontrado na lista
    if (userIndex !== -1) {
      // Atualiza a senha do usuário na lista de usuários
      listaUser[userIndex].senhaCad = novaSenha;
      // Salva a lista de usuários atualizada no localStorage
      localStorage.setItem('listaUser', JSON.stringify(listaUser));
    }
  }
  
  // Função para deletar a conta do usuário
  function deletarConta() {
    // Obtém o usuário do campo de entrada
    const usuario = document.getElementById('usuario').value.trim();
  
    // Verifica se o campo de usuário está preenchido
    if (!usuario) {
      alert("Por favor, preencha o campo de usuário.");
      return;
    }
  
    // Obtém a lista de usuários do localStorage
    let listaUser = JSON.parse(localStorage.getItem('listaUser')) || [];
  
    // Encontra o índice do usuário na lista de usuários
    let userIndex = listaUser.findIndex(item => item.userCad === usuario);
  
    // Se o usuário for encontrado na lista
    if (userIndex !== -1) {
      // Remove o usuário da lista de usuários
      listaUser.splice(userIndex, 1);
      // Salva a lista de usuários atualizada no localStorage
      localStorage.setItem('listaUser', JSON.stringify(listaUser));
      alert("Conta deletada com sucesso!");
      // Realiza o logout e redireciona para a página de login
      sair();
    } else {
      alert("Usuário não encontrado.");
    }
  }
  