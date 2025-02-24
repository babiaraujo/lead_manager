document.addEventListener("DOMContentLoaded", function () {
    const loginForm = document.getElementById("loginForm");

    // Verifica se já está logado
    const user = JSON.parse(localStorage.getItem("user"));
    const token = localStorage.getItem("token");

    if (user && token) {
        window.location.href = "../popup/popup.html"; // Redireciona se já estiver logado
        return;
    }

    loginForm.addEventListener("submit", async function (event) {
        event.preventDefault();

        const email = document.getElementById("email").value.trim();
        const password = document.getElementById("password").value.trim();

        try {
            const response = await fetch("http://localhost:4000/leads/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ email, password })
            });

            const data = await response.json();

            if (response.ok) {
                localStorage.setItem("user", JSON.stringify(data.user));
                localStorage.setItem("token", data.token);
                window.location.href = "../popup/popup.html"; 
            } else {
                document.getElementById("error-message").style.display = "block";
            }
        } catch (error) {
            console.error("❌ Erro ao fazer login:", error);
        }
    });

    document.getElementById("register-btn").addEventListener("click", () => {
        window.location.href = "../pages/register.html";
    });
});
