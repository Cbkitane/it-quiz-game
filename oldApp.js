const startBtn = document.getElementById("start-btn");
const playAgainBtn = document.getElementById("play-again-btn");
const startMenuContainer = document.getElementById("start-menu-container");
const mainContainer = document.getElementById("main-container");

const scoreEl = document.getElementById("score");
const questionEl = document.getElementById("question-el");
const choicesContainer = document.querySelector(".choices-container");
const loadingBar = document.querySelector(".loading-bar");

let currentQuestionIndex = 0;
let score = 0;
let shuffledQuestions = [];
let hasChosen = false;

const startGame = () => {
    hideStartMenu();
    shuffleQuestions();
    newQuestion();
};

const hideStartMenu = () => {
    startMenuContainer.classList.add("hidden");
    mainContainer.classList.remove("hidden");
};

const shuffleQuestions = () => {
    while (shuffledQuestions.length < questions.length) {
        let random = Math.floor(Math.random() * questions.length);
        if (!shuffledQuestions.includes(random)) {
            shuffledQuestions.push(random);
        }
    }
};

const restartGame = () => {
    resetScore();
    resetQuestionIndex();
    enableChoiceButtons();
    hideGameOverOverlay();
    newQuestion();
};

const resetScore = () => {
    score = 0;
    scoreEl.textContent = score;
};

const resetQuestionIndex = () => {
    currentQuestionIndex = 0;
};

const enableChoiceButtons = () => {
    document.querySelectorAll(".choices-container button").forEach((btn) => {
        btn.disabled = false;
        btn.style.cursor = "pointer";
    });
};

const hideGameOverOverlay = () => {
    document.querySelector(".game-over-overlay").classList.add("hidden");
};

const newQuestion = () => {
    displayQuestion();
    displayChoices();
    addChoiceEventListeners();
};

const displayQuestion = () => {
    questionEl.textContent =
        questions[shuffledQuestions[currentQuestionIndex]].question;
};

const displayChoices = () => {
    choicesContainer.innerHTML = "";
    for (let i = 0; i < 4; i++) {
        const choice =
            questions[shuffledQuestions[currentQuestionIndex]].choices[i];
        choicesContainer.innerHTML += `<button class="choice ${
            choice.correct ? "correct" : "wrong"
        }">${choice.text}</button>`;
    }
};

const addChoiceEventListeners = () => {
    document.querySelectorAll(".choices-container button").forEach((button) => {
        button.addEventListener("click", () => {
            handleChoice(button);
        });
    });
};

const handleChoice = (button) => {
    if (!hasChosen) {
        hasChosen = true;
        if (button.classList.contains("correct")) {
            handleCorrectChoice(button);
        } else {
            handleWrongChoice(button);
        }
        disableChoiceButtons();
        setTimeout(() => {
            handleNextQuestion();
        }, 1000);
    }
};

const handleCorrectChoice = (button) => {
    button.classList.add("correct-transition");
    score++;
    scoreEl.textContent = score;
};

const handleWrongChoice = (button) => {
    button.classList.add("wrong-transition");
    const correctButton = document.querySelector(
        ".choices-container button.correct"
    );
    correctButton.classList.add("correct-transition");
};

const disableChoiceButtons = () => {
    document.querySelectorAll(".choices-container button").forEach((btn) => {
        btn.disabled = true;
        btn.style.cursor = "not-allowed";
    });
};

const handleNextQuestion = () => {
    loadingBar.style.width = "100%";
    loadingBar.style.transition = "2s linear";
    setTimeout(() => {
        currentQuestionIndex++;
        hasChosen = false;
        loadingBar.style.transition = "none";
        loadingBar.style.width = "0";
        if (currentQuestionIndex < questions.length) {
            newQuestion();
        } else {
            endQuiz();
        }
    }, 2000);
};

const endQuiz = () => {
    console.log("End of quiz");
    document.querySelector(".game-over-overlay").classList.remove("hidden");
    document.querySelector(
        ".game-over-content p"
    ).textContent = `Game Over. You answered ${score} out of ${questions.length} questions.`;
};

playAgainBtn.addEventListener("click", restartGame);
startBtn.addEventListener("click", startGame);

const questions = [
    {
        question: "What is the purpose of HTML?",
        choices: [
            { text: "To define the structure of web pages", correct: true },
            { text: "To style web pages", correct: false },
            { text: "To add interactivity to web pages", correct: false },
            { text: "To store data on the client side", correct: false },
        ],
    },
    {
        question: "What does CSS stand for?",
        choices: [
            { text: "Cascading Style Sheets", correct: true },
            { text: "Computer Style Sheets", correct: false },
            { text: "Creative Style Sheets", correct: false },
            { text: "Colorful Style Sheets", correct: false },
        ],
    },
    {
        question:
            "Which programming language is often used for building web servers?",
        choices: [
            { text: "Python", correct: false },
            { text: "JavaScript", correct: false },
            { text: "Java", correct: false },
            { text: "Node.js", correct: true },
        ],
    },
    {
        question: "What does API stand for?",
        choices: [
            { text: "Application Programming Interface", correct: true },
            { text: "Automated Program Interaction", correct: false },
            { text: "Advanced Programming Instruction", correct: false },
            { text: "Automated Protocol Interface", correct: false },
        ],
    },
    {
        question: "What is the purpose of the 'for' loop in programming?",
        choices: [
            { text: "To define a function", correct: false },
            { text: "To iterate over a sequence of elements", correct: true },
            { text: "To perform conditional branching", correct: false },
            { text: "To declare a variable", correct: false },
        ],
    },
    {
        question: "Which of the following is a valid JavaScript variable name?",
        choices: [
            { text: "2var", correct: false },
            { text: "_variable", correct: true },
            { text: "my-variable", correct: false },
            { text: "variable!", correct: false },
        ],
    },
    {
        question: "What does JSON stand for?",
        choices: [
            { text: "JavaScript Object Notation", correct: true },
            { text: "JavaScript Operation Network", correct: false },
            { text: "JavaScript Oriented Notation", correct: false },
            { text: "JavaScript Object Network", correct: false },
        ],
    },
    {
        question: "What does IDE stand for?",
        choices: [
            { text: "Integrated Development Environment", correct: true },
            { text: "Interpreted Development Environment", correct: false },
            { text: "Interactive Development Environment", correct: false },
            { text: "Interface Design Environment", correct: false },
        ],
    },
    {
        question: "What is the purpose of a 'break' statement in a loop?",
        choices: [
            { text: "To exit the loop completely", correct: true },
            {
                text: "To skip the current iteration of the loop and continue with the next one",
                correct: false,
            },
            { text: "To restart the loop from the beginning", correct: false },
            { text: "To end the program execution", correct: false },
        ],
    },
    {
        question: "What is the primary purpose of Git?",
        choices: [
            { text: "To manage databases", correct: false },
            { text: "To create web pages", correct: false },
            { text: "To track changes in source code", correct: true },
            { text: "To send emails", correct: false },
        ],
    },
];
