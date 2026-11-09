const spotlightUrl = 'data/members.json';
const spotlight = document.querySelector('.membership-spotlight');
const SPOTLIGHT_COUNT = 3;
const SPOTLIGHT_LEVELS = ['Gold', 'Silver'];

function pickRandom(items, count) {
    const pool = [...items];
    for (let i = pool.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [pool[i], pool[j]] = [pool[j], pool[i]];
    }
    return pool.slice(0, count);
}

function displaySpotlight(businesses) {
    spotlight.innerHTML = '';
    businesses.forEach((business) => {
        const card = document.createElement('div');
        card.classList.add('spotlight-card');

        const name = document.createElement('h3');
        name.textContent = business.name;

        const level = document.createElement('span');
        level.classList.add('member-level', `level-${business.level.toLowerCase()}`);
        level.textContent = `${business.level} Level`;

        const image = document.createElement('img');
        image.src = business.image;
        image.alt = `${business.name} logo`;
        image.width = 150;
        image.height = 150;
        image.loading = 'lazy';

        const details = document.createElement('dl');
        details.classList.add('spotlight-details');
        [['Address', business.address], ['Phone', business.phone]].forEach(([label, value]) => {
            const detail = document.createElement('div');
            detail.classList.add('spotlight-detail');
            const term = document.createElement('dt');
            term.textContent = label;
            const description = document.createElement('dd');
            description.textContent = value;
            detail.append(term, description);
            details.appendChild(detail);
        });

        const linkWrapper = document.createElement('p');
        linkWrapper.classList.add('spotlight-link');
        const link = document.createElement('a');
        link.href = business.website;
        link.textContent = 'Visit Website';
        link.target = '_blank';
        link.rel = 'noopener noreferrer';
        linkWrapper.appendChild(link);

        card.append(name, level, image, details, linkWrapper);
        spotlight.appendChild(card);
    });
}

async function getSpotlight() {
    try {
        const response = await fetch(spotlightUrl);
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        const data = await response.json();
        const eligible = data.businesses.filter((business) => SPOTLIGHT_LEVELS.includes(business.level));
        displaySpotlight(pickRandom(eligible, SPOTLIGHT_COUNT));
    } catch (error) {
        console.error('Could not load member spotlight:', error);
        spotlight.textContent = 'Unable to load the member spotlight right now.';
    }
}

getSpotlight();
