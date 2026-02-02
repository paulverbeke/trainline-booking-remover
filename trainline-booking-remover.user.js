// ==UserScript==
// @name         Trainline Booking.com Remover
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Automatically unchecks the booking.com checkbox on thetrainline.com homepage
// @author       Paul Verbeke
// @match        https://www.thetrainline.com/*
// @match        https://thetrainline.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=thetrainline.com
// @grant        none
// @run-at       document-end
// ==/UserScript==

(function() {
    'use strict';

    // Function to uncheck the booking.com checkbox
    function uncheckBookingCheckbox() {
        // Common selectors that might be used for the booking.com checkbox
        const selectors = [
            'input[type="checkbox"][name*="booking"]',
            'input[type="checkbox"][id*="booking"]',
            'input[type="checkbox"][data-test*="booking"]',
            'input[type="checkbox"][aria-label*="booking"]',
            'input[type="checkbox"][aria-label*="Booking"]',
            'input[type="checkbox"][aria-label*="Booking.com"]',
            'input[type="checkbox"][name*="accommodation"]',
            'input[type="checkbox"][id*="accommodation"]'
        ];

        let found = false;

        // Try each selector
        for (const selector of selectors) {
            const checkboxes = document.querySelectorAll(selector);
            checkboxes.forEach(checkbox => {
                if (checkbox.checked) {
                    // Trigger click to uncheck and fire any event listeners
                    checkbox.click();
                    console.log('[Trainline Booking Remover] Unchecked booking checkbox:', checkbox);
                    found = true;
                }
            });
        }

        // If no checkbox found yet, look for any checkbox that might be related to booking
        if (!found) {
            const allCheckboxes = document.querySelectorAll('input[type="checkbox"]');
            allCheckboxes.forEach(checkbox => {
                const parent = checkbox.closest('label, div, span');
                if (parent) {
                    const text = parent.textContent.toLowerCase();
                    if (text.includes('booking') || text.includes('accommodation')) {
                        if (checkbox.checked) {
                            // Trigger click to uncheck and fire any event listeners
                            checkbox.click();
                            console.log('[Trainline Booking Remover] Unchecked booking checkbox by text match:', checkbox);
                            found = true;
                        }
                    }
                }
            });
        }

        if (found) {
            console.log('[Trainline Booking Remover] Successfully unchecked booking checkbox');
        } else {
            console.log('[Trainline Booking Remover] No booking checkbox found (may already be unchecked or not present on this page)');
        }
    }

    // Run immediately
    uncheckBookingCheckbox();

    // Also run after a short delay to catch dynamically loaded content
    setTimeout(uncheckBookingCheckbox, 1000);
    setTimeout(uncheckBookingCheckbox, 2000);

    // Debounce function to limit execution frequency
    let debounceTimer;
    function debounce(func, delay) {
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(func, delay);
    }

    // Set up a MutationObserver to watch for DOM changes
    const observer = new MutationObserver((mutations) => {
        // Check if any new checkboxes were added
        let hasNewCheckbox = false;
        for (const mutation of mutations) {
            if (mutation.addedNodes.length > 0) {
                // Check if any added node is or contains a checkbox
                for (const node of mutation.addedNodes) {
                    if (node.nodeType === Node.ELEMENT_NODE) {
                        if (node.matches && node.matches('input[type="checkbox"]')) {
                            hasNewCheckbox = true;
                            break;
                        }
                        if (node.querySelector && node.querySelector('input[type="checkbox"]')) {
                            hasNewCheckbox = true;
                            break;
                        }
                    }
                }
                if (hasNewCheckbox) break;
            }
        }
        
        // Only trigger if a checkbox was actually added, and debounce to avoid excessive calls
        if (hasNewCheckbox) {
            debounce(uncheckBookingCheckbox, 300);
        }
    });

    // Start observing the document for changes
    observer.observe(document.body, {
        childList: true,
        subtree: true
    });

    console.log('[Trainline Booking Remover] Script initialized and monitoring for booking checkboxes');
})();
