let playerName = '';
let avatar = '';
let hunger = 50;
let energy = 50;
let hygiene = 50;
let happiness = 50;
let money = 100;


document.addEventListener("DOMContentLoaded", function() {
    var Swipes = new Swiper('.swiper-container', {
        loop: true,
        speed: 1000,
        autoplay: {
            delay: 2500,
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        }
    });
});

let swiper = new Swiper('.swiper-container', {
    loop: true,
    autoplay: { delay: 2500 },
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    }
});

function selectAvatar(selectedAvatar) {
    avatar = selectedAvatar;
    alert(`Avatar ${selectedAvatar} dipilih!`);
    swiper.autoplay.stop();
}


function startGame() {
    playerName = document.getElementById('player-name').value;
    if (!playerName || !avatar) {
        alert('Silakan pilih avatar dan masukkan nama!');
        return;
    }
    document.getElementById('game-container').style.display = 'none';
    document.getElementById('status').style.display = 'flex';
    document.getElementById('game-interface').style.display = 'block';
    updateGreeting();
    updateStatus();
}


function moveTo(location) {
    if (money < 10) {
        alert('Uang anda belum mencukupi untuk pergi');
        return;
    }
    
    alert(`Anda telah pergi ke ${location}`);

    happiness = Math.min(happiness + 10, 100);
    money -= 10;

    updateStatus();
}


function updateStatus() {
    document.getElementById('hunger').innerText = hunger;
    document.getElementById('energy').innerText = energy;
    document.getElementById('hygiene').innerText = hygiene;
    document.getElementById('happiness').innerText = happiness;
    document.getElementById('money').innerText = money;
    updateTime();
}

let gameTime = 0; // Game time in minutes
let gameStartTime = new Date(); // Start time

function updateTime() {
    // Increment game time by 1 minute
    gameTime++;

    // Calculate the game hours and minutes
    const gameHours = Math.floor(gameTime / 60) + 12; // Starting from 12 PM
    const gameMinutes = gameTime % 60;

    // Update the time display
    const formattedTime = `${gameHours % 24}:${String(gameMinutes).padStart(2, '0')} ${gameHours >= 12 ? 'PM' : 'AM'}`;
    document.getElementById("current-time").innerText = formattedTime;

    // Update the greeting based on game time
    updateGreeting(gameHours);
}

function updateGreeting(hours) {
    let greeting;
    if (hours >= 12 && hours < 17) {
        greeting = "Good Afternoon";
    } else if (hours >= 17 && hours < 21) {
        greeting = "Good Evening";
    } else {
        greeting = "Good Night";
    }
    document.getElementById("greeting").innerText = greeting + ' ' + playerName + '!';
}

// Call updateTime every second (1 second in real life = 1 minute in game)
setInterval(updateTime, 1000);

document.addEventListener('keydown', function(event) {
    if (event.key === 'ArrowRight') {
        moveTo('Beach'); 
    } else if (event.key === 'ArrowLeft') {
        moveTo('Home'); 
    } else if (event.key === 'ArrowUp') {
        moveTo('Temple'); 
    } else if (event.key === 'ArrowDown') {
        moveTo('Lake'); 
    }
});