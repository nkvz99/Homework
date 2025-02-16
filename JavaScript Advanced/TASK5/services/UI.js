class UI {
    constructor() {
        this.loginForm = document.getElementById("login-form");
        this.registerForm = document.getElementById("register-form");
        this.messageDiv = document.getElementById('message');
        this.logoutBtn = document.getElementById('logout-btn');
        this.registerLink = document.getElementById("register-link");
        this.backToLoginBtn = document.getElementById("back-to-login");
        this.main = document.getElementById('main');
    }

    showMessage(message, isError = false) {
        this.messageDiv.style.display = "block";
        this.messageDiv.textContent = message;

        // Remove existing classes
        this.messageDiv.classList.remove("error", "success");

        // Add the appropriate class based on isError
        if (isError) {
            this.messageDiv.classList.add("error");
        } else {
            this.messageDiv.classList.add("success");
        }

        // Hide the message after 2 seconds
        setTimeout(() => {
            this.messageDiv.textContent = "";
            this.messageDiv.style.display = "none";
        }, 2000);
    }

    showLogin() {
        this.loginForm.style.display = "block";
        this.registerForm.style.display = "none";
    }

    showRegister() {
        this.loginForm.style.display = "none";
        this.registerForm.style.display = "block";
    }

    showMain() {
        this.loginForm.style.display = "none";
        this.main.style.display = "flex";
    }

    hideMain() {
        this.main.style.display = "none";
    }

    resetForms() {
        this.loginForm.reset();
        this.registerForm.reset();
    }
}

export {UI}