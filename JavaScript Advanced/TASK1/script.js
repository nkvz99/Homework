console.log("Connected")
const clickBtn = document.getElementById("clickBtn");
const divResult = document.getElementById("usersResult");
function users() {
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
                divResult.innerHTML += `<p><b>Name:</b> ${user.name}</p>`;
                divResult.innerHTML += `<p><b>Email:</b ${user.email}</p>`;
                divResult.innerHTML += `<p><b>Address:</b> ${user.address.street}, ${user.address.suite}, ${user.address.city}, ${user.address.zipcode}</p>`;
                divResult.innerHTML += `<p><b>Phone:</b> ${user.phone}</p>`;
                divResult.innerHTML += `<hr>`;
            });
}
);
}
clickBtn.addEventListener("click", function () {
    users();
});