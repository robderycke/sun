"use strict";

// #region *** DOM references                           ***********
const domSunrise = document.querySelector('.js-sunrise');
const domZenith = document.querySelector('.js-zenith');
const domSunset = document.querySelector('.js-sunset');
const domDateLabel = document.querySelector('.js-current-date');
const domDetailTable = document.querySelector('.js-detail-table');
const btnBackToTop = document.querySelector('.js-back-to-top');
// #endregion

// #region *** Callback-Visualisation - show___         ***********
/**
 * Toont de hoofd-tijden in de kaarten
 */
const showSunStats = (data) => {
    domSunrise.innerText = data.sunrise;
    domZenith.innerText = data.zenith;
    domSunset.innerText = data.sunset;
};

/**
 * Bouwt de tabel met schemering details
 */
const showDetailedTimes = (details) => {
    let html = '';
    for (const [key, value] of Object.entries(details)) {
        html += `
            <tr>
                <td class="ps-4 py-3 fw-semibold">${key}</td>
                <td class="text-end pe-4 py-3 text-primary fw-bold">${value}</td>
            </tr>
        `;
    }
    domDetailTable.innerHTML = html;
};

/**
 * Beheert de zichtbaarheid van de back-to-top knop
 */
const showScrollButton = () => {
    if (window.scrollY > 400) {
        btnBackToTop.style.display = 'flex';
    } else {
        btnBackToTop.style.display = 'none';
    }
};
// #endregion

// #region *** Callback-No Visualisation - callback___  ***********
const callbackScrollTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
};
// #endregion

// #region *** Data Access - get___                     ***********
/**
 * Haalt de data op (Simulatie van de tabel uit de afbeelding)
 */
const getSunriseData = () => {
    // Data specifiek voor zondag 29 maart 2026
    const data = {
        main: {
            sunrise: "07:28",
            zenith: "13:53",
            sunset: "20:17"
        },
        details: {
            "Begin schemering (astro)": "05:34",
            "Begin schemering (nautisch)": "06:16",
            "Begin schemering (civiel)": "06:56",
            "Einde schemering (civiel)": "20:49",
            "Einde schemering (nautisch)": "21:29",
            "Einde schemering (astro)": "22:12"
        }
    };

    showSunStats(data.main);
    showDetailedTimes(data.details);
};
// #endregion

// #region *** Event Listeners - listenTo___            ***********
const listenToScroll = () => {
    window.addEventListener('scroll', showScrollButton);
};

const listenToClicks = () => {
    btnBackToTop.addEventListener('click', callbackScrollTop);
};
// #endregion

// #region *** Init / DOMContentLoaded                  ***********
const init = () => {
    console.info("ZonSpoor Dashboard 2026 geladen.");
    
    // Stel de huidige datum in op de display
    const today = new Date(2026, 2, 29); // Maart is index 2
    domDateLabel.innerText = today.toLocaleDateString('nl-BE', { 
        weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' 
    });

    // Haal data op en start listeners
    getSunriseData();
    listenToScroll();
    listenToClicks();
};

document.addEventListener('DOMContentLoaded', init);
// #endregion