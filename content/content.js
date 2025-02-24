(function () {
  let debounceTimer = null;
  function scheduleAddWhatsAppButton() {
    if (debounceTimer) clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => addWhatsAppButton(), 500);
  }

  function formatPhoneNumber(phone) {
    phone = phone.replace(/\D/g, '');
    if (phone.length === 10 || phone.length === 11) {
      phone = "55" + phone;
    }
    return phone;
  }

  function bfsFindSchoolInContainer(container, knownSchools, limit = 300) {
    if (!container) return null;

    const queue = [container];
    let visited = 0;

    while (queue.length > 0 && visited < limit) {
      const node = queue.shift();
      visited++;

      if (node.nodeType === Node.ELEMENT_NODE && node.innerText) {
        const text = node.innerText.trim();
        if (knownSchools.has(text)) {
          return text;
        }
      }
      if (node.children && node.children.length > 0) {
        for (let child of node.children) {
          queue.push(child);
        }
      }
    }
    return null;
  }

  function getStudentName() {
    let nameElement = document.querySelector('span[data-selenium-test="highlightTitle"]')
      || document.querySelector('.DealTicketEditableTitle')
      || document.querySelector('.record-header h2');

    let firstName = "Cliente";
    if (nameElement && nameElement.innerText.trim()) {
      firstName = nameElement.innerText.trim().split(' ')[0];
    }
    return firstName;
  }

  function getConsultantName() {
    let ownerElement = document.querySelector('[data-selenium-test="property-input-hubspot_owner_id"] span.private-dropdown__item__label');
    let ownerName = "Especialista da DNC";
    if (ownerElement && ownerElement.innerText.trim()) {
      ownerName = ownerElement.innerText.trim().split(' ')[0];
    }
    return ownerName;
  }

  function getSchoolInterest() {
    const knownSchools = new Set(["Dados", "Marketing", "Produto", "Projetos", "Tecnologia", "Outro"]);

    let container = document.querySelector('.private-panel__container')
      || document.querySelector('.record')
      || document.querySelector('.private-panel__body');

    if (!container) {
      return null;
    }

    let found = bfsFindSchoolInContainer(container, knownSchools, 300);
    if (found) {
      return found;
    }

    let text = container.innerText.toUpperCase();
    if (text.includes("NEGÓCIOS")) {
      return "Dados";
    }

    return null;
  }

  function addWhatsAppButton() {
    let phoneElement = document.querySelector('textarea[data-selenium-test="property-input-telefone_negocio"]')
      || document.querySelector('input[data-field="Telefone-Negocio"]');
    if (!phoneElement) {
      return;
    }

    let phone = formatPhoneNumber(phoneElement.value.trim());
    if (!phone) {
      return;
    }

    let studentName = getStudentName();
    let consultantName = getConsultantName();
    let rawSchool = getSchoolInterest();

    let schoolPart = rawSchool ? `a área de ${rawSchool}` : `os nossos cursos`;

    const message = `Oi ${studentName}, tudo certo?\nAqui é ${consultantName}, especialista da DNC. Vi que você se cadastrou para saber mais sobre ${schoolPart}. Como posso te ajudar?`;

    const whatsappUrl = `https://web.whatsapp.com/send?phone=${phone}&text=${encodeURIComponent(message)}`;

    let existingIcon = document.querySelector('.whatsapp-icon');
    if (existingIcon) {
      existingIcon.remove();
    }

    let iconUrl;
    try {
      iconUrl = chrome.runtime.getURL("assets/icon.png");
    } catch (err) {
      iconUrl = "https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg";
    }

    const whatsappIcon = document.createElement('img');
    whatsappIcon.src = iconUrl;
    whatsappIcon.alt = "WhatsApp";
    whatsappIcon.classList.add("whatsapp-icon");
    whatsappIcon.style.cssText = `
      width: 50px;
      height: 50px;
      margin-left: 10px;
      cursor: pointer;
    `;
    whatsappIcon.onclick = function () {
      window.open(whatsappUrl, '_blank');
    };

    if (!phoneElement.parentElement.querySelector(".whatsapp-icon")) {
      phoneElement.parentElement.appendChild(whatsappIcon);
    }
  }

  const observer = new MutationObserver(() => {
    let phoneField = document.querySelector('textarea[data-selenium-test="property-input-telefone_negocio"]')
      || document.querySelector('input[data-field="Telefone-Negocio"]');
    if (phoneField) {
      scheduleAddWhatsAppButton();
    }
  });
  observer.observe(document.body, { childList: true, subtree: true });

  console.log("🔄 Observando mudanças no HubSpot (BFS container approach)...");
})();
