const display = document.getElementById('display');
const themeToggle = document.getElementById('theme-toggle');
const muteBtn = document.getElementById('mute-btn');
const historyBtn = document.getElementById('history-btn');
const historyPanel = document.getElementById('history-panel');
const historyList = document.getElementById('history-list');
const closeHistory = document.getElementById('close-history');
const clearHistoryBtn = document.getElementById('clear-history');

// Sounds
const normalSound = new Audio('took.mp3');
const equalsSound = new Audio('click.mp3');

let currentExpression = '';
let history = [];
let isMuted = false;
let isDark = false;

// Theme Toggle
themeToggle.addEventListener('click', () => {
    isDark = !isDark;
    document.body.classList.toggle('dark', isDark);
    themeToggle.textContent = isDark ? '☀️' : '🌙';
});

// Mute Toggle
muteBtn.addEventListener('click', () => {
    isMuted = !isMuted;
    muteBtn.textContent = isMuted ? '🔇' : '🔊';
});

// History Panel
historyBtn.addEventListener('click', () => {
    historyPanel.classList.remove('hidden');
    renderHistory();
});

closeHistory.addEventListener('click', () => {
    historyPanel.classList.add('hidden');
});

clearHistoryBtn.addEventListener('click', () => {
    history = [];
    renderHistory();
});

function renderHistory() {
    historyList.innerHTML = '';
    if (history.length === 0) {
        historyList.innerHTML = '<p style="color:#999; text-align:center;">No history yet</p>';
    } else {
        history.slice().reverse().forEach(item => {
            const p = document.createElement('p');
            p.textContent = item;
            historyList.appendChild(p);
        });
    }
}

// Sound Play Function
function playSound(sound) {
    if (!isMuted) {
        sound.currentTime = 0;
        sound.play();
    }
}

// Button clicks – normal sound for all except =
document.querySelectorAll('button').forEach(btn => {
    btn.addEventListener('click', () => {
        if (btn.classList.contains('equals')) {
            playSound(equalsSound);
        } else {
            playSound(normalSound);
        }
    });
});

// Calculator Functions
function appendToDisplay(value) {
    if (display.textContent === '0' && value !== '.') {
        display.textContent = value;
    } else {
        display.textContent += value;
    }
    currentExpression += value;
}

function clearDisplay() {
    display.textContent = '0';
    currentExpression = '';
}

function toggleSign() {
    if (display.textContent !== '0') {
        if (display.textContent.startsWith('-')) {
            display.textContent = display.textContent.slice(1);
        } else {
            display.textContent = '-' + display.textContent;
        }
        currentExpression = display.textContent;
    }
}

function calculate() {
    try {
        let result = eval(currentExpression.replace('×', '*').replace('÷', '/'));
        const entry = currentExpression + ' = ' + result;
        history.push(entry);
        display.textContent = result;
        currentExpression = result.toString();
    } catch {
        display.textContent = 'Error';
        setTimeout(() => {
            display.textContent = '0';
            currentExpression = '';
        }, 1500);
    }
}