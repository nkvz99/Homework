console.log("Connected")
function users() {
    const clickBtn = document.getElementById("users_clickBtn");
    const divResult = document.getElementById("usersResult");

    fetch("https://jsonplaceholder.typicode.com/users")
        .then(function (response) {
            console.log(response);
            let usersJSONresult = response.text()
            console.log(usersJSONresult)
            return usersJSONresult
            // return response.text();
        })
        .then(function (result) {
            console.log(result);
            let parsedResult = JSON.parse(result);
            console.log(parsedResult)
            parsedResult.forEach(user => {
                divResult.innerHTML += `<p><strong>Name:</strong> ${user.name}</p>`;
                divResult.innerHTML += `<p><strong>Email:</strong> ${user.email}</p>`;
                divResult.innerHTML += `<p><strong>Address:</strong> ${user.address.street}, ${user.address.suite}, ${user.address.city}, ${user.address.zipcode}</p>`;
                divResult.innerHTML += `<p><strong>Phone:</strong> ${user.phone}</p>`;
                divResult.innerHTML += `<hr>`;
            });
}
);
}

clickBtn.addEventListener("click", function () {
    users();
});