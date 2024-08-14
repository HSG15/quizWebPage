// // Helper function to get the logged-in username
// function getLoggedInUser() {
//     return localStorage.getItem('loggedInUser');
// }

// // Show/hide forms
// function showLogin() {
//     document.getElementById('login-form').style.display = 'block';
//     document.getElementById('signup-form').style.display = 'none';
// }

// function showSignup() {
//     document.getElementById('login-form').style.display = 'none';
//     document.getElementById('signup-form').style.display = 'block';
// }

// function showCreateQuiz() {
//     document.getElementById('auth').style.display = 'none';
//     document.getElementById('create-quiz').style.display = 'block';
// }

// function showTakeQuiz() {
//     document.getElementById('auth').style.display = 'none';
//     document.getElementById('create-quiz').style.display = 'none';
//     document.getElementById('take-quiz').style.display = 'block';
// }

// function showDashboard() {
//     document.getElementById('auth').style.display = 'none';
//     document.getElementById('create-quiz').style.display = 'none';
//     document.getElementById('take-quiz').style.display = 'none';
//     document.getElementById('dashboard').style.display = 'block';
// }

// // User SignUp
// function signup() {
//     const username = document.getElementById('signup-username').value;
//     const email = document.getElementById('signup-email').value;
//     const password = document.getElementById('signup-password').value;

//     if (localStorage.getItem(username)) {
//         alert('Username already exists');
//         return;
//     }

//     localStorage.setItem(username, JSON.stringify({ email, password }));
//     alert('Signup successful');
//     showLogin();
// }

// // User Login
// function login() {
//     const username = document.getElementById('login-username').value;
//     const password = document.getElementById('login-password').value;

//     const user = localStorage.getItem(username);
//     if (user && JSON.parse(user).password === password) {
//         localStorage.setItem('loggedInUser', username);
//         showCreateQuiz();
//     } else {
//         alert('Invalid credentials');
//     }
// }

// // Quiz creation
// let quizData = [];

// function addQuestion() {
//     const questionNumber = document.getElementById('questionNumber').value;
//     const questionText = document.getElementById('question').value;
//     const options = [
//         document.getElementById('option1').value,
//         document.getElementById('option2').value,
//         document.getElementById('option3').value,
//         document.getElementById('option4').value
//     ];
//     const correctOption = parseInt(document.getElementById('correct-option').value);
//     quizData =[{ questionNumber, questionText, options, correctOption },...quizData]
//     alert('Question added')
    
//     const questionData = {
//         "questionNo" : questionNumber,
//         "question" : questionText,
//         "opt1" : options[0],
//         "opt2" : options[1],
//         "opt3" : options[2],
//         "opt4" : options[3],
//         "answer" : correctOption
//     }
//     localStorage.setItem("questionData" , JSON.stringify(questionData));
    
//     document.getElementById('questionNumber').value = '';
//     document.getElementById('question').value = '';
//     document.getElementById('option1').value = '';
//     document.getElementById('option2').value = '';
//     document.getElementById('option3').value = '';
//     document.getElementById('option4').value = '';
//     document.getElementById('correct-option').value = '';

//     let ques = JSON.parse(localStorage.getItem("questionData"));
//     console.log(ques);
// }

// function generateLink() {
//     const user = getLoggedInUser();
//     const quizId = new Date().getTime();
//     localStorage.setItem(`quiz-${quizId}`, JSON.stringify({ creator: user, questions: quizData }));

//     const link = `${window.location.origin}/take-quiz.html?id=${quizId}`;
//     document.getElementById('link').textContent = link;
//     document.getElementById('quiz-link').style.display = 'block';
// }

// // Quiz taking
// function loadQuiz() {
//     const urlParams = new URLSearchParams(window.location.search);
//     const quizId = urlParams.get('id');
//     const quiz = JSON.parse(localStorage.getItem(`quiz-${quizId}`));

//     if (!quiz) {
//         alert('Quiz not found');
//         return;
//     }

//     const container = document.getElementById('questions-container');
//     container.innerHTML = '';
//     quiz.questions.forEach((q, index) => {
//         container.innerHTML += `
//             <div>
//                 <p>${q.question}</p>
//                 ${q.options.map((opt, i) => `<input type="radio" name="q${index}" value="${i}"> ${opt}<br>`).join('')}
//             </div>
//         `;
//     });
// }

// function submitQuiz() {
//     const urlParams = new URLSearchParams(window.location.search);
//     const quizId = urlParams.get('id');
//     const quiz = JSON.parse(localStorage.getItem(`quiz-${quizId}`));

//     if (!quiz) {
//         alert('Quiz not found');
//         return;
//     }

//     let score = 0;
//     quiz.questions.forEach((q, index) => {
//         const selectedOption = document.querySelector(`input[name="q${index}"]:checked`);
//         if (selectedOption && parseInt(selectedOption.value) === q.correctOption) {
//             score++;
//         }
//     });

//     alert(`Your score: ${score}/${quiz.questions.length}`);

//     // Update creator's dashboard
//     const creator = quiz.creator;
//     const results = JSON.parse(localStorage.getItem(`results-${creator}`)) || {};
//     results[quizId] = results[quizId] || [];
//     results[quizId].push({ username: getLoggedInUser(), score });
//     localStorage.setItem(`results-${creator}`, JSON.stringify(results));
// }

// // Viewing results (for creator)
// function viewResults() {
//     const user = getLoggedInUser();
//     const results = JSON.parse(localStorage.getItem(`results-${user}`)) || {};
    
