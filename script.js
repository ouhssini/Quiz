const questions = {
    q1: {
        question: "What is the chemical symbol for water?",
        options: ["H2O", "CO2", "NaCl", "O2"],
        answer: "H2O",
    },
    q2: {
        question: "Which gas is most abundant in Earth's atmosphere?",
        options: ["Oxygen", "Nitrogen", "Carbon Dioxide", "Argon"],
        answer: "Nitrogen",
    },
    q3: {
        question: "Who developed the theory of relativity?",
        options: ["Isaac Newton", "Albert Einstein", "Galileo Galilei", "Nikola Tesla"],
        answer: "Albert Einstein",
    },
    q4: {
        question: "What is the closest planet to the Sun?",
        options: ["Venus", "Mercury", "Mars", "Jupiter"],
        answer: "Mercury",
    },
    q5: {
        question: "What causes tides on Earth?",
        options: ["Gravitational pull of the Moon and the Sun", "Magnetic field of the Earth", "Earth's rotation", "Ocean currents"],
        answer: "Gravitational pull of the Moon and the Sun",
    },
    q6: {
        question: "What is the process by which plants make their food?",
        options: ["Photosynthesis", "Respiration", "Transpiration", "Pollination"],
        answer: "Photosynthesis",
    },
    q7: {
        question: "What is the chemical symbol for gold?",
        options: ["Au", "Ag", "Fe", "Cu"],
        answer: "Au",
    },
    q8: {
        question: "Which organ in the human body produces insulin?",
        options: ["Pancreas", "Liver", "Kidney", "Heart"],
        answer: "Pancreas",
    },
    q9: {
        question: "Which planet is known as the 'Red Planet'?",
        options: ["Mars", "Venus", "Mercury", "Jupiter"],
        answer: "Mars",
    },
    q10: {
        question: "What is the chemical symbol for table salt?",
        options: ["NaCl", "HCl", "KCl", "MgCl2"],
        answer: "NaCl",
    },
    q11: {
        question: "Which scientist is known as the 'Father of Modern Physics'?",
        options: ["Isaac Newton", "Albert Einstein", "Niels Bohr", "Galileo Galilei"],
        answer: "Albert Einstein",
    },
    q12: {
        question: "What is the largest organ in the human body?",
        options: ["Skin", "Liver", "Brain", "Heart"],
        answer: "Skin",
    },
    q13: {
        question: "What causes the Earth's seasons?",
        options: ["Tilt of the Earth's axis", "Distance from the Sun", "Rotation speed", "Atmospheric pressure"],
        answer: "Tilt of the Earth's axis",
    },
    q14: {
        question: "What is the unit of measurement for electric current?",
        options: ["Ampere", "Volt", "Ohm", "Watt"],
        answer: "Ampere",
    },
    q15: {
        question: "What is the chemical formula for methane?",
        options: ["CH4", "CO2", "NH3", "H2O"],
        answer: "CH4",
    },
};

/* Declaration des Variables */
const container = document.querySelector(".container");
const btnPrev = document.getElementById("btn_prev");
const btnNext = document.getElementById("btn_next");
let qstIndex = 0;
const questionsArray = Object.values(questions);
let qstof = document.getElementById("qst_number");
let startTime;
let timerInterval;
let correctAnswers = 0;
let elapsedTime = 0;
let goback = document.getElementById("buttons_groupe");
let start = document.getElementById("start");

// afficher les resultat
function displayResult() {
  const totalQuestions = questionsArray.length;
  const percentage = (correctAnswers / totalQuestions) * 100;
  const timeTaken = calculateTimeTaken(); // Use accumulated elapsed time for accuracy

  // creé template the resultat
  const resultHTML = `
        <div class="result">
        <img src="./images/Analytics-rafiki.svg" class="quiz_res">
           <div class="res_text">
           <h2>Quiz Result</h2>
           <p>You answered ${correctAnswers} out of ${totalQuestions} questions correctly.</p>
           <p>Your score: ${percentage.toFixed(2)}%</p>
           <p>Time taken: ${timeTaken.toFixed(2)} seconds</p>

           </div>
           </div>`;
  // afficher les resultat dans le contenir
  container.innerHTML = resultHTML;
  goback.innerHTML = `<a href="/" class="btn btn-primary">Go back </a>`;
}

// fonction de demmarage de quizze
function startTimer() {
  startTime = new Date();
  timerInterval = setInterval(updateTimer, 1000);
}

// fonction pour stop le chronoe
function stopTimer() {
  endTime = new Date();
  clearInterval(timerInterval);
}


// fonction pour calculé le temp ecoulée
function calculateTimeTaken() {
    return elapsedTime / 1000; 
}

// Fonction pour afficher la question
function displayQuestion(index) {
  const questionObj = questionsArray[index];
  container.innerHTML = `<div class="question">
                                <h2>${questionObj.question}</h2>
                                <span id="timer">Timer: 0s</span>
                            </div>
                            <div class="boxes">
                                ${questionObj.options
                                  .map(
                                    (option, idx) => `
                                    <div class="box" data-answer="${option}" style = "background-image:url(./images/${option}.jpg);" >
                                        <label for="option_${idx}">${option}</label>
                                    </div>
                                `
                                  )
                                  .join("")}
                            </div>`;
  qstof.innerHTML = `${index + 1} of ${questionsArray.length}`;
  startTimer();
}

// Fonction pour mise à jour le chrono
function updateTimer() {
  const currentTime = Math.floor((new Date() - startTime) / 1000); // Calculate elapsed time in seconds
  document.getElementById("timer").textContent = `Timer: ${currentTime}s`; // Update the timer display
}

// Demarer le quiz lorsque click sur start quiz button
start.addEventListener("click", ()=>{
  displayQuestion(qstIndex);
  goback.style.display = "flex";
})

// passe vers la question suivante
btnNext.addEventListener("click", () => {
  if (qstIndex < questionsArray.length - 1) {
    qstIndex++;
    stopTimer(); 
    elapsedTime += new Date() - startTime; 
    displayQuestion(qstIndex);
  }
});

//retour vers la question precedente
btnPrev.addEventListener("click", () => {
  if (qstIndex > 0) {
    qstIndex--;
    stopTimer();
    elapsedTime += new Date() - startTime;
    displayQuestion(qstIndex);
  }
});
 
// Fonction pour vérifier si la réponse est correcte 
function isCorrect(selectedAnswer) {
  const currentQuestion = questionsArray[qstIndex];
  return selectedAnswer === currentQuestion.answer;
}


container.addEventListener("click", (event) => {
  if (event.target.classList.contains("box")) {
    const selectedAnswer = event.target.getAttribute("data-answer");
    const correct = isCorrect(selectedAnswer);
    if (correct) {
      event.target.classList.add("correct");
      correctAnswers++;
    } else {
      event.target.classList.add("incorrect");
    }
    setTimeout(() => {
        if (qstIndex < questionsArray.length - 1) {
            qstIndex++;
            stopTimer(); 
            elapsedTime += new Date() - startTime; 
            displayQuestion(qstIndex);
        } else {
            stopTimer();
            elapsedTime += new Date() - startTime;
            displayResult();
        }
    }, 400);
  }
});

