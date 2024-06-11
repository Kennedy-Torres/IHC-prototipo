/*---REGISTRANDO OS DADOS DO USUÁRIO---*/
// Selecionando os botões para mostrar/esconder a senha
let btn = document.querySelector('#verSenha')
let btnConfirm = document.querySelector('#verConfirmSenha')

// Selecionando os campos de entrada e labels para nome, usuário, email, senha, confirmar senha
let nome = document.querySelector('#nome')
let labelNome = document.querySelector('#labelNome')
let validNome = false // Variável para rastrear a validade do campo nome

let usuario = document.querySelector('#usuario')
let labelUsuario = document.querySelector('#labelUsuario')
let validUsuario = false // Variável para rastrear a validade do campo usuário

let email = document.querySelector('#Email')
let labelEmail = document.querySelector('#labelEmail')
let validEmail = false // Variável para rastrear a validade do campo email

let senha = document.querySelector('#senha')
let labelSenha = document.querySelector('#labelSenha')
let validSenha = false // Variável para rastrear a validade do campo senha

let confirmSenha = document.querySelector('#confirmSenha')
let labelConfirmSenha = document.querySelector('#labelConfirmSenha')
let validConfirmSenha = false // Variável para rastrear a validade do campo confirmar senha

let msgError = document.querySelector('#msgError') // Mensagem de erro
let msgSuccess = document.querySelector('#msgSuccess') // Mensagem de sucesso

// Event listener para o campo nome
nome.addEventListener('keyup', () => {
  // Verifica o comprimento do nome
  if(nome.value.length <= 2){
    // Se o nome é muito curto, mostra mensagem de erro
    labelNome.setAttribute('style', 'color: red')
    labelNome.innerHTML = 'Nome *Insira no mínimo 3 caracteres'
    nome.setAttribute('style', 'border-color: red')
    validNome = false
  } else {
    // Se o nome é válido, mostra mensagem de sucesso
    labelNome.setAttribute('style', 'color: green')
    labelNome.innerHTML = 'Nome'
    nome.setAttribute('style', 'border-color: green')
    validNome = true
  }
})

// Event listener para o campo usuário, similar ao anterior
usuario.addEventListener('keyup', () => {
  if(usuario.value.length <= 4){
    labelUsuario.setAttribute('style', 'color: red')
    labelUsuario.innerHTML = 'Usuário *Insira no mínimo 5 caracteres'
    usuario.setAttribute('style', 'border-color: red')
    validUsuario = false
  } else {
    labelUsuario.setAttribute('style', 'color: green')
    labelUsuario.innerHTML = 'Usuário'
    usuario.setAttribute('style', 'border-color: green')
    validUsuario = true
  }
})

// Event listener para o campo email
email.addEventListener('keyup', () => {
  // Validação básica do email apenas pelo comprimento do texto inserido
  if(email.value.length <= 4){
    labelEmail.setAttribute('style', 'color: red')
    labelEmail.innerHTML = 'Email *Inválido'
    usuario.setAttribute('style', 'border-color: red') // Parece um erro, deveria ser 'email'
    validEmail = false
  } else {
    labelEmail.setAttribute('style', 'color: green')
    labelEmail.innerHTML = 'Email'
    email.setAttribute('style', 'border-color: green')
    validEmail = true
  }
})

// Event listener para o campo senha
senha.addEventListener('keyup', () => {
  // Verifica se a senha tem no mínimo 6 caracteres
  if(senha.value.length <= 5){
    labelSenha.setAttribute('style', 'color: red')
    labelSenha.innerHTML = 'Senha *Insira no mínimo 6 caracteres'
    senha.setAttribute('style', 'border-color: red')
    validSenha = false
  } else {
    labelSenha.setAttribute('style', 'color: green')
    labelSenha.innerHTML = 'Senha'
    senha.setAttribute('style', 'border-color: green')
    validSenha = true
  }
})

// Event listener para o campo confirmar senha
confirmSenha.addEventListener('keyup', () => {
  // Verifica se a senha e a confirmação são iguais
  if(senha.value != confirmSenha.value){
    labelConfirmSenha.setAttribute('style', 'color: red')
    labelConfirmSenha.innerHTML = 'Confirmar Senha *As senhas não conferem'
    confirmSenha.setAttribute('style', 'border-color: red')
    validConfirmSenha = false
  } else {
    labelConfirmSenha.setAttribute('style', 'color: green')
    labelConfirmSenha.innerHTML = 'Confirmar Senha'
    confirmSenha.setAttribute('style', 'border-color: green')
    validConfirmSenha = true
  }
})

// Função para cadastrar o usuário
function cadastrar(){
  // Verifica se todos os campos estão válidos
  if(validNome && validUsuario && validSenha && validConfirmSenha){
    let listaUser = JSON.parse(localStorage.getItem('listaUser') || '[]')
    
    // Adiciona os dados do usuário a uma lista
    listaUser.push({
      nomeCad: nome.value,
      userCad: usuario.value,
      emailCad: email.value,
      senhaCad: senha.value
    });
    
    // Armazena a lista de usuários no localStorage
    localStorage.setItem('listaUser', JSON.stringify(listaUser))
    
    // Exibe mensagem de sucesso e redireciona para outra página após um tempo
    msgSuccess.setAttribute('style', 'display: block')
    msgSuccess.innerHTML = '<strong>Cadastrando usuário...</strong>'
    msgError.setAttribute('style', 'display: none')
    msgError.innerHTML = ''
    
    setTimeout(()=>{
        window.location.href = '../html/signin.html'
    }, 3000)
  } else {
    // Se algum campo estiver inválido, exibe mensagem de erro
    msgError.setAttribute('style', 'display: block')
    msgError.innerHTML = '<strong>Preencha todos os campos corretamente antes de cadastrar</strong>'
    msgSuccess.innerHTML = ''
    msgSuccess.setAttribute('style', 'display: none')
  }
}

// Event listener para o botão de mostrar/esconder senha
btn.addEventListener('click', ()=>{
  // Seleciona o campo de senha
  let inputSenha = document.querySelector('#senha')
  
  // Alterna entre mostrar/esconder senha
  if(inputSenha.getAttribute('type') == 'password'){
    inputSenha.setAttribute('type', 'text')
  } else {
    inputSenha.setAttribute('type', 'password')
  }
})

// Event listener para o botão de mostrar/esconder confirmar senha, similar ao anterior
btnConfirm.addEventListener('click', ()=>{
  let inputConfirmSenha = document.querySelector('#confirmSenha')
  
  if(inputConfirmSenha.getAttribute('type') == 'password'){
    inputConfirmSenha.setAttribute('type', 'text')
  } else {
    inputConfirmSenha.setAttribute('type', 'password')
  }
})
