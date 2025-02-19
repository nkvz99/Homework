import { API } from "./api.js";
import { UI } from "./ui.js";
import { Events } from "./events.js";

document.addEventListener("DOMContentLoaded", async () => {
    const api = new API("https://restcountries.com/v3.1");
    const ui = new UI();
    const events = new Events(api, ui);

    events.init();

    const countries = await api.getAllCountries();
    ui.displayCountries(countries);
});
