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
        },
        keyboard: {
            enabled: true,
            onlyInViewport: true,
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

// Start Game Time
function startGameTime() {
    timeInterval = setInterval(function() {
        gameTime.minute++;
        
        if (gameTime.minute >= 60) {
            gameTime.hour++;
            gameTime.minute = 0;

            if(gameTime.hour % 6 === 0) {
                decreasePlayerStatus();
            }
        }
        
        if (gameTime.hour >= 24) {
            gameTime.day++;
            gameTime.hour = 0;
        }
        
        updateTimeDisplay();
        updateGreeting();
    }, 1000 / TIME_MULTIPLIER);
}

// Player Status
function decreasePlayerStatus() {
    player.hunger = Math.max(0, player.hunger - 1);
    player.hygiene = Math.max(0, player.hygiene - 1);
    player.energy = Math.max(0, player.energy - 1);
    player.happiness = Math.max(0, player.happiness - 1);

    updateStatusBars();
    checkGameOver();
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
        
        const gameOverScreen = document.getElementById('game-over-screen');
        gameOverScreen.querySelectorAll('img').forEach(img => img.style.display = 'none');

        let avatarKey = '';
        if (player.avatar.includes('ayam')) avatarKey = 'chick';
        else if (player.avatar.includes('bebek')) avatarKey = 'duck';
        else if (player.avatar.includes('capi')) avatarKey = 'capy';

        // GIF Display
        const avatarImage = gameOverScreen.querySelector(`img[src*="${avatarKey}"]`);
        if (avatarImage) {
            avatarImage.style.display = 'block';

        }

        //  Game Over Display
        gameOverScreen.style.display = 'flex';
        const status = document.getElementById('status');
        status.style.display = 'none';
        document.getElementById('avatar-display').style.display = 'none';
        document.getElementById('joystick').style.display = 'none'; 
        document.getElementById('status').style.display = 'none';
        
        alert(`Game Over! ${player.name} died from ${cause}.`);

        // Reset game
        setTimeout(function() {
            location.reload();
        }, 4500);
    }
}

// Update time display
function updateTimeDisplay() {
    const hourFormatted = gameTime.hour.toString().padStart(2, '0');
    const minuteFormatted = gameTime.minute.toString().padStart(2, '0');
    document.getElementById('current-time').textContent = `Day ${gameTime.day} - ${hourFormatted}:${minuteFormatted}`;
}

// Greeting based on time of day
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
    
    document.getElementById('game-container').style.display = 'none';
    document.getElementById('main-container').style.display = 'grid';
    document.getElementById('status').style.display = 'flex';
    document.getElementById('game-interface').style.display = 'grid';
    document.getElementById('activity-details').style.display = 'flex';

    // Avatar Display
    const avatarDisplay = document.getElementById('avatar-display');
    avatarDisplay.src = player.avatar;
    avatarDisplay.style.display = 'block';

    updateStatusBars();
    startGameTime();
    updateGreeting();
    moveTo('Home', true);
}

