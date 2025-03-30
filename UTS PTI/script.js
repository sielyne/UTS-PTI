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


function selectAvatar(selectedAvatar) {
    avatar = selectedAvatar;
    alert(`Avatar ${selectedAvatar} dipilih!`);
}


function startGame() {
    playerName = document.getElementById('player-name').value;
    if (!playerName || !avatar) {
        alert('Silakan pilih avatar dan masukkan nama!');
        return;
    }
    document.getElementById('avatar-selection').style.display = 'none';
    document.getElementById('game-interface').style.display = 'block';
    updateGreeting();
    updateStatus();
}

// Fungsi untuk berpindah lokasi



function moveTo(location) {
    if (money < 10) {
        alert('Uang anda belum mencukupi untuk pergi');
        return; // Menghentikan eksekusi jika uang tidak cukup
    }
    
    alert(`Anda telah pergi ke ${location}`);

    // Menyesuaikan status berdasarkan lokasi
    happiness = Math.min(happiness + 10, 100);
    money -= 10;

    updateStatus();
}


// Fungsi untuk memperbarui status pemain
function updateStatus() {
    document.getElementById('hunger').innerText = hunger;
    document.getElementById('energy').innerText = energy;
    document.getElementById('hygiene').innerText = hygiene;
    document.getElementById('happiness').innerText = happiness;
    document.getElementById('money').innerText = money;
}

// Fungsi untuk memperbarui salam
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

// Menangani tombol panah untuk navigasi
document.addEventListener('keydown', function(event) {
    if (event.key === 'ArrowRight') {
        moveTo('Beach'); // Contoh: pindah ke pantai
    } else if (event.key === 'ArrowLeft') {
        moveTo('Home'); // Contoh: pindah ke rumah
    } else if (event.key === 'ArrowUp') {
        moveTo('Temple'); // Contoh: pindah ke kuil
    } else if (event.key === 'ArrowDown') {
        moveTo('Lake'); // Contoh: pindah ke danau
    }
});