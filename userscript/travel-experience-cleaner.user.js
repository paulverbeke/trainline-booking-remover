// ==UserScript==
// @name              Travel Experience Cleaner
// @name:fr           Simplifier l'expérience de voyage
// @namespace         http://tampermonkey.net/
// @version           1.0.4
// @description       Unchecks promotional checkboxes and hotel search options on travel booking websites.
// @description:fr    Simplifie votre expérience de voyage en décochant automatiquement les cases promotionnelles et les options de recherche hôtel
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
// @match             *://www.es.momondo.com/*
// @match             *://www.fr.momondo.be/*
// @match             *://www.fr.momondo.ca/*
// @match             *://www.fr.momondo.ch/*
// @match             *://www.it.momondo.ch/*
// @match             *://www.momondo.at/*
// @match             *://www.momondo.be/*
// @match             *://www.momondo.ca/*
// @match             *://www.momondo.ch/*
// @match             *://www.momondo.cl/*
// @match             *://www.momondo.co.uk/*
// @match             *://www.momondo.co.za/*
// @match             *://www.momondo.com/*
// @match             *://www.momondo.com.au/*
// @match             *://www.momondo.com.br/*
// @match             *://www.momondo.com.co/*
// @match             *://www.momondo.com.pe/*
// @match             *://www.momondo.com.tr/*
// @match             *://www.momondo.cz/*
// @match             *://www.momondo.de/*
// @match             *://www.momondo.dk/*
// @match             *://www.momondo.ee/*
// @match             *://www.momondo.es/*
// @match             *://www.momondo.fi/*
// @match             *://www.momondo.fr/*
// @match             *://www.momondo.ie/*
// @match             *://www.momondo.in/*
// @match             *://www.momondo.it/*
// @match             *://www.momondo.mx/*
// @match             *://www.momondo.nl/*
// @match             *://www.momondo.no/*
// @match             *://www.momondo.pl/*
// @match             *://www.momondo.pt/*
// @match             *://www.momondo.ro/*
// @match             *://www.momondo.se/*
// @match             *://www.momondo.ua/*
// @match             *://www.ru.momondo.ua/*
// @grant             none
// ==/UserScript==

(new MutationObserver(check)).observe(document, {childList: true, subtree: true});

function check(_changes, _observer) {
    handleTrainlineBookingPromo();
    handleFlixbusBookingPromo();
    handleSkycannerHotelOption();
    handleMomondoHotelOptions();
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

function handleMomondoHotelOptions() {
    // Momondo shows various promotional checkboxes depending on the route:
    // Booking.com, Trip.com, Air France, Vueling, etc.
    // All follow the pattern: id="pres-default-*"
    const checkboxes = document.querySelectorAll('input[id^="pres-default-"]');
    
    checkboxes.forEach(checkbox => {
        if (checkbox.dataset.tecHandled === 'true') {
            return;
        }
        checkbox.dataset.tecHandled = 'true';
        if (checkbox.checked) {
            checkbox.click();
        }
    });
}