//     const resultContainer = document.getElementById('results');
//     resultContainer.innerHTML = '';
//     for (const [quizId, quizResults] of Object.entries(results)) {
//         resultContainer.innerHTML += `<h3>Quiz ${quizId}</h3><ul>`;
//         quizResults.forEach(result => {
//             resultContainer.innerHTML += `<li>${result.username}: ${result.score}</li>`;
//         });
//         resultContainer.innerHTML += `</ul>`;
//     }
// }

// // Initialize quiz taking
// if (window.location.pathname.includes('take-quiz.html')) {
//     loadQuiz();
// }





// Helper function to get the logged-in username
function getLoggedInUser() {
    return localStorage.getItem('loggedInUser');
}

// Show/hide forms
function showView(view) {
    const views = ['auth', 'create-quiz', 'take-quiz', 'dashboard'];
    views.forEach(v => document.getElementById(v).style.display = 'none');
    document.getElementById(view).style.display = 'block';
}

// Hash-based routing
function route() {
    const hash = window.location.hash.substring(1);
    if (hash === 'create-quiz') {
        showView('create-quiz');
    } else if (hash === 'take-quiz') {
        showView('take-quiz');
        loadQuiz();
    } else if (hash === 'dashboard') {
        showView('dashboard');
        viewResults();
    } else {
        showView('auth');
    }
}

window.addEventListener('hashchange', route);
window.addEventListener('load', route);

// User SignUp
function signup() {
    const username = document.getElementById('signup-username').value;
    const email = document.getElementById('signup-email').value;
    const password = document.getElementById('signup-password').value;

    if (localStorage.getItem(username)) {
        alert('Username already exists');
        return;
    }

    localStorage.setItem(username, JSON.stringify({ email, password }));
    alert('Signup successful');
    showView('auth');
}

// User Login
function login() {
    const username = document.getElementById('login-username').value;
    const password = document.getElementById('login-password').value;

    const user = localStorage.getItem(username);
    if (user && JSON.parse(user).password === password) {
        localStorage.setItem('loggedInUser', username);
        showView('create-quiz');
    } else {
        alert('Invalid credentials');
    }
}

// Quiz creation
let quizData = [];

function addQuestion() {
    const questionNumber = document.getElementById('questionNumber').value;
    const questionText = document.getElementById('question').value;
    const options = [
        document.getElementById('option1').value,
        document.getElementById('option2').value,
        document.getElementById('option3').value,
        document.getElementById('option4').value
    ];
    const correctOption = parseInt(document.getElementById('correct-option').value);
    quizData = [{ questionNumber, questionText, options, correctOption }, ...quizData];
    alert('Question added');
    
    const questionData = {
        "questionNo": questionNumber,
        "question": questionText,
        "opt1": options[0],
        "opt2": options[1],
        "opt3": options[2],
        "opt4": options[3],
        "answer": correctOption
    };
    localStorage.setItem("questionData", JSON.stringify(questionData));
    
    document.getElementById('questionNumber').value = '';
    document.getElementById('question').value = '';
    document.getElementById('option1').value = '';
    document.getElementById('option2').value = '';
    document.getElementById('option3').value = '';
    document.getElementById('option4').value = '';
    document.getElementById('correct-option').value = '';

    let ques = JSON.parse(localStorage.getItem("questionData"));
    console.log(ques);
}

function generateLink() {
    const user = getLoggedInUser();
    const quizId = new Date().getTime();
    localStorage.setItem(`quiz-${quizId}`, JSON.stringify({ creator: user, questions: quizData }));

    const link = `#take-quiz?id=${quizId}`;
    document.getElementById('link').textContent = link;
    document.getElementById('quiz-link').style.display = 'block';
}

// Quiz taking
function loadQuiz() {
    const urlParams = new URLSearchParams(window.location.hash.substring(1));
    const quizId = urlParams.get('id');
    const quiz = JSON.parse(localStorage.getItem(`quiz-${quizId}`));

    if (!quiz) {
        alert('Quiz not found');
        return;
    }

    const container = document.getElementById('questions-container');
    container.innerHTML = '';
    quiz.questions.forEach((q, index) => {
        container.innerHTML += `
            <div>
                <p>${q.question}</p>
                ${q.options.map((opt, i) => `<input type="radio" name="q${index}" value="${i}"> ${opt}<br>`).join('')}
            </div>
        `;
    });
}

function submitQuiz() {
    const urlParams = new URLSearchParams(window.location.hash.substring(1));
    const quizId = urlParams.get('id');
    const quiz = JSON.parse(localStorage.getItem(`quiz-${quizId}`));

    if (!quiz) {
        alert('Quiz not found');
        return;
    }

    let score = 0;
    quiz.questions.forEach((q, index) => {
        const selectedOption = document.querySelector(`input[name="q${index}"]:checked`);
        if (selectedOption && parseInt(selectedOption.value) === q.correctOption) {
            score++;
        }
    });

    alert(`Your score: ${score}/${quiz.questions.length}`);

    // Update creator's dashboard
    const creator = quiz.creator;
    const results = JSON.parse(localStorage.getItem(`results-${creator}`)) || {};
    results[quizId] = results[quizId] || [];
    results[quizId].push({ username: getLoggedInUser(), score });
    localStorage.setItem(`results-${creator}`, JSON.stringify(results));
}

// Viewing results (for creator)
function viewResults() {
    const user = getLoggedInUser();
    const results = JSON.parse(localStorage.getItem(`results-${user}`)) || {};
    
    const resultContainer = document.getElementById('results');
    resultContainer.innerHTML = '';
    for (const [quizId, quizResults] of Object.entries(results)) {
        resultContainer.innerHTML += `<h3>Quiz ${quizId}</h3><ul>`;
        quizResults.forEach(result => {
            resultContainer.innerHTML += `<li>${result.username}: ${result.score}</li>`;
        });
        resultContainer.innerHTML += `</ul>`;
    }
}

