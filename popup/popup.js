document.addEventListener("DOMContentLoaded", () => {
    console.log("Script carregado!");

    const user = JSON.parse(localStorage.getItem("user"));
    const token = localStorage.getItem("token");

    if (!user || !token) {
        console.log("Usuário não autenticado! Redirecionando para login...");
        window.location.href = "../login/login.html";
        return;
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
            sdrTab.style.display = "none";
            prodTab.style.display = "block"; // CORRIGIDO AQUI!
            prodBtn.classList.add("active");
            sdrBtn.classList.remove("active");
        }
    }

    // Eventos de clique nas abas
    sdrBtn.addEventListener("click", () => switchTab("sdr"));
    prodBtn.addEventListener("click", () => switchTab("produtividade"));

    // Definir a aba padrão como SDR
    switchTab("sdr");

    // Verificar se a aba produtividade está sendo chamada corretamente
    prodBtn.addEventListener("click", () => {
        console.log("Aba produtividade foi clicada!");
        console.log("Elemento de produtividade:", prodTab);
        console.log("Display atual:", prodTab.style.display);
    });
    //Função para carregar contatos na aba Produtividade
    function carregarContatos() {
        console.log("Carregando contatos...");

        const contactList = document.getElementById("contact-list");
        if (!contactList) {
            console.error("Erro: Elemento contact-list não encontrado.");
            return;
        }

        contactList.innerHTML = ""; // Limpa antes de carregar

        const contatos = [
            { nome: "João Silva", escola: "Projetos", telefone: "(12) 98198-4534", status: "Não Conectado" },
            { nome: "Maria Oliveira", escola: "Tecnologia", telefone: "(11) 99765-4321", status: "Não Conectado" },
            { nome: "Carlos Santos", escola: "Dados", telefone: "(21) 98456-7890", status: "Não Conectado" }
        ];

        

        contatos.forEach(contato => {
            const contatoCard = document.createElement("div");
            contatoCard.classList.add("contact-card");
            contatoCard.innerHTML = `
                <div class="contact-header">
                    <h4>${contato.nome}</h4>
                    <span class="contact-phone">${contato.telefone}</span>
                </div>
                <p class="contact-school">${contato.escola}</p>
                <p class="contact-status"><a href="#">${contato.status}</a></p>
            `;
            contactList.appendChild(contatoCard);
        });

        console.log("Contatos carregados.");
    }

    // 🔹 Evento para puxar contatos do CRM
    const updateCrmBtn = document.getElementById("update-crm");
    if (updateCrmBtn) {
        updateCrmBtn.addEventListener("click", carregarContatos);
    } else {
        console.error("Erro: Botão Puxar do CRM não encontrado.");
    }

    // Botão de Agendamento
    const agendarBtn = document.getElementById("agendarBtn");
    const iframeContainer = document.getElementById("iframe-container");

    if (agendarBtn && iframeContainer) {
        agendarBtn.addEventListener("click", () => {
            console.log("Clicou no botão Agendar");

            // Forçando o container a aparecer
            iframeContainer.style.display = "block";
            iframeContainer.classList.remove("hidden"); // Se houver classe CSS "hidden"

            console.log("Iframe container agora está visível");
        });
    } else {
        console.error("Erro: Botão Agendar ou container do iframe não encontrados.");
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

});
