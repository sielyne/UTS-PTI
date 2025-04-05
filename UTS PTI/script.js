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

let gameTime = {
    hour: 8,
    minute: 0,
    day: 1
};

// Time 1 second real time = 1 minute game time
const TIME_MULTIPLIER = 60;
let gameInterval;
let timeInterval;

// Swiper
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

// Select avatar 
function selectAvatar(avatarName) {
    player.avatar = avatarName;
    const slides = document.querySelectorAll('.swiper-slide img');
    slides.forEach(slide => {
        slide.style.border = 'none';
    });
    event.target.style.border = '5px solid green';
}

function startGameTime() {
    timeInterval = setInterval(function() {
        gameTime.minute++;
        
        if (gameTime.minute >= 60) {
            gameTime.hour++;
            gameTime.minute = 0;
        }
        
        if (gameTime.hour >= 24) {
            gameTime.day++;
            gameTime.hour = 0;
        }
        
        updateTimeDisplay();
        updateGreeting();
    }, 1000 / TIME_MULTIPLIER); // 1 second real time = 1 minute game time
}

// Check if game is over
function checkGameOver() {
    if (player.hunger <= 0 || player.hygiene <= 0 || player.energy <= 0 || player.happiness <= 0) {
        clearInterval(timeInterval);
        
        let cause = "";
        if (player.hunger <= 0) cause = "starvation";
        else if (player.hygiene <= 0) cause = "sickness";
        else if (player.energy <= 0) cause = "exhaustion";
        else if (player.happiness <= 0) cause = "depression";
        
        alert(`Game Over! ${player.name} died from ${cause}.`);
        
        // Reset game
        setTimeout(function() {
            location.reload();
        }, 2000);
    }
}

// Update time display
function updateTimeDisplay() {
    const hourFormatted = gameTime.hour.toString().padStart(2, '0');
    const minuteFormatted = gameTime.minute.toString().padStart(2, '0');
    document.getElementById('current-time').textContent = `Day ${gameTime.day} - ${hourFormatted}:${minuteFormatted}`;
}

// Update greeting based on time of day
function updateGreeting() {
    let greeting = "";
    
    if (gameTime.hour >= 5 && gameTime.hour < 12) {
        greeting = "Good Morning";
    } else if (gameTime.hour >= 12 && gameTime.hour < 18) {
        greeting = "Good Afternoon";
    } else if (gameTime.hour >= 18 && gameTime.hour < 22) {
        greeting = "Good Evening";
    } else {
        greeting = "Good Night";
    }
    
    document.getElementById('greeting').textContent = `${greeting}, ${player.name}!`;
}

// Update status bars
function updateStatusBars() {
    document.getElementById('money').textContent = player.money.toLocaleString();
    
    document.getElementById('happiness').textContent = player.happiness;
    document.getElementById('happiness-bar').style.width = `${player.happiness}%`;
    
    document.getElementById('hunger').textContent = player.hunger;
    document.getElementById('hunger-bar').style.width = `${player.hunger}%`;
    
    document.getElementById('hygiene').textContent = player.hygiene;
    document.getElementById('hygiene-bar').style.width = `${player.hygiene}%`;
    
    document.getElementById('energy').textContent = player.energy;
    document.getElementById('energy-bar').style.width = `${player.energy}%`;
    
    // Change color of bars
    updateBarColors('happiness-bar', player.happiness);
    updateBarColors('hunger-bar', player.hunger);
    updateBarColors('hygiene-bar', player.hygiene);
    updateBarColors('energy-bar', player.energy);
}

// Update bar colors
function updateBarColors(barId, value) {
    const bar = document.getElementById(barId);
    
    if (value <= 20) {
        bar.style.backgroundColor = "red";
    } else if (value <= 50) {
        bar.style.backgroundColor = "orange";
    } else if (value <= 80) {
        bar.style.backgroundColor = "yellowgreen";
    } else {
        bar.style.backgroundColor = "green";
    }
}

// Start the game
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
    
    // Setup and display the avatar
    const avatarDisplay = document.getElementById('avatar-display');
    avatarDisplay.src = player.avatar;
    avatarDisplay.style.display = 'block';
    
    // Update the status bars
    updateStatusBars();
    
    // Start game time
    startGameTime();
    
    // Set initial greeting
    updateGreeting();
    
    // Initialize location to Home
    moveTo('Home');
}

