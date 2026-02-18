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
    if (checkbox.checked) {
        checkbox.click();
    }
    // Remove the complete booking.com element 4 levels up
    checkbox.parentElement?.parentElement?.parentElement?.parentElement?.remove();
}

function handleFlixbusBookingPromo() {
    const checkbox = document.getElementById('find-my-accommodation-checkbox');
    if (!checkbox) {
        return;
    }
    if (checkbox.checked) {
        checkbox.click();
    }
    // Remove the complete booking.com element 3 levels up
    checkbox.parentElement?.parentElement?.parentElement?.remove();
}

function handleSkycannerHotelOption() {
    const checkbox = document.querySelector('input[name="parallel-search-option"]');
    if (!checkbox) {
        return;
    }    
    if (checkbox.checked) {
        checkbox.click();
    }
    
    // Verify parent element has ParallelSearch class before removing
    const parentToRemove = checkbox.parentElement?.parentElement;
    if (!parentToRemove || !parentToRemove.className.includes('ParallelSearch')) {
        return;
    }

    // Remove the complete hotel option container 2 levels up
    parentToRemove.remove();
}