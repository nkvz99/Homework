import { User } from "../services/User.js"
import { Storage } from '../services/Storage.js'

class Auth {
    constructor() {
        this.users = this.loadUsers();
        if (this.users.length === 0) {
            // Hardcoded data (simulating a db)
            this.users = [
                new User('John', 'Doe', 'john.doe@mail.com', '12345'),
                new User('Jane', 'Doe', 'jane.doe@mail.com', 'p@ssW0rd')
            ];
            this.saveUsers(this.users);
        }
    }

    loadUsers() {
        return Storage.get("users") || [];
    }

    saveUsers(users) {
        Storage.set("users", users);
    }

    setUser(user) {
        Storage.set("user", user);
    }

    getUser() {
        return Storage.get("user");
    }

    logout() {
        Storage.remove("user");
    }

    async login(email, password) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const userFound = this.users.find((user) => user.email === email && user.password === password);

                if (!userFound) {
                    reject({ message: "Invalid email or password" });
                    return;
                }

                resolve(userFound);
            }, 1000);
        });
    }

    async register(firstname, lastname, email, password) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (!firstname || !lastname || !email || !password) {
                    reject({ message: "All fields are required", isError: true }); // Add isError flag
                    return;
                }
    
                const userExists = this.users.some((user) => user.email === email);
                if (userExists) {
                    reject({ message: `User with the email: ${email} already exists.`, isError: true });
                    return;
                }
    
                const newUser = new User(firstname, lastname, email, password);
                this.users.push(newUser);
                this.saveUsers(this.users);
    
                resolve({ message: "Registration successful! Please log in.", isError: false });
            }, 1000);
        });
    }
}

export{Auth}