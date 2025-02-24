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

  function getStudentName() {
      let nameElement = document.querySelector('span[data-selenium-test="highlightTitle"]')
          || document.querySelector('.DealTicketEditableTitle')
          || document.querySelector('.record-header h2');

      let firstName = "Cliente";
      if (nameElement && nameElement.innerText.trim()) {
          firstName = nameElement.innerText.trim();
      }
      return firstName;
  }

  function getConsultantName() {
      let ownerElement = document.querySelector('[data-selenium-test="property-input-hubspot_owner_id"] span.private-dropdown__item__label');
      let ownerName = "Especialista da DNC";
      if (ownerElement && ownerElement.innerText.trim()) {
          ownerName = ownerElement.innerText.trim();
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

      let text = container.innerText.toUpperCase();
      for (let school of knownSchools) {
          if (text.includes(school.toUpperCase())) {
              return school;
          }
      }

      return null;
  }

  function getDealId() {
      let dealElement = document.querySelector('input[data-selenium-test="property-input-hs_object_id"]');

      if (dealElement && dealElement.value.trim()) {
          return dealElement.value.trim();
      }

      return null; // Caso não encontre
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
      let dealId = getDealId();

      let schoolPart = rawSchool ? `a área de ${rawSchool}` : `os nossos cursos`;

      const message = `Oi ${studentName.split(" ")[0]}, tudo certo?\nAqui é ${consultantName.split(" ")[0]}, especialista da DNC. Vi que você se cadastrou para saber mais sobre ${schoolPart}. Como posso te ajudar?`;

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

      whatsappIcon.onclick = async function () {
          setTimeout(async () => {
              await saveLeadData(studentName, phone, rawSchool, consultantName, dealId);
              window.open(whatsappUrl, '_blank');
          }, 300);
      };

      if (!phoneElement.parentElement.querySelector(".whatsapp-icon")) {
          phoneElement.parentElement.appendChild(whatsappIcon);
      }
  }

  async function saveLeadData(name, phone, school, consultant, dealId) {
      const payload = {
          client_name: name,
          client_phone: phone,
          client_school: school,
          owner_name: consultant,
          deal_id_hubspot: dealId
      };

      try {
          const response = await fetch("http://localhost:4000/leads/deals", {
              method: "POST",
              headers: {
                  "Content-Type": "application/json",
              },
              body: JSON.stringify(payload),
          });

          const data = await response.json();
      } catch (error) {
          console.error("Erro ao salvar lead:", error);
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

  console.log("🔄 Observando mudanças no HubSpot...");
})();
