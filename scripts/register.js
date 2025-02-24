document.addEventListener("DOMContentLoaded", () => {
    const registerForm = document.getElementById("registerForm");

    registerForm.addEventListener("submit", async (event) => {
        event.preventDefault();

        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const team = document.getElementById("team").value;
        const password = document.getElementById("password").value.trim();
        const type = document.getElementById("type").value;
        const phone = document.getElementById("phone").value.trim();

        if (!name || !email || !team || !password || !type || !phone) {
            alert("Todos os campos são obrigatórios!");
            return;
        }

        const payload = { name, email, team, password, type, phone };

        try {
            const response = await fetch("http://localhost:4000/leads/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload),
            });

            const data = await response.json();

            if (response.ok) {
                alert("✅ Cadastro realizado com sucesso!");
                localStorage.setItem("user", JSON.stringify(data.user));
                localStorage.setItem("token", data.token);
                window.location.href = "../popup/popup.html";
            } else {
                alert(`❌ Erro: ${data.message}`);
            }
        } catch (error) {
            console.error("Erro ao cadastrar:", error);
            alert("❌ Erro ao conectar com o servidor.");
        }
    });

    document.getElementById("backToLogin").addEventListener("click", () => {
        window.location.href = "../login/login.html";
    });
});
