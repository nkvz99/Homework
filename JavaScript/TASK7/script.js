console.log("Connected");
document.body.innerHTML = `
<input type="number" id="rows" placeholder="Enter rows" min="1">
<input type="number" id="cols" placeholder="Enter columns" min="1">
<button id="generateTable">Generate your Table</button>
<div id="tblContainer"</div>'`;

document.getElementById("generateTable").addEventListener("click", function () {
    const rows = parseInt(document.getElementById("rows").value);
    const cols = parseInt(document.getElementById("cols").value);


    if (rows <= 0 || cols <= 0) {
        alert("Please enter valid numbers for rows and columns.");
        return;
    }

    let tableRow_and_cols = "<table style = 'border-collapse:collapse; width:500px'>"
    tableRow_and_cols += "<thead><tr>";

    for (let i = 1; i <= cols; i++) {
        tableRow_and_cols += `<th style= 'border:1px solid black; padding: 20px'>Header ${i}</th>`;

    }
    tableRow_and_cols += "</tr></thead>";

    tableRow_and_cols += "<tbody>";
    for (let i = 1; i <= rows; i++) {
        tableRow_and_cols += "<tr>"
        for (let j = 1; j <= cols; j++) {
            tableRow_and_cols += `<td style = "border: 1px solid  black; padding: 20px; text-align: center">Row ${i}, Col ${j}</td>`
        }
        tableRow_and_cols += "</tr>";

    }
    tableRow_and_cols += "</tbody></table>";
    document.getElementById("tblContainer").innerHTML = tableRow_and_cols;
})


