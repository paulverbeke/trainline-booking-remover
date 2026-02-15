(new MutationObserver(check)).observe(document, {childList: true, subtree: true});

function check(_changes, _observer) {
    let c;
    if ((c = document.getElementById('bookingPromo'))) {
        if (c.checked) {
            c.click();
        }
        // Remove the complete booking.com element 4 levels up
        c.parentElement?.parentElement?.parentElement?.parentElement?.remove();
    }
}