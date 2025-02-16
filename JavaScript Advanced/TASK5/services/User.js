class User {
    constructor(firstname, lastname, email, password) {
        this.id = Date.now();
        this.firstname = firstname;
        this.lastname = lastname;
        this.email = email;
        this.password = password;
    }
}

export{User}