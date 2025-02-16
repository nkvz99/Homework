
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
//     // Handle Register
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

//     // Handle logout
//     logoutBtn.addEventListener('click', () => {
//         logout();
//         loginForm.style.display = "block";
//         main.style.display = "none";
//         displayMessage('Logged out successfully!');
//     });
// })(); 

class Member {
    constructor(firstname, lastname, email, password) {
        this.id = Member.generateID();
        this.firstname = firstname;
        this.lastname = lastname;
        this.email = email;
        this.password = password;
    }

    // Generate ID for the member
    generateID() {
        return Date.now();
    }
}

class MemberService {
    constructor() {
        this.members = this.loadMembers();
    }

    saveMembers() {
        localStorage.setItem("members", JSON.stringify(this.members));
    }

    loadMembers() {
        const members = localStorage.getItem("members");
        return members ? JSON.parse(members) : [];
    }

    addMember(member) {
        this.members.push(member);
        this.saveMembers();
    }

    findMember(email, password) {
        return this.members.find(member => member.email === email && member.password === password);
    }

    memberExists(email) {
        return this.members.some(member => member.email === email);
    }

    initializeMembers() {
        if (this.members.length === 0) {
            this.members = [
                new Member('John', 'Doe', 'john.doe@mail.com', '12345'),
                new Member('Jane', 'Doe', 'jane.doe@mail.com', 'p@ssW0rd')
            ];
            this.saveMembers();
        }
    }
}

class AuthenticationService {
    constructor(memberService) {
        this.memberService = memberService;
    }

    setLoggedInMember(member) {
        localStorage.setItem("loggedMember", JSON.stringify(member));
    }

    getLoggedInMember() {
        return JSON.parse(localStorage.getItem("loggedMember"));
    }

    logout() {
        localStorage.removeItem("loggedMember");
    }

    async login(email, password) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const member = this.memberService.findMember(email, password);
                member ? resolve(member) : reject({ message: "Invalid email or password" });
            }, 1000);
        });
    }

    async register(firstname, lastname, email, password) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (!firstname || !lastname || !email || !password) {
                    reject({ message: "All fields are required" });
                    return;
                }

                if (this.memberService.memberExists(email)) {
                    reject({ message: `Member with the email: ${email} already exists.` });
                    return;
                }

                const newMember = new Member(firstname, lastname, email, password);
                this.memberService.addMember(newMember);
                resolve({ message: "Registration successful! Please log in." });
            }, 1000);
        });
    }
}

class UserInterfaceController {
    constructor(authenticationService, memberService) {
        this.authenticationService = authenticationService;
        this.memberService = memberService;

        this.loginForm = document.getElementById("login-form");
        this.registerForm = document.getElementById("register-form");
        this.messageDiv = document.getElementById('message');
        this.logoutBtn = document.getElementById('logout-btn');
        this.registerLink = document.getElementById("register-link");
        this.backToLoginBtn = document.getElementById("back-to-login");
        this.main = document.getElementById('main');

        this.init();
    }

    displayMessage(message, isError = false) {
        this.messageDiv.style.display = "block";
        this.messageDiv.textContent = message;
        this.messageDiv.className = isError ? "error" : "success";

        setTimeout(() => {
            this.messageDiv.textContent = "";
            this.messageDiv.style.display = "none";
        }, 2000);
    }

    setupEventListeners() {
        this.loginForm.addEventListener("submit", async (event) => {
            event.preventDefault();
            const email = document.getElementById('login-email').value;
            const password = document.getElementById('login-password').value;

            try {
                const member = await this.authenticationService.login(email, password);
                this.authenticationService.setLoggedInMember(member);
                this.loginForm.style.display = 'none';
                this.main.style.display = "flex";
                this.displayMessage(`Welcome back ${member.firstname}!`);
                this.loginForm.reset();
            } catch (error) {
                this.displayMessage(error.message, true);
            }
        });

        this.registerLink.addEventListener("click", () => {
            this.loginForm.style.display = "none";
            this.registerForm.style.display = "block";
        });

        this.backToLoginBtn.addEventListener("click", () => {
            this.registerForm.style.display = "none";
            this.loginForm.style.display = "block";
        });

        this.registerForm.addEventListener("submit", async (event) => {
            event.preventDefault();
            const firstname = document.getElementById('register-firstname').value;
            const lastname = document.getElementById('register-lastname').value;
            const email = document.getElementById('register-email').value;
            const password = document.getElementById('register-password').value;

            try {
                const result = await this.authenticationService.register(firstname, lastname, email, password);
                this.displayMessage(result.message);
                this.registerForm.style.display = "none";
                this.loginForm.style.display = "block";
                this.registerForm.reset();
            } catch (error) {
                this.displayMessage(error.message, true);
            }
        });

        this.logoutBtn.addEventListener('click', () => {
            this.authenticationService.logout();
            this.loginForm.style.display = "block";
            this.main.style.display = "none";
            this.displayMessage('Logged out successfully!');
        });
    }

    init() {
        this.memberService.initializeMembers();
        const loggedInMember = this.authenticationService.getLoggedInMember();
        if (loggedInMember) {
            this.loginForm.style.display = "none";
            this.main.style.display = "flex";
        }

        this.setupEventListeners();
    }
}

// Initialize the UI
const memberService = new MemberService();
const authenticationService = new AuthenticationService(memberService);
new UserInterfaceController(authenticationService, memberService);
