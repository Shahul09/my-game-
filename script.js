const bike = document.getElementById('bike');
const fuel = document.getElementById('fuel');
const car = document.getElementById('car');
const scoreDisplay = document.getElementById('score');
let score = 0;
let bikePosition = 125; // Starting position of the goat
let gameInterval;
let gameSpeed = 5; // Speed of object movement

document.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowLeft' && bikePosition > 0) {
        bikePosition -= 20;
    } else if (event.key === 'ArrowRight' && bikePosition < 230) {
        bikePosition += 20;
    }
    bike.style.left = `${bikePosition}px`;
});

function startGame() {
    // Place initial objects randomly
    resetObject(fuel, 'fuel');
    resetObject(car, 'car');

    gameInterval = setInterval(() => {
        moveObject(fuel, 'fuel');
        moveObject(car, 'car');
        checkCollision();
    }, 20);
}

function moveObject(object, type) {
    let objectTop = parseInt(window.getComputedStyle(object).getPropertyValue('top'));

    if (objectTop >= 600) { // If object goes off the screen, reset it
        resetObject(object, type);
    } else {
        object.style.top = `${objectTop + gameSpeed}px`;
    }
}

function resetObject(object, type) {
    object.style.top = '-50px'; // Start off screen at the top
    object.style.left = `${Math.floor(Math.random() * 270)}px`; // Random X position
}

function checkCollision() {
    let bikeRect = bike.getBoundingClientRect();
    let fuelRect = fuel.getBoundingClientRect();
    let carRect = car.getBoundingClientRect();

    // Check collision with leaf
    if (bikeRect.left < fuelRect.right &&
        bikeRect.right > fuelRect.left &&
        bikeRect.top < fuelRect.bottom &&
        bikeRect.bottom > fuelRect.top) {
        score++;
        scoreDisplay.textContent = score;
        resetObject(fuel, 'fuel');
    }

    // Check collision with bike
    if (bikeRect.left < carRect.right &&
        bikeRect.right > carRect.left &&
        bikeRect.top < carRect.bottom &&
        bikeRect.bottom > carRect.top) {
        clearInterval(gameInterval);
        alert('Game Over! Your Score: ' + score);
        window.location.reload();
    }
}

startGame();
