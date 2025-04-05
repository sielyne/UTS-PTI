let playerName = '';
let avatar = '';
let hunger = 50;
let energy = 50;
let hygiene = 50;
let happiness = 50;
let money = 25000000;


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
    document.getElementById('main-container').style.display = 'grid';
    document.getElementById('status').style.display = 'flex';
    document.getElementById('game-interface').style.display = 'flex';
    document.getElementById('activity-details').style.display = 'flex';
    document.getElementById('activity-home').style.display = 'block';
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
    document.getElementById('hygiene').innerText = hygiene;
    let maxMoney = 1000;
    document.getElementById('happiness-bar').style.width = happiness + '%';
    document.getElementById('hunger-bar').style.width = hunger + '%';
    document.getElementById('energy-bar').style.width = energy + '%';
    document.getElementById('hygiene-bar').style.width = hygiene + '%';

}

function moveTo(location) {
    if (money < 1000000) {
        alert('Uang anda belum mencukupi untuk pergi');
        return;
    } else if (energy < 10) {
        alert('Anda kehabisan energi! Kembali ke rumah.');
        return;
    }

    alert(`Anda telah pergi ke ${location}`);
    happiness = Math.min(happiness + 10, 100);
    money = Math.max(money - 1000000, 0);
    energy = Math.max(energy - 10, 0);
    updateStatus();

    document.getElementById('activity-home').style.display = 'none';
    document.getElementById('activity-beach').style.display = 'none';
    document.getElementById('activity-lake').style.display = 'none';
    document.getElementById('activity-temple').style.display = 'none';
    document.getElementById('activity-mountain').style.display = 'none';

    switch (location) {
        case 'Home':
            document.getElementById('activity-home').style.display = 'block';
            break;
        case 'Beach':
            document.getElementById('activity-beach').style.display = 'block';
            break;
        case 'Lake':
            document.getElementById('activity-lake').style.display = 'block';
            break;
        case 'Temple':
            document.getElementById('activity-temple').style.display = 'block';
            break;
        case 'Mountain':
            document.getElementById('activity-mountain').style.display = 'block';
            break;
        default:
            console.error('Lokasi tidak dikenal');
            break;
    }
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