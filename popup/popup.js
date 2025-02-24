document.addEventListener("DOMContentLoaded", () => {
    console.log("Script carregado!");

    // Lista de pitches para cada categoria
    const pitches = {
        "fase-abertura": [
            "Atualmente, você está trabalhando ou em busca de uma nova oportunidade?",
            "Você está trabalhando ou procura voltar para o mercado de trabalho?"
        ],
        "objetivo-profissional": [
            "Você já trabalha na área X ou busca uma transição de carreira?",
            "Você busca um aumento de performance na área que já trabalha ou pensa em fazer uma transição de carreira?"
        ],
        "prioridade": [
            "Hoje é uma prioridade se dedicar pelo menos 30min por dia nos estudos?",
            "Aumentar a performance ou voltar para o mercado de trabalho, é uma prioridade para você?"
        ],
        "investimento": [
            "Como você se preparou financeiramente para fazer esse investimento? Só depende de você ou alguém vai te ajudar?",
            "Você prefere fazer o investimento à vista ou parcelado?",
            "As parcelas variam de R$ 199 a R$ 499, mas como a área X oferece diversas opções de curso, o ideal é agendar uma mentoria de carreira com um especialista para definir a melhor escolha de acordo com seus objetivos."
        ],
        "chamada-reuniao": [
            "Com base nas informações que você me passou, o próximo passo é agendar sua mentoria de carreira com o especialista. Será uma reunião de aproximadamente 30 minutos via Meet, onde vamos alinhar suas expectativas, apresentar o conteúdo completo e ajustar as opções dentro do seu orçamento. Tenho disponibilidade às [horário] ou às [horário]. Qual horário fica melhor para você?",
            "O próximo passo é agendar sua mentoria com o especialista em carreira. Será uma reunião de 30 minutos via Meet para alinhar pontos importantes e definir como podemos te ajudar a alcançar seu objetivo. Tenho disponibilidade às [horário] ou às [horário]. Qual horário você prefere?"
        ]
    };

    // Índices para alternância entre pitches
    let pitchIndices = {
        "fase-abertura": 0,
        "objetivo-profissional": 0,
        "prioridade": 0,
        "investimento": 0,
        "chamada-reuniao": 0
    };

    // Função para gerar o próximo pitch
    function gerarPitch(event) {
        const target = event.target.getAttribute("data-target");
        if (pitches[target]) {
            pitchIndices[target] = (pitchIndices[target] + 1) % pitches[target].length;
            document.getElementById(target).value = pitches[target][pitchIndices[target]];
        }
    }

    // Função para copiar o pitch para a área de transferência
    function copiarPitch(event) {
        const target = event.target.getAttribute("data-target");
        const textarea = document.getElementById(target);
        if (textarea) {
            navigator.clipboard.writeText(textarea.value)
                .then(() => {
                    alert("Texto copiado para a área de transferência!");
                })
                .catch(err => console.error("Erro ao copiar texto: ", err));
        }
    }

    // Adiciona evento para os botões de gerar pitch
    document.querySelectorAll(".btn-gerar-pitch").forEach(button => {
        button.addEventListener("click", gerarPitch);
    });

    // Adiciona evento para os botões de copiar pitch
    document.querySelectorAll(".btn-copiar").forEach(button => {
        button.addEventListener("click", copiarPitch);
    });

    // Inicializa os pitches com a primeira opção
    Object.keys(pitches).forEach(key => {
        document.getElementById(key).value = pitches[key][0];
    });

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
