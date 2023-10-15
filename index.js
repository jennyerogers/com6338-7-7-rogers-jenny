
//your program should select the first question in questionsArr and display the question as well as the possible choices
//display a timer that counts down from 30 one second at a time...use setInterval and clearInterval for timer
// After the last question is answered or time runs out, the game should display the "start quiz" button along with a score that is calculated from the amount of correctly answered questions divided by the total number of questions (figure 2). This number should be rounded to the nearest whole number.
//application should use the JavaScript localStorage API to store the user's most recent score under the key previous-score after each game and retrieve the score on page load. 

//make array of questions
//QUESTION 1
var questionsArr = [
    {
      question: 'Who starred as Forrest in the 1994 film "Forrest Gump?"',
      answer: 'Tom Hanks',
      options: [
        'Michael J. Fox',
        'Tom Hanks',
        'Harrison Ford',
        'Robin Williams',
      ]
    },
    {
    //QUESTION 2
        question: 'Which director created the sci-fi world and film "Avatar?"',
        answer: 'James Cameron',
        options: [
          'James Cameron',
          'Christopher Nolan',
          'Woody Allen',
          'Guillermo Del Toro',
        ]
      },
      {
    //QUESTION 3
        question: 'Who directed fan-favorites like "Pulp Fiction," "Kill Bill Vol. 1 and 2," and "Inglorious Bastards?"',
        answer: 'Quentin Tarantino',
        options: [
          'Christopher Nolan',
          'Martin Scorsese',
          'Denis Villeneuve',
          'Quentin Tarantino',
        ]
      },
      {
    //QUESTION 4
        question: 'Which 1985 film—directed by Robert Zemeckis—features a high school boy being sent 30 years back in time?',
        answer: 'Back to the Future',
        options: [
          'Die Hard',
          'Interstellar',
          'Back to the Future',
          'The Breakfast Club',
        ]
      },
      {
    //QUESTION 5
        question: 'Which animated film features a boy teaming up with a cuddly robot to defeat evil?',
        answer: 'Big Hero 6',
        options: [
          'The Lion King',
          'Monsters Inc.',
          'Big Hero 6',
          'Lilo & Stitch',
        ]
      },
]
//set up vars
var quizGame = document.querySelector('#quiz')
var currentQuestion = 0
var score = 0
var timeRemaining
var quizTimer
//create start quiz ftn
function startQuiz() {
    //set up initial to 0
    currentQuestion = 0
    score = 0
// use the JavaScript localStorage API to store the user's most recent score under the key previous-score after each game and retrieve the score on page load. 
    quizGame.innerHTML = ''
    var lastScore = localStorage.getItem('previous-score') //changed to say previous score
    if (lastScore) {
        var lastScoreEl = document.createElement('p') //display hi there, last score: 
        lastScoreEl.textContent = 'Hi there, here is your last score: ' + lastScore
        quizGame.appendChild(lastScoreEl)
    }
    //add start quiz button
    var startBtn = document.createElement('button')
    startBtn.id = 'start-quiz'
    startBtn.textContent = 'Start Quiz'
    quizGame.appendChild(startBtn)
}

quizGame.onclick = function (e) { //as user clicks, function activates
    
    if (e.target.id === 'start-quiz') {
        showQuestion() //display question
    } else if (e.target.parentElement.id === 'choices' 
    && e.target.tagName === 'BUTTON') {
        if (e.target.textContent === questionsArr[currentQuestion].answer) {
            score++ //check answer
        }

        clearInterval(quizTimer) //zero time
        currentQuestion++ //next question

        if (currentQuestion < questionsArr.length) {
            showQuestion()
        } else {
            endQuiz() //end quiz
        }
    }
}
//After the last question is answered or time runs out, the game should display the "start quiz" button along with a score that is calculated from the amount of correctly answered questions divided by the total number of questions (figure 2). This number should be rounded to the nearest whole number.
function startTimer() {
    var timerEl = document.querySelector('#timer') //moved var inside function*
    quizTimer = setInterval(function () {
        timeRemaining--
        if (timeRemaining > 0) { //if time exceeds zero, update time
            timerEl.textContent = timeRemaining
        } else {
            clearInterval(quizTimer) //zero timer
            currentQuestion++
            if (currentQuestion < questionsArr.length) {
                showQuestion()
            } else {
                endQuiz() //once all questions are done, endQuiz
            }
        }
    }, 1000)
}

//display score
function showQuestion() {
    var questionBody = questionsArr[currentQuestion] //access question
    quizGame.innerHTML = '' // zero html

    timeRemaining = 30 //set up timer countdown

    var questionBodyEl = document.createElement('p') //create paragraph element for body of the question
    questionBodyEl.textContent = questionBody.question
    quizGame.appendChild(questionBodyEl)

    var quizChoices = document.createElement("div") //make div for options
    quizChoices.id = 'choices'
    quizGame.appendChild(quizChoices) //show choices
    questionBody.options.forEach(function (choice) {
        var btn = document.createElement('button') //make button for each option
        btn.textContent = choice
        quizChoices.appendChild(btn) //link btn to div
    })
    
    var timerEl = document.createElement('p')
    timerEl.id = 'timer'
    timerEl.textContent = timeRemaining //display timeRemaining
    quizGame.appendChild(timerEl)
    startTimer() //countdown starts
}


function endQuiz() {
    quizGame.innerHTML = '' //clear html again
    var percent = Math.round(score / questionsArr.length * 100) + '%' //round to whole number
    localStorage.setItem('previous-score', percent) //changed to say previous score, access localstorage
    startQuiz() //reload
}
//begin quiz command
startQuiz()