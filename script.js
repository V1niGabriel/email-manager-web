document.addEventListener('DOMContentLoaded', () => {
    // SELETORES DOS ELEMENTOS DO DOM
    const composeBtn = document.querySelector('.compose-btn');
    const modal = document.getElementById('emailModal');
    const closeModalBtn = document.getElementById('closeModalBtn');
    const emailForm = document.getElementById('emailForm');
    const emailList = document.querySelector('.email-list');
    const modalTitle = document.getElementById('modalTitle');
    const emailIdField = document.getElementById('emailId');

    // Menu lateral e expansível
    const moreBtn = document.getElementById('moreBtn');
    const moreOptions = document.getElementById('moreOptions');
    const navItems = document.querySelectorAll('.sidebar-nav li');

    // Seletor para o contador de e-mails
    const inboxCountElement = document.getElementById('inbox-count');

    // ESTADO DA APLICAÇÃO
    let currentView = 'inbox'; // 'inbox', 'spam', 'trash'

    // FUNÇÕES DE MANIPULAÇÃO DE DADOS (localStorage)
    const getEmails = () => JSON.parse(localStorage.getItem('emails')) || [];
    const saveEmails = (emails) => localStorage.setItem('emails', JSON.stringify(emails));

    // FUNÇÃO PARA MOSTRAR ALERTAS NA TELA
    function showAlert(message, type = 'success', time = 4000) {
        const alertBox = document.getElementById('alertBox');
        alertBox.textContent = message;
        alertBox.className = `alert ${type}`;

        setTimeout(() => {
            alertBox.classList.remove('hidden');
        }, 10);

        setTimeout(() => {
            alertBox.classList.add('hidden');
        }, time);
    }

    // FUNÇÃO PARA ATUALIZAR O CONTADOR NA TELA
    const updateInboxCount = () => {
        if (!inboxCountElement) return; // Não faz nada se o contador não existir

        const emailsInInbox = getEmails().filter(email => email.status === 'inbox');
        const count = emailsInInbox.length;

        if (count > 0) {
            inboxCountElement.textContent = count;
            inboxCountElement.style.display = 'inline';
        } else {
            inboxCountElement.style.display = 'none';
        }
    };

    // FUNÇÃO PARA RENDERIZAR OS E-MAILS NA TELA
    const renderEmails = () => {
        updateInboxCount(); // Atualiza o contador sempre que a lista é renderizada

        emailList.innerHTML = '';
        const emails = getEmails();
        const filteredEmails = emails.filter(email => email.status === currentView);

        if (filteredEmails.length === 0) {
            const emptyMessages = {
                inbox: 'Sua caixa de entrada está vazia.',
                spam: 'Nenhum e-mail na pasta de spam.',
                trash: 'A lixeira está vazia.'
            };
            emailList.innerHTML = `<p style="text-align: center; color: #5f6368; padding: 20px;">${emptyMessages[currentView]}</p>`;
            return;
        }

        filteredEmails.slice().reverse().forEach(email => {
            const emailRow = document.createElement('div');
            emailRow.className = 'email-row';
            emailRow.dataset.id = email.id;

            const actionsHTML = currentView === 'trash'
                ? `
                    <button class="icon-button restore-btn" title="Restaurar"><span class="material-symbols-outlined">restore_from_trash</span></button>
                    <button class="icon-button delete-forever-btn" title="Excluir para sempre"><span class="material-symbols-outlined">delete_forever</span></button>
                `
                : `
                    <button class="icon-button edit-btn" title="Editar" arial-label="Editar e-mail"><span class="material-symbols-outlined">edit</span></button>
                    <button class="icon-button delete-btn" title="Excluir" arial-label="Excluir e-mail"><span class="material-symbols-outlined">delete</span></button>
                    <button class="icon-button spam-btn" title="Marcar como spam" arial-label="Marcar como span"><span class="material-symbols-outlined">report</span></button>
                `;

            emailRow.innerHTML = `
                    <div class="email-row-left">
                        <input type="checkbox" />
                        <span class="material-symbols-outlined">star_outline</span>
                        <span class="sender">${email.recipient.split('@')[0]}</span>
                    </div>
                    <div class="email-row-middle">
                        <span class="subject">${email.subject}</span>
                        <span class="preview">- ${email.body.substring(0, 20)}...</span>
                    </div>
                    <div class="email-row-right">
                        <span class="date">${email.date}</span>
                        <div class="actions">${actionsHTML}</div>
                    </div>
            `;
            emailList.appendChild(emailRow);
        });
    };

    // FUNÇÕES DO MODAL
    const openModal = (email = null) => {
        emailForm.reset();
        const recipienteField = document.getElementById("emailRecipient");

        if (email) {
            modalTitle.textContent = 'Editar Mensagem';
            emailIdField.value = email.id;
            recipienteField.value = email.recipient;
            document.getElementById('emailSubject').value = email.subject;
            document.getElementById('emailBody').value = email.body;

            recipienteField.disabled = true;
        } else {
            modalTitle.textContent = 'Nova Mensagem';
            emailIdField.value = '';
        }
        modal.style.display = 'flex';
    };

    const closeModal = () => {
        modal.style.display = 'none';
    };

    // FUNÇÃO PARA ATUALIZAR A VISUALIZAÇÃO ATIVA
    const setActiveView = (view, element) => {
        currentView = view;
        navItems.forEach(item => {
            item.classList.remove('active');
            item.removeAttribute('aria-current');
        });
    
        element.classList.add('active');
        element.setAttribute('aria-current', 'page');

        renderEmails();
    };

    // --- LISTA DE EVENTOS ---

    let eventopenmore = true;

    // Abrir/Fechar menu "Mais"
    moreBtn.addEventListener('click', () => {
        moreOptions.classList.toggle('hidden');
        moreBtn.classList.toggle('expanded');
        
        if (eventopenmore) {
            const MudaMais = document.getElementById('moreBtn');
            MudaMais.innerHTML = '<span class="material-symbols-outlined">expand_more</span> Menos'
            eventopenmore = false;
        } else {
            const MudaMais = document.getElementById('moreBtn');
            MudaMais.innerHTML = '<span class="material-symbols-outlined">expand_more</span> Mais'
            eventopenmore = true;
        }
    });

    // Navegação entre pastas
    navItems.forEach(item => {
        const text = item.innerText.trim();
        let viewName = '';

        if (text.includes('Caixa de Entrada')) viewName = 'inbox';
        else if (text.includes('Spam')) viewName = 'spam';
        else if (text.includes('Lixeira')) viewName = 'trash';

        if (viewName) {
            item.addEventListener('click', () => setActiveView(viewName, item));
        }
    });

    // Abrir modal para novo e-mail
    composeBtn.addEventListener('click', () => openModal());

    // Fechar modal
    closeModalBtn.addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => e.target === modal && closeModal());

    // Salvar (Criar ou Atualizar) e-mail
    emailForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const id = emailIdField.value;
        const newEmailData = {
            recipient: document.getElementById('emailRecipient').value,
            subject: document.getElementById('emailSubject').value,
            body: document.getElementById('emailBody').value,
        };

        let emails = getEmails();

        if (id) {
            emails = emails.map(email => email.id == id ? { ...email, ...newEmailData } : email);
            showAlert("Email atualizado com sucesso!");
        } else {
            newEmailData.id = Date.now();
            newEmailData.date = new Intl.DateTimeFormat('pt-BR', { day: 'numeric', month: 'short' }).format(new Date());
            newEmailData.status = 'inbox';
            emails.push(newEmailData);
            showAlert("Email criado!");
        }

        saveEmails(emails);
        renderEmails();
        closeModal();
    });

    // Ações na lista de e-mails (Delegação de Eventos)
    emailList.addEventListener('click', (e) => {
        const button = e.target.closest('button'); //acha o botão mais próximo que foi clicado
        if (!button) return;

        const id = button.dataset.id || button.parentElement.parentElement.parentElement.dataset.id;
        let emails = getEmails();
        let message = '';
        let shouldUpdate = true;

        //Mover para lixeira
        if (button.classList.contains('delete-btn')) {
            emails = emails.map(email => email.id == id ? { ...email, status: 'trash' } : email);
            message = "Movido para a lixeira";
        }
        //Mover para spam
        else if (button.classList.contains('spam-btn')) {
            emails = emails.map(email => email.id == id ? { ...email, status: 'spam' } : email);
            message = "Marcado como spam!";
        }
        //Editar
        else if (button.classList.contains('edit-btn')) {
            const emailToEdit = emails.find(email => email.id == id);
            openModal(emailToEdit);
            shouldUpdate = false; // Não precisa salvar e renderizar aqui, o modal cuidará disso
        }
        //Restaurar da lixeira
        else if (button.classList.contains('restore-btn')) {
            emails = emails.map(email => email.id == id ? { ...email, status: 'inbox' } : email);
            message = "Email restaurado";
        }
        //Excluir da lixeira
        else if (button.classList.contains('delete-forever-btn')) {
            if (confirm('Este e-mail será excluído permanentemente. Deseja continuar?')) {
                emails = emails.filter(email => email.id != id);
                message = "Email excluído permanentemente!";
            } else {
                shouldUpdate = false;
            }
        }

        if (shouldUpdate) {
            saveEmails(emails);
            renderEmails();
            if (message) showAlert(message);
        }
    });

    // Define a visualização inicial
    const inboxElement = Array.from(navItems).find(item => item.innerText.trim().includes('Caixa de Entrada'));
    if (inboxElement) {
        setActiveView('inbox', inboxElement);
    }

    // --- LÓGICA PARA O MENU RESPONSIVO ---
    const menuToggleBtn = document.getElementById('menu-toggle-btn');
    const sidebarLeft = document.querySelector('.sidebar-left');
    const ButtonWrite = document.getElementById('write');

    if (menuToggleBtn && sidebarLeft) {
        menuToggleBtn.addEventListener('click', () => {
            sidebarLeft.classList.toggle('show');
        });
    }
    //Fecha o menu ao clicar no botão escrever
    if (ButtonWrite && sidebarLeft) {
        ButtonWrite.addEventListener('click', () => {
            sidebarLeft.classList.remove('show');
        });
    }
});