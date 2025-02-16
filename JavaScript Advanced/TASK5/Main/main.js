
// const loginForm = document.getElementById("login-form");
// const registerForm = document.getElementById("register-form");
// const messageDiv = document.getElementById('message');
// const logoutBtn = document.getElementById('logout-btn');
// const registerLink = document.getElementById("register-link");
// const backToLoginBtn = document.getElementById("back-to-login");
// const main = document.getElementById('main');



// function generateID() {
//     return Date.now();
// }
// // Utility that stores the logged in user in localeStorage
// function setLoggedInUser(user) {
//     localStorage.setItem("loggedUser", JSON.stringify(user));
// }

// function getLoggedInUser() {
//     const user = localStorage.getItem("loggedUser");
//     return user;
// }

// function logout() {
//     localStorage.removeItem("loggedUser");
// }

// function saveUsersToLocalStorage(users) {
//     localStorage.setItem("users", JSON.stringify(users));
// }

// function loadUsersFromLocalStorage() {
//     const users = localStorage.getItem("users");
//     return users ? JSON.parse(users) : [];
// }

// class User {
//     constructor(firstname, lastname, email, password) {
//         this.id = generateID();
//         this.firstname = firstname;
//         this.lastname = lastname;
//         this.email = email;
//         this.password = password;
//     }
// }

// // Load users from Local Storage
// let users = loadUsersFromLocalStorage();

// // Hardcoded data (simulating a db);
// if (users.length === 0) {
//     users = [
//         new User('John', 'Doe', 'john.doe@mail.com', '12345'),
//         new User('Jane', 'Doe', 'jane.doe@mail.com', 'p@ssW0rd')
//     ];
//     saveUsersToLocalStorage(users);
// }

// // Simulate login API call
// function loginUser(email, password) {
//     return new Promise((resolve, reject) => {
//         setTimeout(() => {
//             const userFound = users.find((user) => user.email === email && user.password === password);
//             // Early return

//             if (!userFound) {
//                 reject({ message: "Invalid email or password" });
//                 return;
//             }

//             resolve(userFound);
//         }, 1000);
//     });
// }

// // Simulate register API call
// function registerUser(firstname, lastname, email, password) {
//     return new Promise((resolve, reject) => {
//         setTimeout(() => {
//             if (!firstname || !lastname || !email || !password) {
//                 reject({ message: "All fields are required" });
//                 return;
//             }

//             const userExists = users.some((user) => user.email === email);
//             if (userExists) {
//                 reject({ message: `User with the email: ${email} already exists.` });
//                 return;
//             }

//             const newUser = new User(firstname, lastname, email, password);
//             users.push(newUser);

//             // Save updated users array to Local Storage
//             saveUsersToLocalStorage(users);

//             resolve({ message: "Registration successful! Please log in." });
//         }, 1000);
//     });
// }

// // Display message utility
// function displayMessage(message, isError = false) {
//     messageDiv.style.display = "block";
//     messageDiv.textContent = message;
//     messageDiv.classList.add(isError ? "error" : "success");

//     setTimeout(() => {
//         messageDiv.textContent = "";
//         messageDiv.style.display = "none";
//     }, 2000);
// }

// // IIFE => Immedietly invoked function expression
// (() => {
//     const loggedInUser = getLoggedInUser();
//     if (loggedInUser) {
//         loginForm.style.display = "none";
//         main.style.display = "flex";
//     }
//     // SCOPE OF THE IIFE

//     // Event listeners
//     // Handle Login
//     loginForm.addEventListener("submit", async (event) => {
//         event.preventDefault();

//         const email = document.getElementById('login-email').value;
//         const password = document.getElementById('login-password').value;
//                 // Resolving promise with .then
//         // loginUser(email, password)
//         // .then((result) => {
//         //     console.log(result)
//         // })
//         // .catch((error) => {
//         //     console.log(error)
//         // })

//         // Resolving promise with async/await
//         try {
//             const result = await loginUser(email, password);
//             loginForm.style.display = 'none';
//             main.style.display = "flex";
//             setLoggedInUser(result);
//             displayMessage(`Welcome back ${result.firstname}!`);
//             loginForm.reset();
//         } catch (error) {
//             displayMessage(error.message, true);
//         }
//     });
    
//     // Handle register link
//     registerLink.addEventListener("click", () => {
//         loginForm.style.display = "none";
//         registerForm.style.display = "block";
//     });

//     backToLoginBtn.addEventListener("click", () => {
//         registerForm.style.display = "none";
//         loginForm.style.display = "block";
//     });

//     registerForm.addEventListener("submit", async (event) => {
//         event.preventDefault();
//         const firstname = document.getElementById('register-firstname').value;
//         const lastname = document.getElementById('register-lastname').value;
//         const email = document.getElementById('register-email').value;
//         const password = document.getElementById('register-password').value;

//         try {
//             const result = await registerUser(firstname, lastname, email, password);
//             displayMessage(result.message);
//             registerForm.style.display = "none";
//             loginForm.style.display = "block";
//             registerForm.reset();
//         } catch (error) {
//             displayMessage(error.message, true);
//         }
//     });

//     logoutBtn.addEventListener('click', () => {
//         logout();
//         loginForm.style.display = "block";
//         main.style.display = "none";
//         displayMessage('Logged out successfully!');
//     });
// })(); 


// class User {
//     constructor(firstname, lastname, email, password) {
//         this.id = Date.now();
//         this.firstname = firstname;
//         this.lastname = lastname;
//         this.email = email;
//         this.password = password;
//     }
// }

