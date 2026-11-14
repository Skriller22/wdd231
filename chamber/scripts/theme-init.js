// Runs before the page renders (no defer) so a saved light theme is applied
// before the first paint. theme.js handles the toggle button afterward.
try {
	if (localStorage.getItem('theme') === 'light') {
		document.documentElement.classList.add('light-mode');
	}
} catch (error) {
	// Storage can be blocked; the page just stays in the default dark theme.
}
