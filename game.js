// 게임 상태
let score = 0;
let treeStage = 0;
let level = 1;
let timeLeft = 120;
const treeStages = ['🌱', '🌿', '🌳', '🌳🍎', '🌳🍎🍎', '🌳🍎🍎🍎'];
const positiveWords = ['기뻐', '기뻐요', '행복해', '행복해요', '예뻐', '예뻐요', '사랑해', '잘했어', '멋져', '훌륭해', '대단해', '열심히해', '자랑스러워', '최고야', '힘내', '믿어', '사랑해요', '잘했어요', '멋져요', '훌륭해요', '대단해요', '열심히해요', '자랑스러워요', '최고예요', '힘내세요', '믿어요'];

// 배경 색상 배열
const backgroundColors = ['#87CEEB', '#FFB6C1', '#98FB98', '#DDA0DD', '#F0E68C'];

// DOM 요소
const treeElement = document.getElementById('tree');
const messageElement = document.getElementById('message');
const inputElement = document.getElementById('input');
const submitButton = document.getElementById('submit');
const scoreElement = document.getElementById('score');
const timerElement = document.getElementById('timer');
const levelElement = document.getElementById('level');
const skyElement = document.getElementById('sky');

// 게임 로직
function updateTree() {
    treeElement.textContent = treeStages[treeStage];
    if (treeStage === treeStages.length - 1) {
        messageElement.textContent = '축하합니다! 나무가 아름답게 자랐어요!';
        endGame();
    }
}

function updateScore() {
    score += 10 * level;
    scoreElement.textContent = `점수: ${score}`;
    if (score >= level * 50) {
        levelUp();
    }
}

function levelUp() {
    level++;
    levelElement.textContent = `레벨: ${level}`;
    messageElement.textContent = `레벨 ${level}로 올랐어요! 더 빠르게 자라요!`;
    changeBackgroundColor();
}

function changeBackgroundColor() {
    const colorIndex = (level - 1) % backgroundColors.length;
    skyElement.setAttribute('fill', backgroundColors[colorIndex]);
}

function checkInput() {
    const input = inputElement.value.trim().toLowerCase();
    if (positiveWords.some(word => input.includes(word))) {
        updateScore();
        treeStage = Math.min(treeStage + 1, treeStages.length - 1);
        messageElement.textContent = '좋아요! 나무가 더 건강해졌어요!';
        updateTree();
    } else {
        messageElement.textContent = '더 긍정적인 말을 해보세요!';
    }
    inputElement.value = '';
}

function updateTimer() {
    timeLeft--;
    timerElement.textContent = `남은 시간: ${timeLeft}초`;
    if (timeLeft <= 0) {
        endGame();
    }
}

function endGame() {
    clearInterval(timerInterval);
    inputElement.disabled = true;
    submitButton.disabled = true;
    messageElement.textContent = `게임 종료! 최종 점수: ${score}, 최종 레벨: ${level}`;
}

// 이벤트 리스너
submitButton.addEventListener('click', checkInput);
inputElement.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        checkInput();
    }
});

// 게임 초기화
updateTree();
updateScore();
const timerInterval = setInterval(updateTimer, 1000);