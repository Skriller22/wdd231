const eventsUrl = 'data/events.json';
const eventsContainer = document.querySelector('.current-events');
const MAX_EVENTS = 2;

function createDetail(label, value) {
    const detail = document.createElement('div');
    detail.classList.add('event-detail');

    const term = document.createElement('dt');
    term.textContent = label;

    const description = document.createElement('dd');
    description.textContent = value;

    detail.append(term, description);
    return detail;
}

function formatDate(event) {
    const [year, month, day] = event.date.split('-').map(Number);
    const date = new Date(year, month - 1, day);
    const dateText = date.toLocaleDateString('en-US', {
        weekday: 'short',
        month: 'long',
        day: 'numeric',
        year: 'numeric'
    });
    return `${dateText}, ${event.time}`;
}

function getHosts(event) {
    return event.hosts ? event.hosts.join(', ') : event.host;
}

function displayEvents(events) {
    eventsContainer.innerHTML = '';
    events.forEach((event) => {
        const card = document.createElement('div');
        card.classList.add('event-card');

        const name = document.createElement('h3');
        name.textContent = event.name;

        const details = document.createElement('dl');
        details.classList.add('event-details');
        details.append(
            createDetail('Date', formatDate(event)),
            createDetail('Location', event.location),
            createDetail(event.hosts && event.hosts.length > 1 ? 'Hosts' : 'Host', getHosts(event)),
            createDetail('Admission', event.admission)
        );

        const description = document.createElement('p');
        description.classList.add('event-description');
        description.textContent = event.description;

        const linkWrapper = document.createElement('p');
        linkWrapper.classList.add('event-link');
        const link = document.createElement('a');
        link.href = 'discover.html';
        link.textContent = 'Discover More';
        linkWrapper.appendChild(link);

        card.append(name, details, description, linkWrapper);
        eventsContainer.appendChild(card);
    });
}

// Local date as YYYY-MM-DD, so events stay "current" through the end of their day
function getToday() {
    const now = new Date();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    return `${now.getFullYear()}-${month}-${day}`;
}

// Shows the next upcoming events; if fewer than MAX_EVENTS remain, the
// most recent past events fill the gap. Results are in date order.
function chooseEvents(events) {
    const today = getToday();
    const sorted = [...events].sort((a, b) => a.date.localeCompare(b.date));
    const upcoming = sorted.filter((event) => event.date >= today).slice(0, MAX_EVENTS);
    const past = sorted.filter((event) => event.date < today);
    const recent = past.slice(Math.max(past.length - (MAX_EVENTS - upcoming.length), 0));
    return [...recent, ...upcoming];
}

async function getEvents() {
    try {
        const response = await fetch(eventsUrl);
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        const data = await response.json();
        displayEvents(chooseEvents(data.events));
    } catch (error) {
        console.error('Could not load events:', error);
        eventsContainer.textContent = 'Unable to load events right now.';
    }
}

getEvents();
