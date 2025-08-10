let flashcards = {};
let currentCategory = "";
let currentIndex = 0;

async function loadFlashcards() {
    const res = await fetch('flashcards.json');
    flashcards = await res.json();

    const select = document.getElementById('category');
    for (let category in flashcards) {
        let option = document.createElement('option');
        option.value = category;
        option.textContent = category;
        select.appendChild(option);
    }

    select.addEventListener('change', () => {
        currentCategory = select.value;
        currentIndex = 0;
        showCard();
    });

    // Default load
    select.value = Object.keys(flashcards)[0];
    currentCategory = select.value;
    showCard();
}

function showCard() {
    if (!currentCategory) return;

    const card = flashcards[currentCategory][currentIndex];
    document.getElementById('front').textContent = card.front;
    document.getElementById('back').textContent = card.back;
    document.getElementById('back').style.display = 'none';
}

function toggleBack() {
    const back = document.getElementById('back');
    back.style.display = back.style.display === 'none' ? 'block' : 'none';
}

function lastCard() {
    if (!flashcards[currentCategory]) return;
    if (currentIndex - 1 < 0) currentIndex = flashcards[currentCategory].length-1;
    else currentIndex = (currentIndex - 1);
    showCard();
}

function nextCard() {
    if (!flashcards[currentCategory]) return;
    currentIndex = (currentIndex + 1) % flashcards[currentCategory].length;
    showCard();
}

loadFlashcards();
