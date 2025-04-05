// Game variables
let player = {
    name: "",
    avatar: "",
    money: 25000000,
    happiness: 50,
    hunger: 50,
    hygiene: 50,
    energy: 50,
    location: "Home"
};

// Game time variables
let gameTime = {
    hour: 8,
    minute: 0,
    day: 1
};

// Time conversion: 1 second real time = 1 minute game time
const TIME_MULTIPLIER = 60;
let gameInterval;
let timeInterval;

// Initialize Swiper
document.addEventListener('DOMContentLoaded', function() {
    const swiper = new Swiper('.swiper-container', {
        loop: true,
        pagination: {
            el: '.swiper-pagination',
            clickable: true
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev'
        }
    });
});

// Select avatar function
function selectAvatar(avatarName) {
    player.avatar = avatarName;
    const slides = document.querySelectorAll('.swiper-slide img');
    slides.forEach(slide => {
        slide.style.border = 'none';
    });
    event.target.style.border = '5px solid green';
}

// Start game function
function startGame() {
    const playerName = document.getElementById('player-name').value;
    if (!playerName.trim()) {
        alert('Please enter your name!');
        return;
    }
    if (!player.avatar) {
        alert('Please select an avatar!');
        return;
    }

    player.name = playerName;
    
    // Hide the game container and show the main game
    document.getElementById('game-container').style.display = 'none';
    document.getElementById('main-container').style.display = 'grid';
    document.getElementById('status').style.display = 'flex';
    document.getElementById('game-interface').style.display = 'grid';
    document.getElementById('activity-details').style.display = 'flex';
    
    // Update the status bars
    updateStatusBars();
    
    // Start game time
    startGameTime();
    
    // Set initial greeting
    updateGreeting();
    
    // Initialize location to Home
    moveTo('Home');
}

// Update status bars
function updateStatusBars() {
    document.getElementById('happiness').textContent = player.happiness;
    document.getElementById('happiness-bar').style.width = `${player.happiness}%`;
    document.getElementById('happiness-bar').style.backgroundColor = getBarColor(player.happiness);
    
    document.getElementById('hunger').textContent = player.hunger;
    document.getElementById('hunger-bar').style.width = `${player.hunger}%`;
    document.getElementById('hunger-bar').style.backgroundColor = getBarColor(player.hunger);
    
    document.getElementById('hygiene').textContent = player.hygiene;
    document.getElementById('hygiene-bar').style.width = `${player.hygiene}%`;
    document.getElementById('hygiene-bar').style.backgroundColor = getBarColor(player.hygiene);
    
    document.getElementById('energy').textContent = player.energy;
    document.getElementById('energy-bar').style.width = `${player.energy}%`;
    document.getElementById('energy-bar').style.backgroundColor = getBarColor(player.energy);
    
    document.getElementById('money').textContent = formatMoney(player.money);
    
    // Check if any status is at 0
    if (player.happiness <= 0 || player.hunger <= 0 || player.hygiene <= 0 || player.energy <= 0) {
        gameOver();
    }
}

