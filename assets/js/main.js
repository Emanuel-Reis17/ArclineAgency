import { renderServices } from "./services.js";

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

const modal = document.querySelector('.modal__contact'), 
    contact_btn = document.querySelectorAll('.js-contact-btn'), 
    close_btn = document.querySelector('.modal__close');
/**
 * Função para mostrar modal de contato
 */
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

contact_btn.forEach(btn => btn.addEventListener('click', toggleModal));
close_btn.addEventListener('click', toggleModal);

const date = new Date();
document.querySelector('.infor__txt')
    .innerText = `© Arcline Agency ${date.getFullYear()}, Todos os direitos reservados.`;