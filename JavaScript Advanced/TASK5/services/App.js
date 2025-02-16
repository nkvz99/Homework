class App {
    constructor(auth, ui) {
        this.auth = auth;
        this.ui = ui;
        this.init();
    }

    init() {
        const user = this.auth.getUser();
        if (user) {
            this.ui.showMain();
        }

        this.setupEvents();
    }

    setupEvents() {
        // Handle Login
        this.ui.loginForm.addEventListener("submit", async (event) => {
            event.preventDefault();

            const email = document.getElementById('login-email').value;
            const password = document.getElementById('login-password').value;

            try {
                const result = await this.auth.login(email, password);
                this.ui.showMain();
                this.auth.setUser(result);
                this.ui.showMessage(`Welcome back ${result.firstname}!`);
                this.ui.resetForms();
            } catch (error) {
                this.ui.showMessage(error.message, true);
            }
        });

        // Handle Register Link
        this.ui.registerLink.addEventListener("click", () => {
            this.ui.showRegister();
        });

        // Handle Back to Login
        this.ui.backToLoginBtn.addEventListener("click", () => {
            this.ui.showLogin();
        });

        // Handle Register Form Submission
        this.ui.registerForm.addEventListener("submit", async (event) => {
            event.preventDefault();
            const firstname = document.getElementById('register-firstname').value;
            const lastname = document.getElementById('register-lastname').value;
            const email = document.getElementById('register-email').value;
            const password = document.getElementById('register-password').value;

            try {
                const result = await this.auth.register(firstname, lastname, email, password);
                this.ui.showMessage(result.message);
                this.ui.showLogin();
                this.ui.resetForms();
            } catch (error) {
                this.ui.showMessage(error.message, true);
            }
        });

        // Handle Logout
        this.ui.logoutBtn.addEventListener('click', () => {
            this.auth.logout();
            this.ui.showLogin();
            this.ui.hideMain();
            this.ui.showMessage('Logged out successfully!');
        });
    }
}

export {App}