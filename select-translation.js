let flashcards = [];
let currentCard = null;
let correctIndex = 0;

async function loadFlashcards() {
    const res = await fetch('flashcards.json');
    const data = await res.json();
    flashcards = Object.values(data).flat();
    showQuestion();
}

function getRandomOptions(correctCard) {
    // Get 2 random cards with different Italian translations
    const options = [correctCard];
    while (options.length < 3) {
        const candidate = flashcards[Math.floor(Math.random() * flashcards.length)];
        if (!options.some(opt => opt.front === candidate.front)) {
            options.push(candidate);
        }
    }
    // Shuffle options
    for (let i = options.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [options[i], options[j]] = [options[j], options[i]];
    }
    return options;
}

function showQuestion() {
    document.getElementById('feedback').textContent = '';
    document.getElementById('next-btn').style.display = 'none';
    currentCard = flashcards[Math.floor(Math.random() * flashcards.length)];
    document.getElementById('danish').textContent = currentCard.back;
    const options = getRandomOptions(currentCard);
    correctIndex = options.findIndex(opt => opt.front === currentCard.front);

    const optionsDiv = document.getElementById('options');
    optionsDiv.innerHTML = '';
    options.forEach((opt, idx) => {
        const btn = document.createElement('button');
        btn.textContent = opt.front;
        btn.onclick = () => selectOption(idx);
        btn.style.margin = '8px';
        optionsDiv.appendChild(btn);
    });
}

function selectOption(idx) {
    const feedback = document.getElementById('feedback');
    if (idx === correctIndex) {
        feedback.textContent = 'Correct!';
    } else {
        feedback.textContent = `Incorrect. The correct answer is: ${currentCard.front}`;
    }
    document.getElementById('next-btn').style.display = 'inline-block';
    Array.from(document.getElementById('options').children).forEach(btn => btn.disabled = true);
}

document.getElementById('next-btn').addEventListener('click', showQuestion);

loadFlashcards();
