class Events {
    constructor(api, ui) {
        this.api = api;
        this.ui = ui;
    }

    handleEuropeClick() {
        this.ui.clearUI();
        this.api.getAllCountries().then(countries => {
            const filtered = countries.filter(c => c.region === "Europe");
            this.ui.displayCountries(filtered);
        });
    }

    handleNeighborsClick() {
        this.ui.clearUI();
        this.api.getAllCountries().then(countries => {
            const filtered = countries.filter(c => c.borders?.includes("MKD"));
            this.ui.displayCountries(filtered);
        });
    }

    handleMacedoniaClick() {
        this.ui.clearUI();
        this.api.getAllCountries().then(countries => {
            const result = countries.find(c => c.name.common.includes("Macedonia"));
            if (result) {
                this.ui.displayCountries([result]);
            } else {
                this.ui.showNotification("Macedonia not found!", "error");
            }
        });
    }

    handleSearchClick() {
    const query = this.ui.elements.searchInput.value;
    if (!query) return this.ui.showNotification("Please enter a country name!", "error");

    const result = this.api.searchCountriesByName(query);
    if (result && result.length > 0) {
        result.then(res => this.ui.displayCountries(res))
              .catch(() => this.ui.showNotification("Country not found!", "error"));
    } else {
        this.ui.showNotification("Country not found!", "error");
    }
}


    handleResetClick() {
        this.ui.clearUI();
        this.ui.elements.searchInput.value = "";
        this.api.getAllCountries().then(countries => {
            this.ui.displayCountries(countries);
        });
    }

    init() {
        this.ui.elements.btnEurope.addEventListener("click", () => this.handleEuropeClick());
        this.ui.elements.btnNeighbors.addEventListener("click", () => this.handleNeighborsClick());
        this.ui.elements.btnMacedonia.addEventListener("click", () => this.handleMacedoniaClick());
        this.ui.elements.searchBtn.addEventListener("click", () => this.handleSearchClick());
        this.ui.elements.resetBtn.addEventListener("click", () => this.handleResetClick());
    }
}

export { Events };
