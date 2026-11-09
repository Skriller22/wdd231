// OpenWeather current weather for Irvine, California.
// Paste your own key from https://home.openweathermap.org/api_keys
const apiKey = 'e55c74d00fb4b91b12012e6d5894575a';
const weatherUrl = 'https://api.openweathermap.org/data/2.5/weather'
    + '?lat=33.6846&lon=-117.8265&units=imperial'
    + `&appid=${apiKey}`;

const forecastUrl = 'https://api.openweathermap.org/data/2.5/forecast'
    + '?lat=33.6846&lon=-117.8265&units=imperial'
    + `&appid=${apiKey}`;

const forecastList = document.querySelector('.weather-forecast');
const weatherTemp =document.querySelector('#weather-temp');
const weatherHumidity = document.querySelector('#weather-humidity');
const weatherWind = document.querySelector('#weather-wind');
const weatherReport = document.querySelector('.weather-report');

function capitalize(text) {
    return text.charAt(0).toUpperCase() + text.slice(1);
}

function displayWeather(data) {
    weatherTemp.textContent = `${Math.round(data.main.temp)}°F`;
    weatherHumidity.textContent = `${Math.round(data.main.humidity)}%`;
    weatherWind.textContent = `${Math.round(data.wind.speed)} mph`;

    const conditions = capitalize(data.weather[0].description);
    const feelsLike = Math.round(data.main.feels_like);
    weatherReport.textContent = `${conditions}. Feels like ${feelsLike}°F.`;
}

// The forecast is in 3-hour steps; take the entry closest to noon for each of the next 3 days.
function pickDailyForecast(entries) {
    const today = new Date().toLocaleDateString('en-CA');
    const days = new Map();
    entries.forEach((entry) => {
        const date = new Date(entry.dt * 1000);
        const key = date.toLocaleDateString('en-CA');
        if (key === today) return;
        const distance = Math.abs(date.getHours() - 12);
        const best = days.get(key);
        if (!best || distance < best.distance) days.set(key, { entry, date, distance });
    });
    return [...days.values()].slice(0, 3);
}

function displayForecast(data) {
    forecastList.innerHTML = '';
    pickDailyForecast(data.list).forEach(({ entry, date }) => {
        const item = document.createElement('li');

        const day = document.createElement('span');
        day.classList.add('forecast-day');
        day.textContent = date.toLocaleDateString('en-US', { weekday: 'long' });

        const temp = document.createElement('span');
        temp.classList.add('forecast-temp');
        temp.textContent = `${Math.round(entry.main.temp)}°F`;

        item.append(day, temp);
        forecastList.appendChild(item);
    });
}

async function getWeather() {
    try {
        const response = await fetch(weatherUrl);
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        displayWeather(await response.json());
    } catch (error) {
        console.error('Could not load weather:', error);
        weatherReport.textContent = 'Weather data is unavailable right now.';
    }
}

async function getForecast() {
    try {
        const response = await fetch(forecastUrl);
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        displayForecast(await response.json());
    } catch (error) {
        console.error('Could not load forecast:', error);
        forecastList.textContent = 'Forecast is unavailable right now.';
    }
}

getWeather();
getForecast();
