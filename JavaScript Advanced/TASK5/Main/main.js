import { Auth } from '../services/Auth.js';
import { UI } from '../services/UI.js';
import { App } from '../services/App.js';

// IIFE to Initialize the App
(() => {
    const auth = new Auth();
    const ui = new UI();
    new App(auth, ui);
})();