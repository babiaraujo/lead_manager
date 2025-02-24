document.addEventListener('DOMContentLoaded', function () {
    const loginButton = document.querySelector('button[type="submit"]');

    // Adiciona evento de clique no botão de login
    loginButton.addEventListener('click', function (event) {
        event.preventDefault();

        const username = document.getElementById('username').value.trim();
        const password = document.getElementById('password').value.trim();

        if (username === "" || password === "") {
            alert("Por favor, preencha todos os campos.");
            return;
        }

        if (username === "admin" && password === "1234") { // Usuário e senha fixos como exemplo
            localStorage.setItem('userLoggedIn', true);
            window.location.href = "../team-selection/team-selection.html";
        } else {
            const errorMessage = document.getElementById('error-message');
            errorMessage.style.display = 'block';
        }
    });
});
