import { renderServices } from "./services.js";
import { animateText, setAnimationOnScroll } from "./animations.js";

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
const modal = document.querySelector('.modal__contact'),
    contact_btn = document.querySelectorAll('.js-contact-btn'),
    close_btn = document.querySelector('.modal__close');

let isOpen = false;
const toggleModal = () => {
    if (isOpen) {
        modal.close();
        isOpen = false;
        document.body.style.overflow = 'auto';
    } else {
        document.body.style.overflow = 'hidden';
        modal.showModal();
        isOpen = true;
    }
};

// Adicionando função toggleModal aos botões
contact_btn.forEach(btn => btn.addEventListener('click', toggleModal));
close_btn.addEventListener('click', toggleModal);

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
