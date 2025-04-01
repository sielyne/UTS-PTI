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
}

function updateGreeting() {
    const hours = new Date().getHours();
    let greeting = '';
    if (hours < 12) {
        greeting = 'Selamat Pagi!';
    } else if (hours < 18) {
        greeting = 'Selamat Siang!';
    } else {
        greeting = 'Selamat Malam!';
    }
    document.getElementById('greeting').innerText = greeting;
}

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