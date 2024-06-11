var users = []; // Armazenar os usuários cadastrados

function registerUser() {
    var email = document.getElementById("email").value;
    var name = document.getElementById("name").value;
    var phone = document.getElementById("phone").value;
    var birthdate = document.getElementById("birthdate").value;
    var cellphone = document.getElementById("cellphone").value;
    var password = document.getElementById("password").value;

    // Verificar se o e-mail já está cadastrado
    if (users.some(user => user.email === email)) {
        alert("Este e-mail já está cadastrado.");
        return;
    }

    // Criar objeto de usuário
    var newUser = {
        email: email,
        name: name,
        phone: phone,
        birthdate: birthdate,
        cellphone: cellphone,
        password: password
    };

    // Adicionar usuário ao array de usuários
    users.push(newUser);
    alert("Cadastro realizado com sucesso!");
}

function loginUser() {
    var loginEmail = document.getElementById("loginEmail").value;
    var loginPassword = document.getElementById("loginPassword").value;

    // Verificar se o usuário existe e a senha está correta
    var user = users.find(user => user.email === loginEmail && user.password === loginPassword);
    if (user) {
        alert("Login bem-sucedido! Bem-vindo, " + user.name + "!");
    } else {
        alert("Email ou senha incorretos.");
    }
}

function changePassword() {
    var newPassword = prompt("Digite sua nova senha:");
    // Implementar lógica para alterar senha aqui
    console.log("Implementar lógica para alterar senha");
}

function deleteAccount() {
    var confirmDelete = confirm("Tem certeza de que deseja excluir sua conta?");
    if (confirmDelete) {
        // Implementar lógica para excluir conta aqui
        console.log("Implementar lógica para excluir conta");
    }
}
 
 
function toggleForms() {
    var registerForm = document.getElementById("registerForm");
    var loginForm = document.getElementById("loginForm");
    
    if (registerForm.style.display === "none") {
        registerForm.style.display = "block";
        loginForm.style.display = "none";
    } else {
        registerForm.style.display = "none";
        loginForm.style.display = "block";
    }
}
