// Esta parte seleciona o botão com a classe 'fa-eye'.
let btn = document.querySelector('.fa-eye');

// Adiciona um evento de clique ao botão selecionado.
btn.addEventListener('click', () => {
    // Seleciona o campo de senha através do seu id.
    let inputSenha = document.querySelector('#senha');

    // Verifica se o tipo do campo de senha é 'password'.
    if (inputSenha.getAttribute('type') == 'password') {
        // Se for 'password', muda para 'text' para mostrar a senha.
        inputSenha.setAttribute('type', 'text');
    } else {
        // Se não for 'password', muda para 'password' para esconder a senha.
        inputSenha.setAttribute('type', 'password');
    }
});

// Função para realizar login.
function entrar() {
    // Seleciona os campos de usuário e senha.
    let usuario = document.querySelector('#usuario');
    let senha = document.querySelector('#senha');

    // Seleciona a mensagem de erro.
    let msgError = document.querySelector('#msgError');

    // Obtém a lista de usuários armazenada no localStorage ou cria uma lista vazia.
    let listaUser = JSON.parse(localStorage.getItem('listaUser')) || [];

    // Procura na lista de usuários um usuário que tenha o mesmo usuário e senha informados.
    let userValid = listaUser.find(item => usuario.value === item.userCad && senha.value === item.senhaCad);

    // Se o usuário for válido, gera um token aleatório, armazena o usuário logado e redireciona para a página principal.
    if (userValid) {
        let mathRandom = Math.random().toString(16).substr(2);
        let token = mathRandom + mathRandom;

        localStorage.setItem('token', token);
        localStorage.setItem('usuarioLogado', userValid.userCad); // Armazenar o usuário logado

        window.location.href = '../../index.html';
    } else {
        // Caso contrário, exibe uma mensagem de erro e mantém o foco no campo de usuário.
        msgError.style.display = 'block';
        msgError.innerHTML = 'Usuário ou senha incorretos';
        usuario.focus();
    }
}

// Função para alterar a senha de um usuário específico.
function alterarSenha(usuario, novaSenha) {
    // Obtém a lista de usuários armazenada no localStorage ou cria uma lista vazia.
    let listaUser = JSON.parse(localStorage.getItem('listaUser')) || [];
    
    // Encontra o índice do usuário na lista.
    let userIndex = listaUser.findIndex(item => item.userCad === usuario);

    // Se o usuário existir na lista, atualiza a senha e armazena a lista atualizada no localStorage.
    if (userIndex !== -1) {
        listaUser[userIndex].senhaCad = novaSenha;
        localStorage.setItem('listaUser', JSON.stringify(listaUser));
    }
}

// Função para solicitar e alterar a senha do usuário através de prompts.
function alterarSenhaPrompt() {
    // Solicita ao usuário que informe o nome de usuário e a nova senha.
    let usuario = prompt("Informe o usuário:");
    let novaSenha = prompt("Informe a nova senha:");
    // Se ambos os valores forem fornecidos, chama a função para alterar a senha e exibe um alerta de sucesso.
    if (usuario && novaSenha) {
        alterarSenha(usuario, novaSenha);
        alert("Senha alterada com sucesso!");
    } else {
        // Caso contrário, exibe um alerta informando que os valores fornecidos são inválidos.
        alert("Usuário ou senha inválidos!");
    }
}
