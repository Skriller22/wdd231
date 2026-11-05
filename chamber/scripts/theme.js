const themeToggle = document.querySelector('#theme-toggle');
const themeIcon = themeToggle?.querySelector('img');

// Dark is the default theme; light mode is applied with the 'light-mode' class.
function updateTheme(isLightMode) {
	document.documentElement.classList.toggle('light-mode', isLightMode);

	// The button shows the theme it will switch to.
	const label = isLightMode ? 'Switch to dark mode' : 'Switch to light mode';

	if (themeIcon) {
		themeIcon.src = isLightMode ? 'images/dark-mode.svg' : 'images/light-mode.svg';
		themeIcon.alt = label;
	}

	themeToggle?.setAttribute('aria-label', label);
}

updateTheme(localStorage.getItem('theme') === 'light');

themeToggle?.addEventListener('click', () => {
	const isLightMode = !document.documentElement.classList.contains('light-mode');
	updateTheme(isLightMode);
	localStorage.setItem('theme', isLightMode ? 'light' : 'dark');
});
