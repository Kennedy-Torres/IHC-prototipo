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
        localStorage.setItem('usuarioLogado', userValid.userCad); // Armazenar o usuário logado

        window.location.href = '../../index.html';
    } else {
        msgError.style.display = 'block';
        msgError.innerHTML = 'Usuário ou senha incorretos';
        usuario.focus();
    }
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
