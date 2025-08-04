import * as framerMotion from 'https://esm.run/framer-motion';

const { animate } = framerMotion;

const cardContainer = document.getElementById('card-container');
const graphContainer = document.getElementById('graph-container');

export function showProjectCard(projectData) {
    const cardHTML = `
        <div class="project-card p-6 md:p-8" style="opacity: 0; transform: translateY(30px) scale(0.95);">
            <div class="flex justify-between items-start">
                <h2 class="text-2xl font-header font-bold text-brand-text mb-2">${projectData.title}</h2>
                <button id="close-card-btn" class="text-gray-400 hover:text-brand-accent transition-colors">
                    <i data-lucide="x" class="w-6 h-6"></i>
                </button>
            </div>
            <p class="font-semibold text-brand-accent mb-4">${projectData.role}</p>
            <p class="text-gray-600 mb-6">${projectData.description}</p>
            <div class="flex flex-wrap gap-2">
                ${projectData.tags.map(tag => `<span class="bg-blue-100 text-brand-accent text-xs font-semibold px-2.5 py-1 rounded-full">${tag}</span>`).join('')}
            </div>
        </div>
    `;

    cardContainer.innerHTML = cardHTML;
    lucide.createIcons();
    cardContainer.style.pointerEvents = 'auto';

    const cardElement = cardContainer.querySelector('.project-card');

    graphContainer.classList.add('blurred');
    animate(cardElement, { opacity: 1, y: 0, scale: 1 }, { type: 'spring', stiffness: 400, damping: 30 });
    
    document.getElementById('close-card-btn').addEventListener('click', hideProjectCard);
}

function hideProjectCard() {
    const cardElement = cardContainer.querySelector('.project-card');
    
    graphContainer.classList.remove('blurred');
    
    animate(cardElement, { opacity: 0, y: 30, scale: 0.95 }, { duration: 0.3, ease: 'easeOut' })
        .then(() => {
            cardContainer.innerHTML = '';
            cardContainer.style.pointerEvents = 'none';
        });
}
