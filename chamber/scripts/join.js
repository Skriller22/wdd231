const membershipsUrl = 'data/memberships.json';

const modal = document.getElementById('membership-modal');
const modalTitle = modal.querySelector('.modal-title');
const modalBody = modal.querySelector('.modal-body');

let levels = [];

async function loadLevels() {
    try {
        const response = await fetch(membershipsUrl);
        if (!response.ok) {
            throw new Error(`Request failed: ${response.status}`);
        }
        const data = await response.json();
        levels = data.levels;
    } catch (error) {
        console.error('Could not load membership levels:', error);
    }
}

function showLevel(id) {
    const level = levels.find(item => item.id === id);
    if (!level) {
        return;
    }

    modalTitle.textContent = level.name;
    modalBody.innerHTML = '';

    const price = document.createElement('p');
    price.className = 'modal-price';
    price.textContent = `${level.price} · ${level.audience}`;

    const list = document.createElement('ul');
    level.benefits.forEach(benefit => {
        const item = document.createElement('li');
        item.textContent = benefit;
        list.append(item);
    });

    modalBody.append(price, list);
    modal.showModal();
}

document.getElementById('timestamp').value = new Date().toISOString();

document.querySelectorAll('.membership-level-card').forEach(button => {
    button.addEventListener('click', () => showLevel(button.dataset.level));
});

modal.querySelector('.close-button').addEventListener('click', () => modal.close());

// Clicking the backdrop (the dialog element itself) closes the modal
modal.addEventListener('click', event => {
    if (event.target === modal) {
        modal.close();
    }
});

loadLevels();
