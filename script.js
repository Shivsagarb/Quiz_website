const questions = [
    {
        question: "Who won the FIFA World Cup in 2018?",
        answer: [
            {Text: "France", correct: true},
            {Text: "Germany", correct: false},
            {Text: "Brazil", correct: false},
            {Text: "Argentina", correct: false},
        ]
    },
    {
        question: "Which player is often referred to as 'CR7'?",
        answer: [
            {Text: "Ozil", correct: false},
            {Text: "Neymar", correct: false},
            {Text: "Cristiano Ronaldo", correct: true},
            {Text: "Vinci jr.", correct: false},
        ] 
    },
    {
        question: "Which country is famous for its national football team known as the 'Samba Boys'?",
        answer: [
            {Text: "spain", correct: false},
            {Text: "Brazil", correct: true},
            {Text: "Italy", correct: false},
            {Text: "Argentina", correct: false},
        ]
    },
    {
        question: "Which football club is known as 'The Red Devils'?",
        answer: [           
            {Text: "AC Milan", correct: false},
            {Text: "Bayern Munich", correct: false},
            {Text: "Liverpool", correct: false},
            {Text: "Manchester United", correct: true},
        ]
    },
    {
        question: "The FIFA Ballon d'Or is awarded to the best football player in the world. Which player has won it the most times as of September 2021?",
        answer: [
            {Text: "Lionel Messi", correct: true},
            {Text: "Cristiano Ronaldo", correct: false},
            {Text: "Neymar jr.", correct: false},
            {Text: "Lewandoski", correct: false},
        ]
    }
];

const questionElement = document.getElementById("question");
const answerButton = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answer.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.Text;
        button.classList.add("btn");
        answerButton.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}

function resetState(){
    nextButton.style.display = "none";
    while(answerButton.firstChild){
        answerButton.removeChild(answerButton.firstChild);
    }
}

function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButton.children).forEach(button =>{
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showScore(){
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }else{
        showScore();
    }
}

nextButton.addEventListener("click", () =>{
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }else{
        startQuiz();
    }
})


startQuiz();