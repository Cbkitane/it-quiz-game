// Selecting DOM elements
const startBtn = document.getElementById("start-btn");
const playAgainBtn = document.getElementById("play-again-btn");
const startMenuContainer = document.getElementById("start-menu-container");
const mainContainer = document.getElementById("main-container");

// Selecting score and question elements
let scoreEl = document.getElementById("score");
let questionEl = document.getElementById("question-el");
let choicesContainer = document.querySelector(".choices-container");
let loadingBar = document.querySelector(".loading-bar");

// Initializing variables
let currentQuestionIndex = 0;
let score = 0;
let shuffledQuestions = []; // Array to store shuffled question indices
let hasChosen = false; // Flag to prevent multiple clicks during question transition

// Function to start the game
const startGame = () => {
    // Hide start menu and show main container
    startMenuContainer.classList.add("hidden");
    mainContainer.classList.remove("hidden");

    // Shuffle the questions
    while (shuffledQuestions.length < questions.length) {
        let random = Math.floor(Math.random() * questions.length);
        if (!shuffledQuestions.includes(random)) {
            shuffledQuestions.push(random);
        }
    }

    // Log shuffled questions for debugging
    console.log(shuffledQuestions);

    // Start with the first question
    newQuestion();
};

// Function to restart the game
const restartGame = () => {
    // Reset score and update UI
    score = 0;
    scoreEl.textContent = score;
    currentQuestionIndex = 0;

    // Enable all choice buttons
    document.querySelectorAll(".choices-container button").forEach((btn) => {
        btn.disabled = false;
        btn.style.cursor = "pointer";
    });

    // Hide game over overlay
    document.querySelector(".game-over-overlay").classList.add("hidden");

    // Start with the first question
    newQuestion();
};

// Function to display a new question
const newQuestion = () => {
    // Display the question text
    questionEl.textContent =
        questions[shuffledQuestions[currentQuestionIndex]].question;

    // Clear previous choices
    choicesContainer.innerHTML = "";

    // Populate choices
    for (let i = 0; i < 4; i++) {
        choicesContainer.innerHTML += `<button class="choice ${
            questions[shuffledQuestions[currentQuestionIndex]]["choices"][i]
                .correct
                ? "correct"
                : "wrong"
        }">${
            questions[shuffledQuestions[currentQuestionIndex]]["choices"][i]
                .text
        }</button>`;
    }

    // Add event listeners to choice buttons
    document.querySelectorAll(".choices-container button").forEach((button) => {
        button.addEventListener("click", () => {
            // Prevent multiple clicks during transition
            if (!hasChosen) {
                hasChosen = true;

                // Check if the chosen answer is correct
                if (button.classList.contains("correct")) {
                    setTimeout(() => {
                        // Add transition class for correct answer
                        button.classList.add("correct-transition");
                        // Increment score
                        score++;
                        // Update score display
                        scoreEl.textContent = score;
                    }, 1000);
                } else {
                    setTimeout(() => {
                        // Add transition class for wrong answer
                        button.classList.add("wrong-transition");
                        // Highlight correct answer
                        const correctButton = document.querySelector(
                            ".choices-container button.correct"
                        );
                        correctButton.classList.add("correct-transition");
                    }, 1000);
                }

                // Disable all buttons after one is clicked
                document
                    .querySelectorAll(".choices-container button")
                    .forEach((btn) => {
                        btn.disabled = true;
                        btn.style.cursor = "not-allowed";
                    });

                // Transition to next question
                setTimeout(() => {
                    // Show loading bar
                    loadingBar.style.width = "100%";
                    loadingBar.style.transition = "2s linear";
                    setTimeout(() => {
                        // Remove loading bar and transition
                        loadingBar.style.transition = "none";
                        // Move to the next question
                        currentQuestionIndex++;
                        // Reset hasChosen for the next question
                        hasChosen = false;
                        // Reset loading bar width
                        loadingBar.style.width = "0";
                        // Check if there are more questions
                        if (currentQuestionIndex < questions.length) {
                            newQuestion();
                        } else {
                            // End of quiz
                            console.log("End of quiz");
                            // Display game over overlay
                            document
                                .querySelector(".game-over-overlay")
                                .classList.remove("hidden");
                            // Display final score
                            document.querySelector(
                                ".game-over-content p"
                            ).textContent = ` Game Over. Your answered ${score} out of ${questions.length} questions.`;
                        }
                    }, 2000); // Proceed to the next question after 2 seconds
                }, 2000); // Show loading bar after 2 seconds
            }
        });
    });
};

// Event listener for play again button
playAgainBtn.addEventListener("click", restartGame);

// Event listener for start button
startBtn.addEventListener("click", startGame);

// Game questions
let questions = [
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