// class AuthService {
//     constructor() {
//         this.users = this.loadUsersFromLocalStorage();
//         if (this.users.length === 0) {
//             // Hardcoded data (simulating a db)
//             this.users = [
//                 new User('John', 'Doe', 'john.doe@mail.com', '12345'),
//                 new User('Jane', 'Doe', 'jane.doe@mail.com', 'p@ssW0rd')
//             ];
//             this.saveUsersToLocalStorage(this.users);
//         }
//     }

//     generateID() {
//         return Date.now();
//     }

//     setLoggedInUser(user) {
//         localStorage.setItem("loggedUser", JSON.stringify(user));
//     }

//     getLoggedInUser() {
//         const user = localStorage.getItem("loggedUser");
//         return user ? JSON.parse(user) : null;
//     }

//     logout() {
//         localStorage.removeItem("loggedUser");
//     }

//     saveUsersToLocalStorage(users) {
//         localStorage.setItem("users", JSON.stringify(users));
//     }

//     loadUsersFromLocalStorage() {
//         const users = localStorage.getItem("users");
//         return users ? JSON.parse(users) : [];
//     }

//     async loginUser(email, password) {
//         return new Promise((resolve, reject) => {
//             setTimeout(() => {
//                 const userFound = this.users.find((user) => user.email === email && user.password === password);

//                 if (!userFound) {
//                     reject({ message: "Invalid email or password" });
//                     return;
//                 }

//                 resolve(userFound);
//             }, 1000);
//         });
//     }

//     async registerUser(firstname, lastname, email, password) {
//         return new Promise((resolve, reject) => {
//             setTimeout(() => {
//                 if (!firstname || !lastname || !email || !password) {
//                     reject({ message: "All fields are required" });
//                     return;
//                 }

//                 const userExists = this.users.some((user) => user.email === email);
//                 if (userExists) {
//                     reject({ message: `User with the email: ${email} already exists.` });
//                     return;
//                 }

//                 const newUser = new User(firstname, lastname, email, password);
//                 this.users.push(newUser);
//                 this.saveUsersToLocalStorage(this.users);

//                 resolve({ message: "Registration successful! Please log in." });
//             }, 1000);
//         });
//     }
// }

// class App {
//     constructor() {
//         this.authService = new AuthService();
//         this.loginForm = document.getElementById("login-form");
//         this.registerForm = document.getElementById("register-form");
//         this.messageDiv = document.getElementById('message');
//         this.logoutBtn = document.getElementById('logout-btn');
//         this.registerLink = document.getElementById("register-link");
//         this.backToLoginBtn = document.getElementById("back-to-login");
//         this.main = document.getElementById('main');

//         this.init();
//     }

//     init() {
//         const loggedInUser = this.authService.getLoggedInUser();
//         if (loggedInUser) {
//             this.loginForm.style.display = "none";
//             this.main.style.display = "flex";
//         }

//         this.setupEventListeners();
//     }

//     displayMessage(message, isError = false) {
//         this.messageDiv.style.display = "block";
//         this.messageDiv.textContent = message;
//         this.messageDiv.classList.add(isError ? "error" : "success");

//         setTimeout(() => {
//             this.messageDiv.textContent = "";
//             this.messageDiv.style.display = "none";
//         }, 2000);
//     }

//     setupEventListeners() {
//         // Handle Login
//         this.loginForm.addEventListener("submit", async (event) => {
//             event.preventDefault();

//             const email = document.getElementById('login-email').value;
//             const password = document.getElementById('login-password').value;

//             try {
//                 const result = await this.authService.loginUser(email, password);
//                 this.loginForm.style.display = 'none';
//                 this.main.style.display = "flex";
//                 this.authService.setLoggedInUser(result);
//                 this.displayMessage(`Welcome back ${result.firstname}!`);
//                 this.loginForm.reset();
//             } catch (error) {
//                 this.displayMessage(error.message, true);
//             }
//         });

//         // Handle Register Link
//         this.registerLink.addEventListener("click", () => {
//             this.loginForm.style.display = "none";
//             this.registerForm.style.display = "block";
//         });

//         // Handle Back to Login
//         this.backToLoginBtn.addEventListener("click", () => {
//             this.registerForm.style.display = "none";
//             this.loginForm.style.display = "block";
//         });

//         // Handle Register Form Submission
//         this.registerForm.addEventListener("submit", async (event) => {
//             event.preventDefault();
//             const firstname = document.getElementById('register-firstname').value;
//             const lastname = document.getElementById('register-lastname').value;
//             const email = document.getElementById('register-email').value;
//             const password = document.getElementById('register-password').value;

//             try {
//                 const result = await this.authService.registerUser(firstname, lastname, email, password);
//                 this.displayMessage(result.message);
//                 this.registerForm.style.display = "none";
//                 this.loginForm.style.display = "block";
//                 this.registerForm.reset();
//             } catch (error) {
//                 this.displayMessage(error.message, true);
//             }
//         });

//         // Handle Logout
//         this.logoutBtn.addEventListener('click', () => {
//             this.authService.logout();
//             this.loginForm.style.display = "block";
//             this.main.style.display = "none";
//             this.displayMessage('Logged out successfully!');
//         });
//     }
// }

// // Initialize the App
// new App();



import { Auth } from '../services/Auth.js';
import { UI } from '../services/UI.js';
import { App } from '../services/App.js';

// IIFE to Initialize the App
(() => {
    const auth = new Auth();
    const ui = new UI();
    new App(auth, ui);
})();