// Move to a specific location
function moveTo(location) {
    // Check if player has enough energy
    if (player.energy < 5) {
        alert("You don't have enough energy to move!");
        return;
    }
    
    // Hide all activity panels
    document.querySelectorAll('[id^="activity-"]').forEach(element => {
        if (element.id !== 'activity-details') {
            element.style.display = 'none';
        }
    });
    
    // Show the appropriate activity panel
    document.getElementById(`activity-${location.toLowerCase()}`).style.display = 'block';
    
    // Update avatar position based on the new location
    const avatar = document.getElementById('avatar-display');
    
    // Remove all position classes
    avatar.classList.remove('pos-home', 'pos-mountain', 'pos-lake', 'pos-temple', 'pos-beach');
    
    // Add the new position class
    avatar.classList.add(`pos-${location.toLowerCase()}`);
    
    // Update player location
    player.location = location;
    
    // Moving costs energy
    player.energy -= 5;
    updateStatusBars();
    checkGameOver();
}

// Activity functions
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
            
        case 'Play':
            if (player.location === 'Beach' || player.location === 'Lake') {
                player.happiness += 25;
                player.energy -= 20;
                player.hygiene -= 10;
                alert(`You enjoyed swimming at ${player.location}. +25 Happiness, -20 Energy, -10 Hygiene`);
            } else if (player.location === 'Mountain') {
                player.happiness += 30;
                player.energy -= 25;
                player.hunger -= 15;
                alert(`You hiked at the Mountain. +30 Happiness, -25 Energy, -15 Hunger`);
            } else {
                alert(`You can't play at ${player.location}!`);
                return;
            }
            break;
            
        case 'Sleep':
            if (player.location === 'Home') {
                player.energy = Math.min(100, player.energy + 50);
                // Advance time when sleeping
                gameTime.hour = Math.min(24, gameTime.hour + 6);
                updateTimeDisplay();
                updateGreeting();
                alert("You slept. +50 Energy, 6 hours passed");
            } else {
                alert("You can only sleep at home!");
                return;
            }
            break;
            
        case 'Take a Bath':
            if (player.location === 'Home') {
                player.hygiene = Math.min(100, player.hygiene + 40);
                player.energy -= 5;
                alert("You took a bath. +40 Hygiene, -5 Energy");
            } else {
                alert("You can only take a bath at home!");
                return;
            }
            break;
            
        case 'Buy Souvenir':
            if (player.location !== 'Home') {
                if (player.money >= 200000) {
                    player.money -= 200000;
                    player.happiness += 20;
                    alert(`You bought a souvenir at ${player.location}. -Rp200.000, +20 Happiness`);
                } else {
                    alert("You don't have enough money to buy a souvenir!");
                    return;
                }
            } else {
                alert("There are no souvenirs to buy at home!");
                return;
            }
            break;
            
        case 'Explore':
            if (player.location !== 'Home') {
                player.happiness += 25;
                player.energy -= 20;
                player.hygiene -= 10;
                alert(`You explored ${player.location}. +25 Happiness, -20 Energy, -10 Hygiene`);
            } else {
                alert("There's nothing new to explore at home!");
                return;
            }
            break;
            
        case 'Pray':
            if (player.location === 'Temple') {
                player.happiness += 30;
                player.energy += 10;
                alert("You prayed at the Temple. +30 Happiness, +10 Energy");
            } else {
                alert("You can only pray at the Temple!");
                return;
            }
            break;
    }
    
    // Ensure values don't go below 0
    player.happiness = Math.max(0, player.happiness);
    player.hunger = Math.max(0, player.hunger);
    player.hygiene = Math.max(0, player.hygiene);
    player.energy = Math.max(0, player.energy);
    
    // Ensure values don't exceed 100
    player.happiness = Math.min(100, player.happiness);
    player.hunger = Math.min(100, player.hunger);
    player.hygiene = Math.min(100, player.hygiene);
    player.energy = Math.min(100, player.energy);
    
    updateStatusBars();
    checkGameOver();
}
// Add event listeners for joystick movement
document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('up').addEventListener('click', function() {
        if (player.location === 'Home') moveTo('Mountain');
        else if (player.location === 'Lake') moveTo('Home');
        else if (player.location === 'Beach') moveTo('Temple');
        else if (player.location === 'Temple') moveTo('Mountain');
    });
    
    document.getElementById('down').addEventListener('click', function() {
        if (player.location === 'Home') moveTo('Lake');
        else if (player.location === 'Mountain') moveTo('Temple');
        else if (player.location === 'Temple') moveTo('Beach');
        else if (player.location === 'Beach') moveTo('Lake');
    });
    
    document.getElementById('left').addEventListener('click', function() {
        if (player.location === 'Mountain') moveTo('Home');
        else if (player.location === 'Temple') moveTo('Home');
        else if (player.location === 'Beach') moveTo('Lake');
    });
    
    document.getElementById('right').addEventListener('click', function() {
        if (player.location === 'Home') moveTo('Temple');
        else if (player.location === 'Lake') moveTo('Beach');
        else if (player.location === 'Temple') moveTo('Mountain');
    });
});