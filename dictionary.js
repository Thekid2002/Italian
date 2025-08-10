let allWords = [];

async function loadDictionary() {
    const res = await fetch('flashcards.json');
    const flashcards = await res.json();
    allWords = [];
    for (const category in flashcards) {
        for (const card of flashcards[category]) {
            allWords.push({
                italian: card.front,
                danish: card.back,
                category
            });
        }
    }
    renderTable(allWords);
}

function renderTable(words) {
    const tbody = document.getElementById('dict-body');
    tbody.innerHTML = '';
    for (const word of words) {
        const tr = document.createElement('tr');
        tr.innerHTML = `<td>${word.italian}</td><td>${word.danish}</td><td>${word.category}</td>`;
        tbody.appendChild(tr);
    }
}

document.getElementById('search').addEventListener('input', function() {
    const q = this.value.trim().toLowerCase();
    const filtered = allWords.filter(w =>
        w.italian.toLowerCase().includes(q) ||
        w.danish.toLowerCase().includes(q)
    );
    renderTable(filtered);
});

loadDictionary();
