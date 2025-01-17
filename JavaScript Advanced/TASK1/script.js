console.log("Connected")

const clickBtn = document.getElementById("clickBtn");
const divResult = document.getElementById("usersResult");

function users() {
    fetch("https://jsonplaceholder.typicode.com/users")
        .then(function (response) {
            console.log(response);
            const usersJSONresult = response.text()
            console.log(usersJSONresult)
            return usersJSONresult

        })
        .then(function (result) {
            console.log(result)
            const parsedResult = JSON.parse(result);
            console.log(parsedResult)
            parsedResult.forEach((user) => {
                divResult.innerHTML += `<p><b>Name:</b> ${user.name}</p>`;
                divResult.innerHTML += `<p><b>Email:</b> ${user.email}</p>`;
                divResult.innerHTML += `<p><b>Address:</b> ${user.address.street}, ${user.address.suite}, ${user.address.city}, ${user.address.zipcode}</p>`;
                divResult.innerHTML += `<p><b>Phone:</b> ${user.phone}</p>`;
                divResult.innerHTML += `<hr>`;
            });
        })
        .catch(function (error) {
            console.error("Error fetching user data:", error);
            divResult.innerHTML = `<p style="color: red;">An error occurred while fetching the user data. Please try again later.</p>`;
        });
}
clickBtn.addEventListener("click", function () {
    users();
});
