console.log("connected")

const fetchStudentData = (callback) => {
    fetch("https://raw.githubusercontent.com/sedc-codecademy/skwd9-04-ajs/main/Samples/students_v2.json")
        .then(response => {
            console.log("Fetch response:", response); 
            return response.text();
        })
        .then(text => {
            let parsedData = JSON.parse(text);
            console.log("Parsed data:", parsedData); 
            if (typeof callback === "function") {
                callback(parsedData);
            }
        })
        .catch(error => console.error("Error fetching data:", error));
};
fetchStudentData()


// Function to display all students with average grade higher than 3
const displayAllStudentsWithAverageHigherThan3 = (students) => {
    const filteredStudents = students.filter(student => student.averageGrade > 3);
    const resultsDiv = document.getElementById("results");
    resultsDiv.innerHTML = "";
    filteredStudents.forEach(student => {
        resultsDiv.innerHTML += `
        Full name: ${student.firstName} ${student.lastName}
         <br> 
         Grade: ${student.averageGrade} 
         <hr>`;
    });
    console.log(filteredStudents);
};

// Function to display all female students with an average grade of 5
const displayFemaleStudentsWithAverageGrade5 = (students) => {
    const filteredStudents = students.filter(student => student.gender === 'Female' && student.averageGrade === 5);
    const resultsDiv = document.getElementById("results");
    resultsDiv.innerHTML = "";
    filteredStudents.forEach(student => {
        resultsDiv.innerHTML += `
        Full Name: ${student.firstName} ${student.lastName}
        <br>
        Grade: ${student.averageGrade}
        <br>
        Gender: ${student.gender}
        <hr>`;
    });
    console.log(filteredStudents);
};

// Function to display all male students living in Skopje and over 18 years old
const displayMaleStudentsInSkopjeOver18 = (students) => {
    const filteredStudents = students.filter(student => student.gender === "Male" && student.city === "Skopje" && student.age > 18);
    const resultsDiv = document.getElementById("results");
    resultsDiv.innerHTML = "";
    filteredStudents.forEach(student => {
        resultsDiv.innerHTML += `
        Full Name: ${student.firstName} ${student.lastName}
        <br>
        Age: ${student.age}
        <br>
        Gender: ${student.gender}
        <br>
        City: ${student.city}
        <hr>`;
    });
    console.log(filteredStudents);
};

// Function to display the average grades of all female students over the age of 24
const displayAverageGradesOfFemaleStudentsOver24 = (students) => {
    const filteredStudents = students.filter(student => student.gender === "Female" && student.age > 24);
    const resultsDiv = document.getElementById("results");
    resultsDiv.innerHTML = "";
    filteredStudents.forEach(student => {
        resultsDiv.innerHTML += `
        Full Name: ${student.firstName} ${student.lastName}
        <br>
        Age: ${student.age}
        <br>
        Gender: ${student.gender}
        <br>
        Grade: ${student.averageGrade}
        <hr>`;
    });
    console.log(filteredStudents);
};

// Function to display male students whose name starts with "B" and average grade over 2
const displayMaleStudentsWithBandAverageOver2 = (students) => {
    const filteredStudents = students.filter(student => student.gender === "Male" && student.firstName.startsWith('B') && student.averageGrade > 2);
    const resultsDiv = document.getElementById("results");
    resultsDiv.innerHTML = "";
    filteredStudents.forEach(student => {
        resultsDiv.innerHTML += `
        Full Name: ${student.firstName} ${student.lastName}
        <br>
        Gender: ${student.gender}
        <br>
        Grade: ${student.averageGrade}
        <hr>`;
    });
    console.log(filteredStudents);
};

// Function to add event listeners to buttons 
function addEventListenerToButton(buttonId, displayFunction) {
    document.getElementById(buttonId).addEventListener("click", () => {
        fetchStudentData(displayFunction);
    });
}

addEventListenerToButton("allAbove3Button", displayAllStudentsWithAverageHigherThan3);
addEventListenerToButton("femaleGrade5Button", displayFemaleStudentsWithAverageGrade5);
addEventListenerToButton("maleSkopjeOver18Button", displayMaleStudentsInSkopjeOver18);
addEventListenerToButton("femaleOver24GradesButton", displayAverageGradesOfFemaleStudentsOver24);
addEventListenerToButton("maleBOver2Button", displayMaleStudentsWithBandAverageOver2);