// Format money with commas
function formatMoney(amount) {
    return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

// Get color for status bar based on value
function getBarColor(value) {
    if (value > 70) return 'green';
    if (value > 30) return 'orange';
    return 'red';
}

// Start game time function
function startGameTime() {
    if (timeInterval) clearInterval(timeInterval);
    
    timeInterval = setInterval(() => {
        // Increment game time
        gameTime.minute++;
        if (gameTime.minute >= 60) {
            gameTime.hour++;
            gameTime.minute = 0;
            
            // Every hour, decrease status slightly
            decreaseStatus();
        }
        
        if (gameTime.hour >= 24) {
            gameTime.hour = 0;
            gameTime.day++;
        }
        
        // Update time display
        updateTimeDisplay();
        
        // Update greeting based on time
        updateGreeting();
    }, 1000); // 1 second real time = 1 minute game time
}

// Update time display
function updateTimeDisplay() {
    const hourDisplay = gameTime.hour.toString().padStart(2, '0');
    const minuteDisplay = gameTime.minute.toString().padStart(2, '0');
    document.getElementById('current-time').textContent = `${hourDisplay}:${minuteDisplay}`;
}

// Update greeting based on time
function updateGreeting() {
    let greeting = "";
    if (gameTime.hour >= 5 && gameTime.hour < 12) {
        greeting = "Good Morning!";
    } else if (gameTime.hour >= 12 && gameTime.hour < 18) {
        greeting = "Good Afternoon!";
    } else if (gameTime.hour >= 18 && gameTime.hour < 22) {
        greeting = "Good Evening!";
    } else {
        greeting = "Good Night!";
    }
    document.getElementById('greeting').textContent = greeting;
}

// Decrease status slightly every hour
function decreaseStatus() {
    player.hunger = Math.max(0, player.hunger - 5);
    player.hygiene = Math.max(0, player.hygiene - 3);
    player.energy = Math.max(0, player.energy - 4);
    player.happiness = Math.max(0, player.happiness - 2);
    updateStatusBars();
}

// Move to location
function moveTo(location) {
    // Hide all activity panels
    document.querySelectorAll('[id^="activity-"]').forEach(element => {
        if (element.id !== 'activity-details') {
            element.style.display = 'none';
        }
    });
    
    // Show the appropriate activity panel
    document.getElementById(`activity-${location.toLowerCase()}`).style.display = 'block';
    
    // Update player location
    player.location = location;
    
    // Moving costs energy
    if (player.energy >= 5) {
        player.energy -= 5;
        updateStatusBars();
    } else {
        alert("You don't have enough energy to move!");
        return;
    }
}

// Perform activity
function doActivity(activity) {
    switch (activity) {
        case 'Work':
            if (player.location === 'Home') {
                player.money += 500000;
                player.energy -= 15;
                player.hygiene -= 10;
                player.hunger -= 10;
                alert("You worked at home. +Rp500.000, -15 Energy, -10 Hygiene, -10 Hunger");
            } else {
                player.money += 1000000;
                player.energy -= 20;
                player.hygiene -= 15;
                player.hunger -= 15;
                alert(`You worked at ${player.location}. +Rp1.000.000, -20 Energy, -15 Hygiene, -15 Hunger`);
            }
            break;
            
        case 'Eat':
            if (player.location === 'Home') {
                player.hunger = Math.min(100, player.hunger + 30);
                player.energy += 5;
                alert("You ate home-cooked food. +30 Hunger, +5 Energy");
            } else {
                if (player.money >= 100000) {
                    player.money -= 100000;
                    player.hunger = Math.min(100, player.hunger + 40);
                    player.happiness += 10;
                    player.energy += 10;
                    alert(`You ate at a restaurant in ${player.location}. -Rp100.000, +40 Hunger, +10 Happiness, +10 Energy`);
                } else {
                    alert("You don't have enough money to eat at a restaurant!");
                    return;
                }
            }
            break;
            
        case 'Clean':
            if (player.location === 'Home') {
                player.hygiene = Math.min(100, player.hygiene + 40);
                player.energy -= 10;
                alert("You took a bath. +40 Hygiene, -10 Energy");
            } else {
                player.happiness += 15;
                player.energy -= 15;
                player.hygiene -= 5;
                alert(`You explored ${player.location}. +15 Happiness, -15 Energy, -5 Hygiene`);
            }
            break;
            
        case 'Sleep':
            if (player.location === 'Home') {
                player.energy = Math.min(100, player.energy + 50);
                gameTime.hour = (gameTime.hour + 8) % 24;
                updateTimeDisplay();
                updateGreeting();
                alert("You slept for 8 hours. +50 Energy");
            } else {
                player.happiness += 20;
                player.money -= 50000;
                player.energy -= 10;
                alert(`You bought souvenirs at ${player.location}. +20 Happiness, -Rp50.000, -10 Energy`);
            }
            break;
            
        case 'Swim':
            if (player.location === 'Lake' || player.location === 'Beach') {
                player.happiness += 25;
                player.energy -= 20;
                player.hygiene -= 10;
                alert(`You went swimming at ${player.location}. +25 Happiness, -20 Energy, -10 Hygiene`);
            } else {
                player.happiness += 10;
                player.energy -= 15;
                alert(`You played at ${player.location}. +10 Happiness, -15 Energy`);
            }
            break;
    }
    
    updateStatusBars();
}

// Game over function
function gameOver() {
    clearInterval(timeInterval);
    
    let reason = "";
    if (player.happiness <= 0) reason = "depression";
    else if (player.hunger <= 0) reason = "starvation";
    else if (player.hygiene <= 0) reason = "disease";
    else if (player.energy <= 0) reason = "exhaustion";
    
    alert(`GAME OVER! You died from ${reason}. You survived for ${gameTime.day} days.`);
    location.reload();
}

// Movement using joystick
document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('up').addEventListener('click', function() {
        if (player.location === 'Home') moveTo('Mountain');
        else if (player.location === 'Beach') moveTo('Temple');
        else if (player.location === 'Temple') moveTo('Mountain');
        else if (player.location === 'Lake') moveTo('Home');
    });
    
    document.getElementById('down').addEventListener('click', function() {
        if (player.location === 'Home') moveTo('Lake');
        else if (player.location === 'Mountain') moveTo('Temple');
        else if (player.location === 'Temple') moveTo('Beach');
        else if (player.location === 'Lake') moveTo('Beach');
    });
    
    document.getElementById('left').addEventListener('click', function() {
        if (player.location === 'Home') moveTo('Lake');
        else if (player.location === 'Mountain') moveTo('Home');
        else if (player.location === 'Temple') moveTo('Home');
        else if (player.location === 'Beach') moveTo('Lake');
    });
    
    document.getElementById('right').addEventListener('click', function() {
        if (player.location === 'Home') moveTo('Temple');
        else if (player.location === 'Mountain') moveTo('Temple');
        else if (player.location === 'Lake') moveTo('Temple');
        else if (player.location === 'Beach') moveTo('Mountain');
    });
});
