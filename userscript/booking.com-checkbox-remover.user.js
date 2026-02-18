// ==UserScript==
// @name              Booking.com Checkbox Remover
// @name:fr           Retirer les cases Booking.com
// @namespace         http://tampermonkey.net/
// @version           1.0
// @description       Unchecks and removes the Booking.com checkbox on travel booking websites.
// @description:fr    Décoche et retire la case Booking.com sur les sites de réservation de voyages
// @author            paulverbeke
// @match             https://www.thetrainline.com/*
// @match             https://www.flixbus.com/*
// @grant             none
// ==/UserScript==

(new MutationObserver(check)).observe(document, {childList: true, subtree: true});

function check(_changes, _observer) {
    handleTrainlineBookingPromo();
    handleFlixbusBookingPromo();
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

