import { places } from "../data/places.mjs";

const cardContainer = document.querySelector("#place-cards");
const visitMessage = document.querySelector("#visit-message");

// Build one card per place: h2, figure, address, paragraph, button
function buildCard(place, index) {
    const card = document.createElement("section");
    card.className = "place-card";

    const title = document.createElement("h2");
    title.textContent = place.name;

    const figure = document.createElement("figure");
    const img = document.createElement("img");
    img.src = place.image;
    img.alt = place.alt;
    img.width = 300;
    img.height = 200;
    // The first cards are visible on load, so they should not be lazy-loaded
    if (index < 2) {
        img.fetchPriority = "high";
    } else {
        img.loading = "lazy";
    }
    figure.append(img);

    const address = document.createElement("address");
    address.textContent = place.address;

    const description = document.createElement("p");
    description.textContent = place.description;

    const button = document.createElement("button");
    button.type = "button";
    button.textContent = "Learn more";
    button.setAttribute("aria-label", `Learn more about ${place.name}`);

    card.append(title, figure, address, description, button);
    return card;
}

places.forEach((place, index) => cardContainer.append(buildCard(place, index)));

// Visitor message, based on the last visit stored in localStorage
function showVisitMessage() {
    const MS_PER_DAY = 1000 * 60 * 60 * 24;
    const now = Date.now();
    let last = null;

    try {
        last = Number(localStorage.getItem("discover-last-visit")) || null;
        localStorage.setItem("discover-last-visit", String(now));
    } catch {
        // Storage can be blocked; fall back to the welcome message
    }

    let message;
    if (!last) {
        message = "Welcome! Let us know if you have any questions.";
    } else {
        const days = Math.floor((now - last) / MS_PER_DAY);
        if (days < 1) {
            message = "Back so soon! Awesome!";
        } else {
            message = `You last visited ${days} ${days === 1 ? "day" : "days"} ago.`;
        }
    }

    visitMessage.querySelector("p").textContent = message;
    visitMessage.hidden = false;
}

showVisitMessage();

visitMessage.querySelector("button").addEventListener("click", () => {
    visitMessage.hidden = true;
});
