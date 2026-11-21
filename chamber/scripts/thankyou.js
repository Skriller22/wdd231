const params = new URLSearchParams(window.location.search);

document.querySelectorAll('#submission-details dd').forEach(item => {
    const value = params.get(item.dataset.field);

    if (item.dataset.field === 'timestamp' && value) {
        const date = new Date(value);
        item.textContent = isNaN(date) ? value : date.toLocaleString();
    } else {
        // textContent keeps submitted text from being treated as HTML
        item.textContent = value || 'Not provided';
    }
});
