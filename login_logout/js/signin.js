let btn = document.querySelector('.fa-eye');

btn.addEventListener('click', () => {
    let inputSenha = document.querySelector('#senha');

    if (inputSenha.getAttribute('type') == 'password') {
        inputSenha.setAttribute('type', 'text');
    } else {
        inputSenha.setAttribute('type', 'password');
    }
});

function entrar() {
    let usuario = document.querySelector('#usuario');
    let senha = document.querySelector('#senha');

    let msgError = document.querySelector('#msgError');
    let listaUser = JSON.parse(localStorage.getItem('listaUser')) || [];

    let userValid = listaUser.find(item => usuario.value === item.userCad && senha.value === item.senhaCad);

    if (userValid) {
        let mathRandom = Math.random().toString(16).substr(2);
        let token = mathRandom + mathRandom;

        localStorage.setItem('token', token);
        localStorage.setItem('userLogado', JSON.stringify(userValid));

        window.location.href = '../../index.html';
    } else {
        msgError.style.display = 'block';
        msgError.innerHTML = 'Usuário ou senha incorretos';
        usuario.focus();
    }
}


  if (userValid) {
    // Armazenar o usuário logado no localStorage
    localStorage.setItem('usuarioLogado', userValid.userCad);

    // Gera um token aleatório para simular login
    let token = (Math.random().toString(16).substr(2) + Math.random().toString(16).substr(2)).toString();
    localStorage.setItem('token', token);
    localStorage.setItem('userLogado', JSON.stringify(userValid));

    window.location.href = '../../index.html';
  } else {
    // Caso usuário ou senha estejam incorretos
    userLabel.style.color = 'red';
    document.querySelector('#usuario').style.borderColor = 'red';
    senhaLabel.style.color = 'red';
    document.querySelector('#senha').style.borderColor = 'red';
    msgError.style.display = 'block';
    msgError.innerHTML = 'Usuário ou senha incorretos';
    document.querySelector('#usuario').focus();
  }


function alterarSenha(usuario, novaSenha) {
  let listaUser = JSON.parse(localStorage.getItem('listaUser')) || [];
  
  let userIndex = listaUser.findIndex(item => item.userCad === usuario);

  if (userIndex !== -1) {
    listaUser[userIndex].senhaCad = novaSenha;
    localStorage.setItem('listaUser', JSON.stringify(listaUser));
  }
}

function alterarSenhaPrompt() {
  let usuario = prompt("Informe o usuário:");
  let novaSenha = prompt("Informe a nova senha:");
  if (usuario && novaSenha) {
    alterarSenha(usuario, novaSenha);
    alert("Senha alterada com sucesso!");
  } else {
    alert("Usuário ou senha inválidos!");
  }
}

