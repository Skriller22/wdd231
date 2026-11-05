const url = 'data/members.json';
const cards = document.querySelector('#directory-cards');
const gridButton = document.querySelector('#grid-view');
const listButton = document.querySelector('#list-view');

function displayBusinesses(businesses) {
    cards.innerHTML = '';
    businesses.forEach((business) => {
        const card = document.createElement('div');
        card.classList.add('sample-card');

        const image = document.createElement('img');
        image.src = business.image;
        image.alt = `${business.name} logo`;
        image.width = 300;
        image.height = 300;
        image.loading = 'lazy';

        const name = document.createElement('h3');
        name.textContent = business.name;

        const contact = document.createElement('div');
        contact.classList.add('card-contact-info');

        const address = document.createElement('p');
        address.textContent = business.address;

        const phone = document.createElement('p');
        phone.textContent = business.phone;

        const link = document.createElement('a');
        link.href = business.website;
        link.textContent = 'Visit Website';
        link.target = '_blank';
        link.rel = 'noopener noreferrer';

        contact.append(address, phone);
        card.append(name, image, contact, link);
        cards.appendChild(card);
    });
}

function getSector(business) {
    const match = business.address.match(/Sector\s+(\d+)/i);
    return match ? Number(match[1]) : Infinity;
}

function sortBySector(businesses) {
    return [...businesses].sort((a, b) => getSector(a) - getSector(b));
}

async function getBusinesses() {
    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        const data = await response.json();
        displayBusinesses(sortBySector(data.businesses));
    } catch (error) {
        console.error('Could not load businesses:', error);
        cards.textContent = 'Unable to load the business directory right now.';
    }
}

function setView(view) {
    const isGrid = view === 'grid';
    cards.classList.toggle('grid-view', isGrid);
    cards.classList.toggle('list-view', !isGrid);
    gridButton.setAttribute('aria-pressed', isGrid);
    listButton.setAttribute('aria-pressed', !isGrid);
}

gridButton.addEventListener('click', () => setView('grid'));
listButton.addEventListener('click', () => setView('list'));

setView('grid');
getBusinesses();
