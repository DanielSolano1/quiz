document.addEventListener("DOMContentLoaded", function () {
    document.querySelector(".submit-btn").addEventListener("click", gradeQuiz);
    displayQ2Choices();
    displayQ6Choices();
    updateQuizAttempts();
});

function displayQ2Choices() {
    let q2Choices = ["Nakatomi Plaza", "Shanghai Tower", "Willis Tower", "Empire State Building"];
    q2Choices = _.shuffle(q2Choices);
    for (let choice of q2Choices) {
        let inputEl = document.createElement("input");
        inputEl.type = "radio";
        inputEl.name = "q2";
        inputEl.value = choice;

        let labelEl = document.createElement("label");
        labelEl.innerText = choice;
        labelEl.prepend(inputEl);

        document.querySelector("#q2Choices").append(labelEl);
    }
}

function displayQ6Choices() {
    let checkboxChoices = ["Golden Gould", "L.F Rothschild", "Pearson Specter", "Stratton Oakmont"];
    checkboxChoices = _.shuffle(checkboxChoices);
    for (let choice of checkboxChoices) {
        let inputEl = document.createElement("input");
        inputEl.type = "checkbox";
        inputEl.name = "q6";
        inputEl.value = choice;

        let labelEl = document.createElement("label");
        labelEl.innerText = choice;
        labelEl.prepend(inputEl);

        document.querySelector("#chckbox").append(labelEl);
    }
}

function gradeQuiz() {
    let count = 0;
    let correctImg = "images/correct.png";
    let wrongImg = "images/wrong.png";

    function updateFeedback(feedbackElement, isCorrect) {
        feedbackElement.innerHTML = "";
        let img = document.createElement("img");
        if (isCorrect) {
            img.src = correctImg;
            img.alt = "Correct";
            let text = document.createTextNode("Correct");
            feedbackElement.appendChild(img);
            feedbackElement.appendChild(text);
        } else {
            img.src = wrongImg;
            img.alt = "Incorrect";
            let text = document.createTextNode("Incorrect");
            feedbackElement.appendChild(img);
            feedbackElement.appendChild(text);
        }
    }

    // let answer1 = document.querySelector("input[name=q1]:checked");
    // if (answer1) {
    //     updateFeedback(document.querySelector("#feedback1"), answer1.value === "Red");
    //     if (answer1.value === "Red") count += 20;
    // }

    let answer2 = document.querySelector("input[name=q2]:checked");
    if (answer2) {
        updateFeedback(document.querySelector("#feedback2"), answer2.value === "Nakatomi Plaza");
        if (answer2.value === "Nakatomi Plaza") count += 20;
    }

    let answer3 = document.querySelector("#q3");
    if (answer3) {
        let value = answer3.value.trim().toLowerCase();
        updateFeedback(document.querySelector("#feedback3"), value === "there is no tomorrow");
        if (value === "there is no tomorrow") count += 20;
    }

    let answer4 = document.querySelector("#selectInput");
    if (answer4) {
        updateFeedback(document.querySelector("#feedback4"), answer4.value === "Wakanda");
        if (answer4.value === "Wakanda") count += 20;
    }

    let answer5 = document.querySelector("#q5");
    if (answer5) {
        updateFeedback(document.querySelector("#feedback5"), answer5.value === "3");
        if (answer5.value === "3") count += 20;
    }

    let answer6 = document.querySelectorAll("input[name=q6]:checked");
    let selectedAnswers = [];
    answer6.forEach(el => selectedAnswers.push(el.value));
    let isCorrect6 = selectedAnswers.includes("Stratton Oakmont") && selectedAnswers.includes("L.F Rothschild") && selectedAnswers.length === 2;
    updateFeedback(document.querySelector("#feedback6"), isCorrect6);
    if (isCorrect6) count += 20;

    let finalScore = document.querySelector("#finalScore");
    finalScore.textContent = "Your score is: " + count + "/100";
    if (count >= 80) {
        finalScore.textContent += ". You are a true movie buff!";
    }
    
    incrementQuizAttempts();
}

function incrementQuizAttempts() {
    let attempts = localStorage.getItem("quizAttempts");
    if (!attempts) {
        attempts = 0;
    }
    attempts = parseInt(attempts) + 1;
    localStorage.setItem("quizAttempts", attempts);
    updateQuizAttempts();
}

function updateQuizAttempts() {
    let attempts = localStorage.getItem("quizAttempts");
    if (!attempts) {
        attempts = 0;
    }
    document.querySelector("#quizAttempts").textContent = "Total times quiz taken: " + attempts;
}
