document.addEventListener('DOMContentLoaded', () => {
    // Inicializa os dados e eventos ao carregar
    loadData();
    setupEventListeners();
    renderHardcodedContacts(); // Renderiza os contatos fixos ao iniciar
});

// Função para configurar eventos nos botões e abas
function setupEventListeners() {
    const tabSdr = document.getElementById('tab-sdr');
    const tabProd = document.getElementById('tab-produtividade');
    const abrirCard = document.getElementById('abrir-card');
    const agendarBtn = document.getElementById('agendarBtn');
    const registrarAtividade = document.getElementById('registrar-atividade');
    const atualizarCrmBtn = document.getElementById('update-crm');

    if (tabSdr && tabProd) {
        tabSdr.addEventListener('click', () => switchTab('sdr'));
        tabProd.addEventListener('click', () => switchTab('produtividade'));
    }

    if (abrirCard) abrirCard.addEventListener('click', openCard);
    if (agendarBtn) agendarBtn.addEventListener('click', mostrarCamposAgendamento);
    if (registrarAtividade) registrarAtividade.addEventListener('click', registrarAtividadeFunc);
    if (atualizarCrmBtn) atualizarCrmBtn.addEventListener('click', renderHardcodedContacts);
}

// Alterna entre as abas SDR e Produtividade
function switchTab(tab) {
    const sdrTab = document.getElementById('sdr-tab-content');
    const prodTab = document.getElementById('produtividade-tab-content');
    const sdrBtn = document.getElementById('tab-sdr');
    const prodBtn = document.getElementById('tab-produtividade');

    if (sdrTab && prodTab && sdrBtn && prodBtn) {
        if (tab === 'sdr') {
            sdrTab.style.display = 'block';
            prodTab.style.display = 'none';
            sdrBtn.classList.add('active');
            prodBtn.classList.remove('active');
        } else {
            sdrTab.style.display = 'none';
            prodTab.style.display = 'block';
            sdrBtn.classList.remove('active');
            prodBtn.classList.add('active');
        }
    }
}

// Abre o card do lead em nova aba
function openCard() {
    const link = document.getElementById('lead-link')?.value;
    if (link) {
        window.open(link, '_blank');
    } else {
        alert('Por favor, insira o link do card');
    }
}

// Exibe o calendário e depois os inputs de agendamento
function mostrarCamposAgendamento() {
    const iframeContainer = document.getElementById("iframe-container");
    const agendamentoForm = document.getElementById("agendamento-form");

    if (iframeContainer && agendamentoForm) {
        iframeContainer.style.display = "block"; // Exibe o calendário primeiro
        setTimeout(() => {
            agendamentoForm.style.display = "block"; // Exibe os inputs após 1 segundo
        }, 1000);
    }
}

// Simula o registro de atividade
function registrarAtividadeFunc() {
    console.log("Atividade registrada no sistema.");
}

// Carrega dados salvos no chrome.storage
function loadData() {
    chrome.storage.local.get(['formData'], (result) => {
        if (result.formData) {
            const leadName = document.getElementById('lead-name');
            const leadLink = document.getElementById('lead-link');

            if (leadName) leadName.value = result.formData.leadName || '';
            if (leadLink) leadLink.value = result.formData.leadLink || '';
        }
    });
}

document.addEventListener('DOMContentLoaded', () => {
    const phoneFilterInput = document.getElementById('phone-filter');

    if (phoneFilterInput) {
        phoneFilterInput.addEventListener('input', () => {
            const filterValue = phoneFilterInput.value.trim();
            filterContactsByPhone(filterValue);
        });
    }
});

function filterContactsByPhone(filterValue) {
    const contacts = document.querySelectorAll('.contact-card'); // Supondo que cada contato tem essa classe

    contacts.forEach(contact => {
        const phoneElement = contact.querySelector('.contact-phone'); // Classe do telefone
        if (phoneElement) {
            const phoneText = phoneElement.innerText.replace(/\D/g, '').trim(); // Remove caracteres não numéricos e espaços
            const filterDigits = filterValue.replace(/\D/g, '').trim(); // Garante que o filtro só tenha números

            if (phoneText.endsWith(filterDigits) || filterDigits === '') {
                contact.style.display = 'block'; // Mostra contato se corresponder ou se o filtro estiver vazio
            } else {
                contact.style.display = 'none'; // Oculta contatos que não correspondem ao filtro
            }
        }
    });
}



// Renderiza a lista de contatos (dados fixos)
function renderHardcodedContacts() {
    const contactList = document.getElementById("contact-list");
    contactList.innerHTML = ""; // Limpa a lista antes de atualizar

    const hardcodedContacts = [
        {
            nome: "João Silva",
            escola: "Projetos",
            telefone: "(12) 98198-4534",
            status: "Não Conectado"
        },
        {
            nome: "Maria Oliveira",
            escola: "Tecnologia",
            telefone: "(11) 99765-4321",
            status: "Não Conectado"
        },
        {
            nome: "Carlos Santos",
            escola: "Dados",
            telefone: "(21) 98456-7890",
            status: "Não Conectado"
        }
    ];

    hardcodedContacts.forEach(contact => {
        const contactCard = document.createElement("div");
        contactCard.classList.add("contact-card");

        contactCard.innerHTML = `
          <div class="contact-header">
              <h4>${contact.nome}</h4>
              <span class="contact-phone">${contact.telefone}</span>
          </div>
          <p class="contact-school">${contact.escola}</p>
          <p class="contact-status"><a href="#">${contact.status}</a></p>
      `;

        contactList.appendChild(contactCard);
    });
}
