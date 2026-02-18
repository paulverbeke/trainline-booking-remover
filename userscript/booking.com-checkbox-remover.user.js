// ==UserScript==
// @name              Booking.com Checkbox Remover
// @name:fr           Retirer les cases Booking.com
// @namespace         http://tampermonkey.net/
// @version           1.0
// @description       Unchecks and removes the Booking.com checkbox on travel booking websites.
// @description:fr    Décoche et retire les cases Booking.com sur les sites de réservation de voyages
// @author            paulverbeke
// @match             *://www.thetrainline.com/*
// @match             *://es-us.flixbus.com/*
// @match             *://fr.flixbus.be/*
// @match             *://fr.flixbus.ca/*
// @match             *://fr.flixbus.ch/*
// @match             *://global.flixbus.com/*
// @match             *://it.flixbus.ch/*
// @match             *://www.flix.com.mx/*
// @match             *://www.flixbus.al/*
// @match             *://www.flixbus.at/*
// @match             *://www.flixbus.ba/*
// @match             *://www.flixbus.be/*
// @match             *://www.flixbus.bg/*
// @match             *://www.flixbus.ca/*
// @match             *://www.flixbus.cat/*
// @match             *://www.flixbus.ch/*
// @match             *://www.flixbus.cl/*
// @match             *://www.flixbus.co.uk/*
// @match             *://www.flixbus.com/*
// @match             *://www.flixbus.com.au/*
// @match             *://www.flixbus.com.br/*
// @match             *://www.flixbus.com.tr/*
// @match             *://www.flixbus.cz/*
// @match             *://www.flixbus.de/*
// @match             *://www.flixbus.dk/*
// @match             *://www.flixbus.ee/*
// @match             *://www.flixbus.es/*
// @match             *://www.flixbus.fi/*
// @match             *://www.flixbus.fr/*
// @match             *://www.flixbus.gr/*
// @match             *://www.flixbus.hr/*
// @match             *://www.flixbus.hu/*
// @match             *://www.flixbus.ie/*
// @match             *://www.flixbus.in/*
// @match             *://www.flixbus.it/*
// @match             *://www.flixbus.lt/*
// @match             *://www.flixbus.lv/*
// @match             *://www.flixbus.mk/*
// @match             *://www.flixbus.nl/*
// @match             *://www.flixbus.no/*
// @match             *://www.flixbus.pl/*
// @match             *://www.flixbus.pt/*
// @match             *://www.flixbus.ro/*
// @match             *://www.flixbus.rs/*
// @match             *://www.flixbus.se/*
// @match             *://www.flixbus.si/*
// @match             *://www.flixbus.sk/*
// @match             *://www.flixbus.ua/*
// @match             *://zh-us.flixbus.com/*
// @match             *://gr.skyscanner.com/*
// @match             *://ru.skyscanner.com/*
// @match             *://www.espanol.skyscanner.com/*
// @match             *://www.skyscanner.ae/*
// @match             *://www.skyscanner.at/*
// @match             *://www.skyscanner.ca/*
// @match             *://www.skyscanner.ch/*
// @match             *://www.skyscanner.co.id/*
// @match             *://www.skyscanner.co.il/*
// @match             *://www.skyscanner.co.in/*
// @match             *://www.skyscanner.co.kr/*
// @match             *://www.skyscanner.co.nz/*
// @match             *://www.skyscanner.co.th/*
// @match             *://www.skyscanner.co.za/*
// @match             *://www.skyscanner.com/*
// @match             *://www.skyscanner.com.ar/*
// @match             *://www.skyscanner.com.au/*
// @match             *://www.skyscanner.com.br/*
// @match             *://www.skyscanner.com.co/*
// @match             *://www.skyscanner.com.eg/*
// @match             *://www.skyscanner.com.hk/*
// @match             *://www.skyscanner.com.mx/*
// @match             *://www.skyscanner.com.my/*
// @match             *://www.skyscanner.com.ph/*
// @match             *://www.skyscanner.com.sa/*
// @match             *://www.skyscanner.com.sg/*
// @match             *://www.skyscanner.com.tr/*
// @match             *://www.skyscanner.com.tw/*
// @match             *://www.skyscanner.com.ua/*
// @match             *://www.skyscanner.com.vn/*
// @match             *://www.skyscanner.cz/*
// @match             *://www.skyscanner.de/*
// @match             *://www.skyscanner.dk/*
// @match             *://www.skyscanner.es/*
// @match             *://www.skyscanner.fi/*
// @match             *://www.skyscanner.fr/*
// @match             *://www.skyscanner.gg/*
// @match             *://www.skyscanner.hr/*
// @match             *://www.skyscanner.hu/*
// @match             *://www.skyscanner.ie/*
// @match             *://www.skyscanner.it/*
// @match             *://www.skyscanner.jp/*
// @match             *://www.skyscanner.net/*
// @match             *://www.skyscanner.nl/*
// @match             *://www.skyscanner.no/*
// @match             *://www.skyscanner.pk/*
// @match             *://www.skyscanner.pl/*
// @match             *://www.skyscanner.pt/*
// @match             *://www.skyscanner.qa/*
// @match             *://www.skyscanner.ro/*
// @match             *://www.skyscanner.se/*
// @match             *://www.skyscanner.sk/*
// @match             *://www.tianxun.com/*
// @grant             none
// ==/UserScript==

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
    // Remove the complete hotel option container 2 levels up
    checkbox.parentElement?.parentElement?.remove();
}

