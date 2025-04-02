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
            ArrowLeft: '.swiper-button-prev',
            ArrowRight: '.swiper-button-next',
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
        ArrowLeft: '.swiper-button-prev',
        ArrowRight: '.swiper-button-next',
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
    document.getElementById('activity-details').style.display = 'block';
    updateGreeting();
    updateStatus();
}

let gameTime = 0;
function updateTime() {
    gameTime++;
    let gameHours = Math.floor(gameTime / 120) + 12;
    let gameMinutes = gameTime % 60;
    let formattedTime = `${gameHours % 24}:${String(gameMinutes).padStart(2, '0')} ${gameHours >= 12 ? 'PM' : 'AM'}`;
    document.getElementById("current-time").innerText = formattedTime;
    updateGreeting(gameHours);
}
setInterval(updateTime, 3000);

function updateGreeting(hours) {
    let greeting = (hours >= 12 && hours < 17) ? "Good Afternoon" :
                   (hours >= 17 && hours < 21) ? "Good Evening" : 
                   (hours >= 21 && hours <=12) ? "Good Evening" :"Good Night";
    document.getElementById("greeting").innerText = greeting + ' ' + playerName + '!';
}

function updateStatus() {
    document.getElementById('hunger').innerText = hunger;
    document.getElementById('energy').innerText = energy;
    document.getElementById('happiness').innerText = happiness;
    document.getElementById('money').innerText = money;
    document.getElementById('health').innerText = money;
    
    document.getElementById('happiness-bar').style.width = happiness + '%';
    document.getElementById('hunger-bar').style.width = hunger + '%';
    document.getElementById('money-bar').style.width = (money / 100) * 100 + '%';
    document.getElementById('energy-bar').style.width = energy + '%';
    document.getElementById('health-bar').style.width = health + '%';

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

document.addEventListener("DOMContentLoaded", function() {
    updateStatus();
});

document.addEventListener('keydown', function(event) {
    if (document.getElementById('game-container').style.display !== 'none') {
        if (event.key === 'ArrowLeft') {
            swiper.slidePrev();
        } else if (event.key === 'ArrowRight') {
            swiper.slideNext();
        }
    }
});

document.addEventListener('keydown', function(event) {
    if (document.getElementById('game-interface').style.display !== 'none') {
        if (event.key === 'ArrowRight') {
            moveTo('Beach');
        } else if (event.key === 'ArrowLeft') {
            moveTo('Home');
        } else if (event.key === 'ArrowUp') {
            moveTo('Temple');
        } else if (event.key === 'ArrowDown') {
            moveTo('Lake');
        }
    }
});