document.addEventListener("DOMContentLoaded", () => {
    const commentsList = document.getElementById("comments-list");
    const commentForm = document.getElementById("comment-form");
    const commentName = document.getElementById("comment-name");
    const commentTopic = document.getElementById("comment-topic");
    const commentInput = document.getElementById("comment-input");

    let comments = JSON.parse(localStorage.getItem("comments")) || [];
    let isEditing = false;

    function renderComments() {
        commentsList.innerHTML = "";
        comments.forEach((comment, index) => {
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

    function saveComments() {
        localStorage.setItem("comments", JSON.stringify(comments));
    }

    function finishEditing(index, newText) {
        if (confirm("Deseja confirmar a edição?")) {
            comments[index].text = newText;
            saveComments();
        }
        isEditing = false;
        renderComments();
    }

    commentForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const newComment = {
            name: commentName.value.trim(),
            topic: commentTopic.value.trim(),
            text: commentInput.value.trim()
        };
        if (newComment.name && newComment.topic && newComment.text) {
            comments.push(newComment);
            saveComments();
            commentName.value = "";
            commentTopic.value = "";
            commentInput.value = "";
            renderComments();
        }
    });

    window.startEditing = function(index) {
        if (isEditing) return;
        isEditing = true;

        const commentBox = commentsList.children[index];
        const commentTextElement = commentBox.querySelector(".comment-text");
        const currentText = commentTextElement.innerText;
        const inputElement = document.createElement("input");
        inputElement.type = "text";
        inputElement.value = currentText;
        inputElement.classList.add("edit-input");
        inputElement.addEventListener("blur", () => {
            if (isEditing) {
                finishEditing(index, inputElement.value);
            }
        });
        inputElement.addEventListener("keydown", (e) => {
            if (e.key === "Enter") {
                e.preventDefault();
                if (isEditing) {
                    finishEditing(index, inputElement.value);
                }
            }
        });
        commentTextElement.replaceWith(inputElement);
        inputElement.focus();
    };

    window.confirmDelete = function(index) {
        if (confirm("Deseja confirmar a exclusão?")) {
            deleteComment(index);
        }
    };

    window.deleteComment = function(index) {
        comments.splice(index, 1);
        saveComments();
        renderComments();
    };

    renderComments();
});
