class UI {
    constructor() {
        this.elements = {
            searchInput: document.getElementById("searchInput"),
            searchBtn: document.getElementById("searchBtn"),
            resetBtn: document.getElementById("resetBtn"),
            cardContainer: document.getElementById("cardContainer"),
            notification: document.getElementById("notification"),
            btnEurope: document.getElementById("btnEurope"),
            btnNeighbors: document.getElementById("btnNeighbors"),
            btnMacedonia: document.getElementById("btnMacedonia")
        };
    }

    clearUI() {
        this.elements.cardContainer.innerHTML = "";
        this.elements.notification.innerHTML = "";
    }

    showNotification(message, type = "error") {
        this.elements.notification.innerHTML = `<div class='${type}'>${message}</div>`;
    }

    createCard(country) {
        return `
            <div class="card-column">
                <div>
                    <img src="${country.flags.png}" alt="${country.name.common} Flag" class="info-image">
                    <div>
                        <h5 class="country-title">Country Name: ${country.name.common}</h5>
                        <p class="country-info">${country.name.common} is a country with a population of ${country.population} and the CAPITAL city is: ${country.capital?.[0] || "unknown"}.</p>
                    </div>
                    <div class="">
                        <small class="wiki-link"><b>More info click here -></b> <a href="https:en.wikipedia.org/wiki/${country.name.common}" target="_blank">Wikipedia</a></small>
                    </div>
                </div>
            </div>`;
    }

    displayCountries(countries) {
        this.clearUI();
        if (countries.length === 0) {
            this.showNotification("No countries found!", "warning");
            return;
        }
        countries.forEach(country => {
            this.elements.cardContainer.innerHTML += this.createCard(country);
        });
    }
}

export{UI}