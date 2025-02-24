document.addEventListener("DOMContentLoaded", () => {
    console.log("Script carregado!");

    const user = JSON.parse(localStorage.getItem("user"));
    const token = localStorage.getItem("token");

    if (!user || !token) {
        console.log("Usuário não autenticado! Redirecionando para login...");
        window.location.href = "../login/login.html";
        return;
    }

    // Exibir nome e time do usuário
    const userNameElement = document.getElementById("user-name");
    const userTeamElement = document.getElementById("user-team");

    if (userNameElement && userTeamElement) {
        userNameElement.innerText = user.name || "Desconhecido";
        userTeamElement.innerText = user.team || "Sem time";
    } else {
        console.error("Erro: Elementos #user-name ou #user-team não encontrados.");
    }

    // Seleção das abas
    const sdrBtn = document.getElementById("tab-sdr");
    const prodBtn = document.getElementById("tab-produtividade");
    const sdrTab = document.getElementById("sdr-tab-content");
    const prodTab = document.getElementById("produtividade-tab-content");

    if (!sdrBtn || !prodBtn || !sdrTab || !prodTab) {
        console.error("Erro: Elementos das abas não encontrados.");
        return;
    }

    // Alternância entre abas
    function switchTab(tab) {
        console.log(`Mudando para a aba: ${tab}`);

        if (tab === "sdr") {
            sdrTab.style.display = "block";
            prodTab.style.display = "none";
            sdrBtn.classList.add("active");
            prodBtn.classList.remove("active");
        } else {
            prodTab.style.display = "block";
            sdrTab.style.display = "none";
            prodBtn.classList.add("active");
            sdrBtn.classList.remove("active");
        }
    }

    // Eventos de clique nas abas
    sdrBtn?.addEventListener("click", () => switchTab("sdr"));
    prodBtn?.addEventListener("click", () => switchTab("produtividade"));

    // Definir a aba padrão como SDR
    switchTab("sdr");

    // Botão para abrir o card do lead
    const abrirCardBtn = document.getElementById("abrir-card");
    if (abrirCardBtn) {
        abrirCardBtn.addEventListener("click", () => {
            const link = document.getElementById("lead-link")?.value;
            if (link) {
                window.open(link, "_blank");
            } else {
                alert("Por favor, insira o link do card.");
            }
        });
    } else {
        console.warn("Botão 'Abrir Card' não encontrado.");
    }

    // Botão de agendamento
    const agendarBtn = document.getElementById("agendarBtn");
    const iframeContainer = document.getElementById("iframe-container");
    const agendamentoForm = document.getElementById("agendamento-form");

    if (agendarBtn && iframeContainer && agendamentoForm) {
        agendarBtn.addEventListener("click", () => {
            console.log("Clicou no botão Agendar");
            iframeContainer.style.display = "block";

            setTimeout(() => {
                agendamentoForm.style.display = "block";
            }, 1000);
        });
    } else {
        console.error("Erro: Botão Agendar ou elementos do agendamento não encontrados.");
    }

    // Botão de logout
    const logoutBtn = document.getElementById("logout-btn");
    if (logoutBtn) {
        logoutBtn.addEventListener("click", () => {
            localStorage.removeItem("user");
            localStorage.removeItem("token");
            window.location.href = "../login/login.html";
        });
    } else {
        console.warn("Botão de logout não encontrado.");
    }

    // Simulação de puxar contatos do CRM
    const updateCrmBtn = document.getElementById("update-crm");
    if (updateCrmBtn) {
        updateCrmBtn.addEventListener("click", renderHardcodedContacts);
    } else {
        console.warn("Botão 'Puxar do CRM' não encontrado.");
    }

    function renderHardcodedContacts() {
        const contactList = document.getElementById("contact-list");
        if (!contactList) {
            console.warn("Elemento 'contact-list' não encontrado.");
            return;
        }

        contactList.innerHTML = "";

        const contacts = [
            { nome: "João Silva", telefone: "(12) 98198-4534" },
            { nome: "Maria Oliveira", telefone: "(11) 99765-4321" },
            { nome: "Carlos Santos", telefone: "(21) 98456-7890" }
        ];

        contacts.forEach(contact => {
            const contactCard = document.createElement("div");
            contactCard.classList.add("contact-card");
            contactCard.innerHTML = `<p>${contact.nome} - ${contact.telefone}</p>`;
            contactList.appendChild(contactCard);
        });
    }
});
