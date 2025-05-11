export const services = [
    {
        name: 'Desenvolvimento Web', 
        description: 'Criamos sistemas e sites modernos, responsivos e de alta performance, com foco em usabilidade, velocidade e conversão.',
    }, 
    {
        name: 'UI/UX Design', 
        description: 'Projetamos interfaces intuitivas e experiências envolventes que colocam o usuário no centro da solução.',
    }, 
    {
        name: 'Marketing de Conteúdo', 
        description: 'Produzimos conteúdos estratégicos para atrair, engajar e converter, fortalecendo sua autoridade digital.',
    }, 
    {
        name: 'Social Media', 
        description: 'Gerenciamos suas redes sociais com planejamento, criatividade e consistência para gerar engajamento real.',
    }, 
    {
        name: 'Design Gráfico', 
        description: 'Criamos peças visuais impactantes que comunicam sua identidade de forma clara, criativa e profissional.',
    }, 
    {
        name: 'Tráfego Pago', 
        description: 'Planejamento e gestão de campanhas patrocinadas com foco em performance e retorno sobre investimento.',
    }
];

export function renderServices() {
    let servicesCards = '';
    services.forEach(item => {
        servicesCards += `
            <div class="services__card">
                <h2 class="services__title">${item.name}</h2>
                <p class="services__text">${item.description}</p>
                <a href="#" class="services__btn" target="_self"><span class="material-symbols-outlined">arrow_forward</span></a>
            </div>
        `;
    });
    document.querySelector('.services__cards').innerHTML = servicesCards;
}

// Adding services in <select>
let options = '';
services.forEach(item => options += `<option value="${item.name}">${item.name}</option>`);

document.querySelector('#servicos').innerHTML += options;