"strict mode";

const optionsEl = document.querySelector(".options");
const questionElement = document.querySelector(".question");
const nextBtn = document.querySelector(".btn-next");
const startAgainBtn = document.querySelector(".btn-start-again");
const contentDiv = document.querySelector(".content");

const quizData = [
  {
    question: "Which is largest animal in the world?",
    options: ["Shark", "Blue Whale", "Elephant", "Giraffe"],
    correctAnswer: "Blue Whale",
  },
  {
    question: "Which is the smallest country in the world?",
    options: ["Vatican City", "Bhutan", "Nepal", "Sri Lanka"],
    correctAnswer: "Vatican City",
  },
  {
    question: "Which is the largest desert in the world?",
    options: ["Kalahari", "Gobi", "Sahara", "Antartica"],
    correctAnswer: "Antartica",
  },
  {
    question: "Which is tge smallest continents of the world?",
    options: ["Asia", "Australia", "Artic", "Africa"],
    correctAnswer: "Australia",
  },
];

let currentQuestion = 0;
let score = 0;

function loadQuestion() {
  const currentQuizData = quizData[currentQuestion];

  // Render Question:
  const questionMarkup = `<h2>${currentQuestion + 1}. ${
    currentQuizData.question
  }</h2>`;
  questionElement.insertAdjacentHTML("afterbegin", questionMarkup);

  // Render Options:
  const optionMarkup = currentQuizData.options
    .map((option) => {
      return `
      <li class="option">
      <p>${option}</p>
      </li>`;
    })
    .join(" ");

  optionsEl.insertAdjacentHTML("afterbegin", optionMarkup);
}

function checkAnswer(selectedElement) {
  const currentQuizData = quizData[currentQuestion];
  const selectedOption = selectedElement.innerText;

  //Render Next Button:
  nextBtn.classList.remove("hidden");

  //Disabling the Clicks:
  optionsEl.style.pointerEvents = "none";

  // //Checking Answer:
  if (selectedOption === currentQuizData.correctAnswer) {
    score++;
    selectedElement.classList.add("correct--answer");
  } else {
    selectedElement.classList.add("wrong--answer");
    const [li] = Array.from(document.querySelectorAll(".option")).filter(
      (option) => option.innerText === currentQuizData.correctAnswer
    );
    li.classList.add("correct--answer");
  }
  currentQuestion++;
}

function nextQuestion() {
  optionsEl.innerHTML = "";
  questionElement.innerHTML = "";
  optionsEl.style.pointerEvents = "auto";
  if (currentQuestion < quizData.length) {
    loadQuestion();
  } else {
    endQuiz();
  }
}

function endQuiz() {
  nextBtn.classList.add("hidden");
  startAgainBtn.classList.remove("hidden");
  const markup = `
  <p class="score">Thank you for taking the quiz! Here's how you scored. You answered <span>${score}</span> out of <span>${quizData.length}</span> correctly!</p>
`;
  questionElement.insertAdjacentHTML("afterbegin", markup);
  optionsEl.innerHTML = "";
}

function startOver() {
  currentQuestion = 0;
  questionElement.innerHTML = "";
  loadQuestion();
  startAgainBtn.classList.add("hidden");
}

window.addEventListener("load", loadQuestion);
nextBtn.addEventListener("click", nextQuestion);
optionsEl.addEventListener("click", function (e) {
  const closestli = e.target.closest(".option");
  if (!closestli) return;
  checkAnswer(closestli);
});
startAgainBtn.addEventListener("click", startOver);
