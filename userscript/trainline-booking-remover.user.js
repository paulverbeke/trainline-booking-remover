// ==UserScript==
// @name              Trainline Booking.com remover
// @name:fr           Trainline pour le transport, pas l'hébergement
// @namespace         http://tampermonkey.net/
// @version           1.0
// @description       Unchecks the Booking.com checkbox on The Trainline.
// @description:fr    Décoche la recherche booking.com sur Trainline
// @author            paulverbeke
// @match             https://www.thetrainline.com/*
// @grant             none
// ==/UserScript==

(new MutationObserver(check)).observe(document, {childList: true, subtree: true});

function check(changes, observer) {
    let c;
    if ((c = document.getElementById('bookingPromo'))) {
        if (c.checked) {
            c.click();
        }
        // Remove the complete booking.com element 4 levels up
        c.parentElement?.parentElement?.parentElement?.parentElement?.remove();
    }
}

