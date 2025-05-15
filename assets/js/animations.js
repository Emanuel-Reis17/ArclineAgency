// Animação de texto letra-por-letra
const textsAnimated = new Set();
export function animateText(cls) {
    if (textsAnimated.has(cls)) return;

    textsAnimated.add(cls);
    const title = document.querySelector(cls).innerText;
    document.querySelector(cls).innerText = '';
    let c = 0;

    let intervalId = setInterval(() => {
        document.querySelector(cls).innerHTML += title[c];
        c++;
        if (c == title.length) clearInterval(intervalId);
    }, 60);
}

export const showTextToTop = cls => document.querySelector(cls).classList.add('show-text-to-top');

export function setAnimationOnScroll(effect, target) {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting)
                entry.target.classList.add(effect);
            else
                entry.target.classList.remove(effect);
        });
    });
    document.querySelectorAll(target).forEach((el) => observer.observe(el));
}