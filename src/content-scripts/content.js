(new MutationObserver(check)).observe(document, {childList: true, subtree: true});

function check(_changes, _observer) {
    handleTrainlineBookingPromo();
    handleFlixbusBookingPromo();
    handleSkycannerHotelOption();
}

function handleTrainlineBookingPromo() {
    const checkbox = document.getElementById('bookingPromo');
    if (!checkbox) {
        return;
    }
    if (checkbox.dataset.tecHandled === 'true') {
        return;
    }
    checkbox.dataset.tecHandled = 'true';
    if (checkbox.checked) {
        checkbox.click();
    }
}

function handleFlixbusBookingPromo() {
    const checkbox = document.getElementById('find-my-accommodation-checkbox');
    if (!checkbox) {
        return;
    }
    if (checkbox.dataset.tecHandled === 'true') {
        return;
    }
    checkbox.dataset.tecHandled = 'true';
    if (checkbox.checked) {
        checkbox.click();
    }
}

function handleSkycannerHotelOption() {
    const checkbox = document.querySelector('input[name="parallel-search-option"]');
    if (!checkbox) {
        return;
    }    
    if (checkbox.dataset.tecHandled === 'true') {
        return;
    }
    checkbox.dataset.tecHandled = 'true';
    if (checkbox.checked) {
        checkbox.click();
    }
}