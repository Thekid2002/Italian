let questions = [];
let current = 0;

// Utility to shuffle array
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function showQuestion() {
    if (!questions.length) return;
    const q = questions[current];
    const questionDiv = document.getElementById('question');
    questionDiv.textContent = `Domanda: ${q.question}`;
    questionDiv.style.position = 'relative';
    questionDiv.onmouseenter = function() {
        // Remove any existing tooltip first
        let tips = questionDiv.querySelectorAll('.hover-translation');
        tips.forEach(t => t.remove());
        let tip = document.createElement('span');
        tip.textContent = q.question_translation;
        tip.style.position = 'absolute';
        tip.style.left = '0';
        tip.style.top = '100%';
        tip.style.transform = 'translateY(4px)';
        tip.style.background = '#f0f0f0';
        tip.style.border = '1px solid #ccc';
        tip.style.padding = '4px 8px';
        tip.style.whiteSpace = 'nowrap';
        tip.style.zIndex = '10';
        tip.className = 'hover-translation';
        questionDiv.appendChild(tip);
    };
    questionDiv.onmouseleave = function() {
        let tips = questionDiv.querySelectorAll('.hover-translation');
        tips.forEach(t => t.remove());
    };

    const answersDiv = document.getElementById('answers');
    answersDiv.innerHTML = '';
    q.answers.forEach((ans, idx) => {
        const btn = document.createElement('button');
        btn.textContent = ans.text;
        btn.style.position = 'relative';
        btn.onmouseenter = function() {
            let tip = document.createElement('span');
            tip.textContent = ans.translation;
            tip.style.position = 'absolute';
            tip.style.left = '100%';
            tip.style.top = '50%';
            tip.style.transform = 'translateY(-50%)';
            tip.style.background = '#f0f0f0';
            tip.style.border = '1px solid #ccc';
            tip.style.padding = '4px 8px';
            tip.style.whiteSpace = 'nowrap';
            tip.style.zIndex = '10';
            tip.className = 'hover-translation';
            btn.appendChild(tip);
        };
        btn.onmouseleave = function() {
            let tips = btn.querySelectorAll('.hover-translation');
            tips.forEach(t => t.remove());
        };
        btn.onclick = () => checkAnswer(idx);
        answersDiv.appendChild(btn);
    });
    document.getElementById('feedback').textContent = '';
}

function checkAnswer(idx) {
    const q = questions[current];
    const feedback = document.getElementById('feedback');
    if (idx === q.correct) {
        feedback.textContent = 'Correct!';
        feedback.style.color = 'green';
    } else {
        feedback.textContent = 'Incorrect!';
        feedback.style.color = 'red';
    }
}

document.getElementById('next').onclick = () => {
    current = (current + 1) % questions.length;
    showQuestion();
};

// Load questions.json and start
fetch('questions.json')
    .then(res => res.json())
    .then(data => {
        questions = data;
        shuffle(questions);
        showQuestion();
    })
    .catch(err => {
        document.getElementById('question').textContent = 'Could not load questions.';
    });
