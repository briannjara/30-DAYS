const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");

function addTask() {
    if (inputBox.value === '') {
        alert("You must write something");
    } else {
        let li = document.createElement("li");
        // Correction: Changed 'innerHtml' to 'innerHTML' to properly set the content.
        li.innerHTML = inputBox.value;
        listContainer.appendChild(li);
        let span = document.createElement("span");
        // Correction: Changed 'innerHtml' to 'innerHTML' and fixed the Unicode character.
        // The Unicode character should be added as an HTML entity or as a string literal.
        span.innerHTML = "\u00d7"; // Using Unicode escape sequence for the character.
        span.className = "close"; // Added a class name to the span for styling and identification.
        li.appendChild(span);
    }
    inputBox.value = "";
    saveData();
}

listContainer.addEventListener("click", function(e) {
    if (e.target.tagName === "LI") {
        e.target.classList.toggle("checked");
        saveData();
    } else if (e.target.tagName === "SPAN" && e.target.className === "close") {
        // Added a check for the class name to ensure only the close button removes the task.
        e.target.parentElement.remove();
        saveData();
    }
}, false);

function saveData() {
    localStorage.setItem("data", listContainer.innerHTML);
}

function showTask() {
    const data = localStorage.getItem("data");
    if (data) {
        // Added a null check to prevent null values from being set as innerHTML.
        listContainer.innerHTML = data;
    }
    // Added event listener restoration for the loaded tasks.
    // This is necessary because innerHTML does not preserve listeners.
    restoreEventListeners();
}

function restoreEventListeners() {
    // Retrieve all the close buttons and add click event listeners to them.
    const closeButtons = listContainer.getElementsByClassName("close");
    for (let i = 0; i < closeButtons.length; i++) {
        closeButtons[i].addEventListener("click", function() {
            this.parentElement.remove();
            saveData();
        });
    }
}

showTask();
