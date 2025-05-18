import { renderServices } from "./services.js";
import { animateText, setAnimationOnScroll } from "./animations.js";

window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        document.querySelector('.header').style.top = 0;
        document.querySelector('.hero__scroll').style.opacity = 0;
    } else {
        document.querySelector('.hero__scroll').style.opacity = 1;
        document.querySelector('.header').style.top = '-70px';
    }
});

const menu = document.querySelector('.nav__menu'),
    menu_btn = document.querySelector('.nav__icon'),
    nav_links = document.querySelectorAll('.nav__option');

/**
 * Função para abrir/fechar menu
 */
function toggleMenu() {
    if (window.innerWidth <= 768 && menu.style.left == '0%') {
        menu.style.left = '-100%';
        menu_btn.innerText = 'menu';
        return true;
    }
    menu.style.left = '0%';
    menu_btn.innerText = 'close';
}

menu_btn.addEventListener('click', toggleMenu);
nav_links.forEach(link => link.addEventListener('click', toggleMenu));

// Renderizando os serviços na página
renderServices();

// Adicionando animação de scroll em todos os cards
const cards = Array.from(document.querySelectorAll('[class]'))
    .filter(el => Array.from(el.classList)
        .some(cls => cls.endsWith('card')));

cards.forEach(card => card.classList.add('block-animation'));

// Função para mostrar modal de contato
const contact_btn = document.querySelectorAll('.js-contact-btn'),
    service_btn = document.querySelectorAll('.services__btn'),
    apps_btn = document.querySelectorAll('.js-apps-btn');

const toggleModal = cls => {
    const modal = document.querySelector(cls);
    return () => {
        modal.classList.remove('hide');
        modal.classList.add('show');

        const btn = modal.querySelector('#js-btn-close');
        document.body.style.overflow = 'hidden';
        modal.showModal();

        btn.addEventListener('click', () => {
            modal.classList.remove('show');
            modal.classList.add('hide');

            modal.addEventListener('animationend', function handler() {
                document.body.style.overflow = 'auto';
                modal.classList.remove('hide');
                modal.style.opacity = 0;
                modal.removeEventListener('animationend', handler);
                modal.close();
            });
        });
    }
};


// Adicionando função toggleModal aos botões
contact_btn.forEach(btn => btn.addEventListener('click', toggleModal('.modal__contact')));

service_btn.forEach(btn => btn.addEventListener('click', toggleModal('.alert__popup')))

apps_btn.forEach(btn => btn.addEventListener('click', toggleModal('.alert__popup')))

// Simulando envio de dados do form
const form = document.querySelector('.contact__form');

form.addEventListener('click', async event => {
    const target = event.target;

    if (target.classList.contains('js-contact-send')) {
        const btn = target;
        try {
            event.preventDefault();
            btn.innerText = 'Enviando...';
            const client = handleForm();
            const response = await sendEmail(client);
            alert(response.message);
            form.parentElement.parentElement.querySelector('#js-btn-close').click();
        } catch (err) {
            console.error(err.message);
            alert(err.message);
        } finally {
            btn.innerText = 'Enviar';
        }
    }
});

function handleForm() {
    const client = {};
    client.name = document.querySelector('#nome').value;
    client.email = document.querySelector('#email').value;
    client.number = document.querySelector('#numero').value;
    client.service = document.querySelector('#servicos').value;
    client.description = document.querySelector('#descricao').value;
    return client;
}

function sendEmail(client) {
    /* Simulando uma validação no servidor
       antes de cadastrar os dados no BD */
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            for (let key in client) {
                if (client[key].trim().length === 0) {
                    reject({
                        success: false,
                        message: `Dado(s) inválido(s)! Error: ${key.toLocaleUpperCase()}`
                    });
                }
            }
            resolve({ success: true, message: 'Dados enviados com sucesso' });
        }, 2000);
    });
}

// Atualizando a data do site
const date = new Date();
document.querySelector('.infor__txt')
    .innerText = `© Arcline Agency ${date.getFullYear()}, Todos os direitos reservados.`;

// Adicionando animação de texto ao scrollar
const texts_class = ['.hero__text', '.results__text', '.services_text',
    '.metrics__text', '.apps__text', '.testimonials__text', '.title'];

document.addEventListener('DOMContentLoaded', () => {
    // Animações desativadas para mobile
    if (window.innerWidth < 424) return;

    animateText('.hero__title');
    setAnimationOnScroll('show-text-to-top', '.title');
    setAnimationOnScroll('show-text-to-top', '.hero__title');
    setAnimationOnScroll('show-text-to-top', '.hero__btn');

    texts_class.forEach(cls => setAnimationOnScroll('show-text-to-top', cls));
});
