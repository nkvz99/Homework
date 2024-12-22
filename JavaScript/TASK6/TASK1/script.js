console.log("Connected");

let myTitle = document.getElementById("myTitle");
myTitle.innerText = "Yes now its way very cool page from JS!";

let firstParagraph = document.querySelector("#first p");
firstParagraph.innerText = "This is the first paragraph i changed from JS!";
let secondParagraph = document.querySelector(".second");
secondParagraph.innerText = "This is the second paragraph i changed from JS!";
let textTag = document.querySelector("text");
textTag.innerText = "I changed this one text tag from JS!";
let div3h3 = document.querySelector("div h3");
div3h3.innerText = "This one i changed too from JS!";
let div3h1 = div3h3.previousElementSibling;
div3h1.innerHTML = "This one i changed with previous element sibling";