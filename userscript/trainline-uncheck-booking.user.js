// ==UserScript==
// @name              Trainline Booking.com remover
// @description       Uncheck booking.com search on Trainline.
// @name:fr           Trainline pour le transport, pas l'hébergement
// @description:fr    Décoche la recherche booking.com sur Trainline
// @namespace         paulverbeke
// @version           1.0
// @author            paulverbeke
// @match             https://www.thetrainline.com/fr*
// @grant             none
// ==/UserScript==

(new MutationObserver(check)).observe(document, {childList: true, subtree: true});

function check(changes, observer) {
    let c;
    if ((c = document.getElementById('bookingPromo')) && c.checked) {
        c.click();
    }
}

