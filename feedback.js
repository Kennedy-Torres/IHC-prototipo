// Função que é executada quando o DOM da página é completamente carregado
document.addEventListener("DOMContentLoaded", () => {
    // Seleciona elementos relevantes do DOM
    const commentsList = document.getElementById("comments-list");
    const commentForm = document.getElementById("comment-form");
    const commentName = document.getElementById("comment-name");
    const commentTopic = document.getElementById("comment-topic");
    const commentInput = document.getElementById("comment-input");

    // Inicializa a variável 'comments' com os comentários do localStorage ou um array vazio
    let comments = JSON.parse(localStorage.getItem("comments")) || [];
    // Define uma flag para controlar se o usuário está editando um comentário
    let isEditing = false;

    // Função para renderizar os comentários na página
    function renderComments() {
        commentsList.innerHTML = "";
        comments.forEach((comment, index) => {
            // Cria um elemento div para cada comentário
            const commentBox = document.createElement("div");
            commentBox.classList.add("comment-box");
            commentBox.innerHTML = `
                <div class="comment-name">Nome:${comment.name}</div>
                <div class="comment-topic">Assunto:${comment.topic}</div>
                <div class="comment-text">${comment.text}</div>
                <div class="icons">
                    <i class='bx bx-edit' onclick="startEditing(${index})"></i>
                    <i class='bx bx-trash' onclick="confirmDelete(${index})"></i>
                </div>
            `;
            commentsList.appendChild(commentBox);
        });
    }

    // Função para salvar os comentários no localStorage
    function saveComments() {
        localStorage.setItem("comments", JSON.stringify(comments));
    }

    // Função para finalizar a edição de um comentário
    function finishEditing(index, newText) {
        if (confirm("Deseja confirmar a edição?")) {
            // Atualiza o texto do comentário editado
            comments[index].text = newText;
            saveComments();
        }
        // Reinicia a flag de edição e atualiza a exibição dos comentários
        isEditing = false;
        renderComments();
    }

    // Adiciona um ouvinte de evento para o envio do formulário de comentário
    commentForm.addEventListener("submit", (e) => {
        e.preventDefault();
        // Cria um novo objeto de comentário com os dados do formulário
        const newComment = {
            name: commentName.value.trim(),
            topic: commentTopic.value.trim(),
            text: commentInput.value.trim()
        };
        // Verifica se os campos do formulário estão preenchidos
        if (newComment.name && newComment.topic && newComment.text) {
            // Adiciona o novo comentário à lista de comentários
            comments.push(newComment);
            // Salva os comentários no localStorage
            saveComments();
            // Limpa os campos do formulário
            commentName.value = "";
            commentTopic.value = "";
            commentInput.value = "";
            // Atualiza a exibição dos comentários na página
            renderComments();
        }
    });

    // Função global para iniciar a edição de um comentário
    window.startEditing = function(index) {
        // Verifica se já existe uma edição em andamento
        if (isEditing) return;
        // Define que uma edição está em andamento
        isEditing = true;

        // Seleciona o elemento do comentário a ser editado
        const commentBox = commentsList.children[index];
        const commentTextElement = commentBox.querySelector(".comment-text");
        const currentText = commentTextElement.innerText;
        const inputElement = document.createElement("input");
        inputElement.type = "text";
        inputElement.value = currentText;
        inputElement.classList.add("edit-input");
        inputElement.addEventListener("blur", () => {
            // Finaliza a edição quando o foco é perdido
            if (isEditing) {
                finishEditing(index, inputElement.value);
            }
        });
        inputElement.addEventListener("keydown", (e) => {
            // Finaliza a edição ao pressionar Enter
            if (e.key === "Enter") {
                e.preventDefault();
                if (isEditing) {
                    finishEditing(index, inputElement.value);
                }
            }
        });
        // Substitui o texto do comentário pelo input de edição
        commentTextElement.replaceWith(inputElement);
        // Coloca o foco no input de edição
        inputElement.focus();
    };

    // Função global para confirmar a exclusão de um comentário
    window.confirmDelete = function(index) {
        if (confirm("Deseja confirmar a exclusão?")) {
            // Chama a função de exclusão de comentário
            deleteComment(index);
        }
    };

    // Função para deletar um comentário
    window.deleteComment = function(index) {
        // Remove o comentário da lista
        comments.splice(index, 1);
        // Salva os comentários atualizados no localStorage
        saveComments();
        // Atualiza a exibição dos comentários na página
        renderComments();
    };

    // Renderiza os comentários na página ao carregá-la
    renderComments();
});
