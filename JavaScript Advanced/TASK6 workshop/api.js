class API {
    constructor(baseURL) {
        this.baseURL = baseURL;
    }

    async getAllCountries() {
        try {
            const response = await fetch(`${this.baseURL}/all`);
            const data = await response.json();
            return data;
        } catch (error) {
            console.error("Error fetching countries:", error);
            return [];
        }
    }

    async searchCountriesByName(countryName) {
        try {
            const response = await fetch(`${this.baseURL}/name/${countryName}`);
            const data = await response.json();
            return data;
        } catch (error) {
            console.error("Error searching for country:", error);
            return null;
        }
    }
}

export {API}                        