// Move to a specific location
function moveTo(location, isInitial = false) {
    // Check if player has enough energy
    if (!isInitial && player.energy < 5) {
        alert("You don't have enough energy to move!");
        return;
    }
    
    // Hide all activity panels
    document.querySelectorAll('[id^="activity-"]').forEach(element => {
        if (element.id !== 'activity-details') {
            element.style.display = 'none';
        }
    });
    
    // appropriate activity panel
    document.getElementById(`activity-${location.toLowerCase()}`).style.display = 'block';
    
    // avatar position
    const avatar = document.getElementById('avatar-display');
    avatar.classList.remove('pos-home', 'pos-mountain', 'pos-lake', 'pos-temple', 'pos-beach');
    avatar.classList.add(`pos-${location.toLowerCase()}`);
    
    player.location = location;
    
    // Moving costs energy
    if (!isInitial) {
        player.energy -= 5;
        player.money -= 500000;
        if (player.happiness < 100) {
            player.happiness = Math.min(player.happiness + 5, 100);
        }
    }
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
            if (player.location === 'Beach') {
                player.happiness += 25;
                player.energy -= 20;
                player.hygiene -= 10;
                alert(`You enjoyed swimming at ${player.location}. +25 Happiness, -20 Energy, -10 Hygiene`);
            }
            if (player.location === 'Lake') {
                player.happiness += 25;
                player.energy -= 20;
                player.hygiene -= 10;
                alert(`You enjoyed fishing at ${player.location}. +25 Happiness, -20 Energy, -10 Hygiene`);
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
    
    // Values not under 0
    player.happiness = Math.max(0, player.happiness);
    player.hunger = Math.max(0, player.hunger);
    player.hygiene = Math.max(0, player.hygiene);
    player.energy = Math.max(0, player.energy);
    
    // Values not exceed 100
    player.happiness = Math.min(100, player.happiness);
    player.hunger = Math.min(100, player.hunger);
    player.hygiene = Math.min(100, player.hygiene);
    player.energy = Math.min(100, player.energy);
    
    updateStatusBars();
    checkGameOver();
}

// joystick movement
document.addEventListener('DOMContentLoaded', function() {
    const upButton = document.getElementById('up');
    const downButton = document.getElementById('down');
    const leftButton = document.getElementById('left');
    const rightButton = document.getElementById('right');

    function handleDirection(direction) {
        if (direction === 'up') {
            if (player.location === 'Home') moveTo('Mountain');
            else if (player.location === 'Lake') moveTo('Home');
            else if (player.location === 'Beach') moveTo('Temple');
            else if (player.location === 'Temple') moveTo('Mountain');
        } else if (direction === 'down') {
            if (player.location === 'Home') moveTo('Lake');
            else if (player.location === 'Mountain') moveTo('Temple');
            else if (player.location === 'Temple') moveTo('Beach');
            else if (player.location === 'Beach') moveTo('Lake');
        } else if (direction === 'left') {
            if (player.location === 'Mountain') moveTo('Home');
            else if (player.location === 'Temple') moveTo('Home');
            else if (player.location === 'Beach') moveTo('Lake');
        } else if (direction === 'right') {
            if (player.location === 'Home') moveTo('Temple');
            else if (player.location === 'Lake') moveTo('Beach');
            else if (player.location === 'Temple') moveTo('Mountain');
        }
    }
    upButton.addEventListener('click', function() {
        handleDirection('up');
    });
    downButton.addEventListener('click', function() {
        handleDirection('down');
    });
    leftButton.addEventListener('click', function() {
        handleDirection('left');
    });
    rightButton.addEventListener('click', function() {
        handleDirection('right');
    });
    document.addEventListener('keydown', function(event) {
        if (event.key === 'ArrowUp') {
            handleDirection('up');
        } else if (event.key === 'ArrowDown') {
            handleDirection('down');
        } else if (event.key === 'ArrowLeft') {
            handleDirection('left');
        } else if (event.key === 'ArrowRight') {
            handleDirection('right');
        }
    });
    function checkGameOver() {
        if (
          player.hunger <= 0 ||
          player.energy <= 0 ||
          player.happiness <= 0 ||
          player.hygiene <= 0
        ) {
          document.getElementById("game-over-screen").style.display = "flex";
         
          const activityButtons = document.querySelectorAll(".activity-panel button");
          activityButtons.forEach(btn => btn.disabled = true);
          
        }
      }
});

function performChores() {
    if (activity === "Clean") {
        hygiene -= 10; 
        energy -= 5;
        logActivity(`Did some chores. Hygiene decreased by ${hygienePenalty}.`);
    }
}

function travelTo(location) {
    let canIncreaseHappiness = hunger > 30 && energy > 30;

    if (location === lastVisitedLocation) {
        happiness -= 2;
        logActivity("Visiting the same place again... happiness decreased.");
    } else {
        if (canIncreaseHappiness) {
            happiness += 5;
            logActivity("Exploring a new place! Happiness increased.");
        } else {
            logActivity("Too hungry or sleepy to enjoy the trip.");
        }
    }

    lastVisitedLocation = location;
    energy -= 10;
}

