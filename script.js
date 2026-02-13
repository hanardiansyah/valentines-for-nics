// ===== Countdown Timer =====
function setupCountdown() {
    const valentinesDay = new Date('February 14, 2026 00:00:00').getTime();

    function updateCountdown() {
        const now = new Date().getTime();
        const distance = valentinesDay - now;

        if (distance < 0) {
            // Valentine's Day has arrived or passed
            document.getElementById('days').textContent = '💕';
            document.getElementById('hours').textContent = '💕';
            document.getElementById('minutes').textContent = '💕';
            document.getElementById('seconds').textContent = '💕';
            document.querySelector('.countdown-label').textContent = "It's Valentine's Day! 💝";
            return;
        }

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        document.getElementById('days').textContent = days;
        document.getElementById('hours').textContent = hours;
        document.getElementById('minutes').textContent = minutes;
        document.getElementById('seconds').textContent = seconds;
    }

    updateCountdown();
    setInterval(updateCountdown, 1000);
}

// ===== Floating Hearts Background =====
function createFloatingHearts() {
    const container = document.getElementById('floatingHearts');
    const hearts = ['💕', '💗', '💖', '💝', '❤️', '🩷'];

    setInterval(() => {
        const heart = document.createElement('div');
        heart.className = 'floating-heart';
        heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
        heart.style.left = Math.random() * 100 + 'vw';
        heart.style.animationDuration = (Math.random() * 3 + 4) + 's';
        heart.style.fontSize = (Math.random() * 15 + 15) + 'px';
        container.appendChild(heart);

        setTimeout(() => heart.remove(), 7000);
    }, 500);
}

// ===== Escaping No Button =====
function setupEscapingNoButton() {
    const noBtn = document.getElementById('noBtn');
    const questionBox = document.querySelector('.question-box');
    const hintText = document.getElementById('hintText');
    const hints = [
        "hehe, you can't click that! 😜",
        "nice try! but no isn't an option 💕",
        "he button is shy! try Yes instead 🥰",
        "oops! wrong button 😆",
        "that button doesn't work! 💗",
        "come on, you know the answer! 💕",
        "yes is the only way! 🎉",
        "i knew you'd choose yes! right? 😊"
    ];
    let hintIndex = 0;

    function moveButton() {
        const boxRect = questionBox.getBoundingClientRect();
        const btnRect = noBtn.getBoundingClientRect();

        // Calculate random position within the question box area
        const maxX = boxRect.width - btnRect.width - 40;
        const maxY = 150;

        const randomX = Math.random() * maxX - maxX / 2;
        const randomY = Math.random() * maxY - maxY / 2;

        noBtn.style.transform = `translate(${randomX}px, ${randomY}px)`;

        // Show hint
        hintText.textContent = hints[hintIndex % hints.length];
        hintIndex++;
    }

    noBtn.addEventListener('mouseenter', moveButton);
    noBtn.addEventListener('touchstart', (e) => {
        e.preventDefault();
        moveButton();
    });
    noBtn.addEventListener('click', (e) => {
        e.preventDefault();
        moveButton();
    });
}

// ===== Yes Button Click - Celebration =====
function setupYesButton() {
    const yesBtn = document.getElementById('yesBtn');
    const celebration = document.getElementById('celebration');

    yesBtn.addEventListener('click', () => {
        celebration.classList.add('active');
        document.body.style.overflow = 'hidden';
        createConfetti();

        // Play celebration after a brief moment
        setTimeout(() => {
            document.body.style.overflow = 'auto';
        }, 5000);
    });
}

// ===== Confetti Animation =====
function createConfetti() {
    const container = document.getElementById('confettiContainer');
    const colors = ['#FF6B9D', '#E91E63', '#9B59B6', '#FFD700', '#FF4757', '#FFC8DD', '#FFAFCC'];
    const emojis = ['💕', '💗', '💖', '💝', '❤️', '🎉', '✨', '🩷'];

    for (let i = 0; i < 150; i++) {
        setTimeout(() => {
            const confetti = document.createElement('div');
            confetti.className = 'confetti';

            // Random between emoji or colored square
            if (Math.random() > 0.5) {
                confetti.textContent = emojis[Math.floor(Math.random() * emojis.length)];
                confetti.style.fontSize = (Math.random() * 20 + 15) + 'px';
                confetti.style.background = 'none';
            } else {
                confetti.style.background = colors[Math.floor(Math.random() * colors.length)];
                confetti.style.borderRadius = Math.random() > 0.5 ? '50%' : '0';
            }

            confetti.style.left = Math.random() * 100 + 'vw';
            confetti.style.animationDuration = (Math.random() * 2 + 2) + 's';
            confetti.style.animationDelay = (Math.random() * 0.5) + 's';

            container.appendChild(confetti);

            setTimeout(() => confetti.remove(), 4000);
        }, i * 30);
    }
}

// ===== Catch the Hearts Game =====
let catchScore = 0;
let catchTimer = 30;
let catchInterval = null;
let spawnInterval = null;

function setupCatchGame() {
    const startBtn = document.getElementById('startCatchGame');
    const board = document.getElementById('catchBoard');
    const scoreDisplay = document.getElementById('catchScore');
    const timerDisplay = document.getElementById('catchTimer');

    startBtn.addEventListener('click', () => {
        // Reset
        catchScore = 0;
        catchTimer = 30;
        scoreDisplay.textContent = '0';
        timerDisplay.textContent = '30';
        board.innerHTML = '';
        startBtn.disabled = true;
        startBtn.textContent = 'Playing... 💕';

        // Timer
        catchInterval = setInterval(() => {
            catchTimer--;
            timerDisplay.textContent = catchTimer;

            if (catchTimer <= 0) {
                endCatchGame();
            }
        }, 1000);

        // Spawn hearts
        spawnInterval = setInterval(() => {
            spawnHeart();
        }, 600);
    });

    function spawnHeart() {
        const heart = document.createElement('div');
        heart.className = 'catch-heart';
        const hearts = ['💕', '💗', '💖', '💝', '❤️'];
        heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];

        const boardRect = board.getBoundingClientRect();
        const x = Math.random() * (boardRect.width - 40);
        const y = Math.random() * (boardRect.height - 40);

        heart.style.left = x + 'px';
        heart.style.top = y + 'px';

        heart.addEventListener('click', () => {
            catchScore++;
            scoreDisplay.textContent = catchScore;
            heart.style.transform = 'scale(1.5)';
            heart.style.opacity = '0';
            setTimeout(() => heart.remove(), 200);
        });

        board.appendChild(heart);

        // Remove heart after 2 seconds if not clicked
        setTimeout(() => {
            if (heart.parentNode) {
                heart.style.opacity = '0';
                setTimeout(() => heart.remove(), 200);
            }
        }, 2000);
    }

    function endCatchGame() {
        clearInterval(catchInterval);
        clearInterval(spawnInterval);
        board.innerHTML = '';

        let message = '';
        if (catchScore >= 30) {
            message = `WOW! ${catchScore} hearts! You're amazing, Nics! 💕🎉`;
        } else if (catchScore >= 20) {
            message = `Great job! ${catchScore} hearts! So sweet! 💕`;
        } else if (catchScore >= 10) {
            message = `Nice! ${catchScore} hearts! Pretty good! 💗`;
        } else {
            message = `${catchScore} hearts! Try again, my love! 💕`;
        }

        board.innerHTML = `<div style="display:flex;align-items:center;justify-content:center;height:100%;font-size:1.3rem;color:#E91E63;padding:20px;text-align:center;">${message}</div>`;

        startBtn.disabled = false;
        startBtn.textContent = 'Play Again! 💕';
    }
}

// ===== Love Quiz Game =====
const quizQuestions = [
    {
        question: "1. What's my favorite food? 🍜",
        options: ["Ramen", "Sushi", "Shawarma", "Pasta"],
        correct: 1
    },
    {
        question: "2. What food did u order when finally eating properly? 🍔",
        options: ["Burger", "Pizza", "Shawarma x2", "Sausage roll only"],
        correct: 2
    },
    {
        question: "3. How far is the distance from PH to ID? 📏",
        options: ["1,200 km", "2,000 km", "2,800+ km", "Same timezone so it doesn't count"],
        correct: 2
    },
    {
        question: "4. What do I always remind you to do? 💭",
        options: ["Sleep early", "Drink warm water", "TAKE CARE OF URSELF PLS", "Stop watching mukbang"],
        correct: 2
    },
    {
        question: "5. How do we usually end our chats? 💬",
        options: ["Formal goodbye", "Seen only", "Mwaaa / hugs / huhu", "Voice notes"],
        correct: 2
    },
    {
        question: "6. What kind of place do we imagine living in? 🏡",
        options: ["Super quiet countryside", "Somewhere random", "Stable and fun", "Nowhere yet"],
        correct: 2
    },
    {
        question: "7. What matters more to us right now? 💭",
        options: ["Labels", "Rushing", "Forcing things", "Feeling safe & choosing each other slowly"],
        correct: 3
    },
    {
        question: "8. What kind of person is u? 🍬",
        options: ["Savory forever", "Sweet tooth 😌", "Depends on mood", "U LOVE ALL OF FOOD (but not sitaw)"],
        correct: 3
    },
    {
        question: "9. Dessert u'll never get tired of: 🍰",
        options: ["Chocolate chip cookies", "Ube cake", "me", "All of the above"],
        correct: 3
    },
    {
        question: "10. What sector do I work in? 💼",
        options: ["IT", "Finance", "Design", "Mystery era"],
        correct: 0
    },
    {
        question: "11. Where am I actually from? 📍",
        options: ["Jakarta", "Depok", "Bogor", "Bandung"],
        correct: 2
    },
    {
        question: "12. When did we match? 💕",
        options: ["January 1st", "February 1st", "February 14th", "December 25th"],
        correct: 1
    },
    {
        question: "13. Who are the cutest person? 🥰",
        options: ["me", "me", "me", "me"],
        correctAll: true
    }
];

let currentQuestion = 0;
let quizScore = 0;

function setupQuiz() {
    const startBtn = document.getElementById('startQuiz');
    const questionDiv = document.getElementById('quizQuestion');
    const optionsDiv = document.getElementById('quizOptions');
    const resultDiv = document.getElementById('quizResult');

    startBtn.addEventListener('click', startQuiz);

    function startQuiz() {
        currentQuestion = 0;
        quizScore = 0;
        resultDiv.textContent = '';
        startBtn.style.display = 'none';
        showQuestion();
    }

    function showQuestion() {
        if (currentQuestion >= quizQuestions.length) {
            endQuiz();
            return;
        }

        const q = quizQuestions[currentQuestion];
        questionDiv.textContent = q.question;
        optionsDiv.innerHTML = '';

        q.options.forEach((option, index) => {
            const btn = document.createElement('button');
            btn.className = 'quiz-option';
            btn.textContent = option;
            btn.addEventListener('click', () => selectAnswer(index, btn));
            optionsDiv.appendChild(btn);
        });
    }

    function selectAnswer(index, btn) {
        const q = quizQuestions[currentQuestion];
        const options = optionsDiv.querySelectorAll('.quiz-option');

        options.forEach(opt => opt.style.pointerEvents = 'none');

        if (q.correctAll || index === q.correct) {
            btn.classList.add('correct');
            quizScore++;
        } else {
            btn.classList.add('wrong');
            options[q.correct].classList.add('correct');
        }

        setTimeout(() => {
            currentQuestion++;
            showQuestion();
        }, 1500);
    }

    function endQuiz() {
        questionDiv.textContent = '';
        optionsDiv.innerHTML = '';

        let message = '';
        const percentage = (quizScore / quizQuestions.length) * 100;

        if (percentage === 100) {
            message = `PERFECT! ${quizScore}/${quizQuestions.length}! 🎉💕 You know us so well, Nics!`;
        } else if (percentage >= 80) {
            message = `Amazing! ${quizScore}/${quizQuestions.length}! 💕 You're so sweet!`;
        } else if (percentage >= 60) {
            message = `Good job! ${quizScore}/${quizQuestions.length}! 💗 Not bad at all!`;
        } else {
            message = `${quizScore}/${quizQuestions.length}! 💕 Let's make more memories together!`;
        }

        resultDiv.textContent = message;
        startBtn.textContent = 'Play Again! 💕';
        startBtn.style.display = 'inline-block';
    }
}

// ===== Typewriter Effect for Letter (Optional) =====
function typewriterEffect() {
    const letterContent = document.getElementById('letterContent');
    const paragraphs = letterContent.querySelectorAll('p');

    // This is optional - can be enabled for a nice effect
    // Currently disabled to show full letter immediately
}

// ===== Smooth Scroll for Navigation =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// ===== Zodiac Compatibility Animation =====
function setupZodiacMeter() {
    const fill = document.getElementById('compatibilityFill');
    const percent = document.getElementById('compatibilityPercent');

    if (!fill || !percent) return;

    let animated = false;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !animated) {
                animated = true;
                animateCompatibility();
            }
        });
    }, { threshold: 0.2 });

    const zodiacSection = document.getElementById('zodiac');
    if (zodiacSection) {
        observer.observe(zodiacSection);
    }

    function animateCompatibility() {
        const targetPercent = 100;
        let current = 0;
        const duration = 2000;
        const increment = targetPercent / (duration / 16);

        const timer = setInterval(() => {
            current += increment;
            if (current >= targetPercent) {
                current = targetPercent;
                clearInterval(timer);
            }
            fill.style.width = current + '%';
            percent.textContent = Math.round(current) + '%';
        }, 16);
    }
}

// ===== Movie Picker =====
function setupMoviePicker() {
    const movies = [
        { title: "Past Lives", genre: "romance", emoji: "🌊", desc: "two childhood sweethearts reconnect decades later — beautifully heartbreaking and so so tender", rating: 5 },
        { title: "Your Name (Kimi no Na wa)", genre: "animated", emoji: "🌌", desc: "two souls connected across time and distance — sounds familiar right?", rating: 5 },
        { title: "La La Land", genre: "romance", emoji: "🌃", desc: "dreamers in love, jazz, dancing, and the prettiest sunset scenes ever", rating: 5 },
        { title: "Everything Everywhere All at Once", genre: "romance", emoji: "🥯", desc: "multiverse chaos but at its core? the most beautiful love story ever told", rating: 5 },
        { title: "Anyone But You", genre: "romcom", emoji: "✈️", desc: "fake dating in australia, chaotic energy, and sydney sweeney being iconic", rating: 4 },
        { title: "Weathering with You", genre: "animated", emoji: "🌧️", desc: "a boy, a girl who controls weather, and tokyo in the rain", rating: 5 },
        { title: "To All the Boys I've Loved Before", genre: "romcom", emoji: "💌", desc: "love letters gone wrong (or very very right)", rating: 4 },
        { title: "Crazy Rich Asians", genre: "romcom", emoji: "💎", desc: "gorgeous fashion, family drama, and mahjong power moves", rating: 5 },
        { title: "Suzume", genre: "animated", emoji: "🚪", desc: "makoto shinkai's latest — a girl, a magical chair, and doors to disaster", rating: 5 },
        { title: "The Half of It", genre: "romcom", emoji: "📝", desc: "a shy girl writes love letters for someone else and feelings get complicated", rating: 4 },
        { title: "Always Be My Maybe", genre: "romcom", emoji: "🎸", desc: "childhood best friends to lovers with keanu reeves as the funniest cameo ever", rating: 4 },
        { title: "Set It Up", genre: "romcom", emoji: "📱", desc: "two assistants matchmaking their bosses and accidentally falling for each other", rating: 4 },
        { title: "Red, White & Royal Blue", genre: "romcom", emoji: "👑", desc: "the president's son falls for a british prince — cute, chaotic, and heartwarming", rating: 4 },
        { title: "Purple Hearts", genre: "romance", emoji: "💜", desc: "a fake marriage that turns into something way too real", rating: 4 },
        { title: "The Boy and the Heron", genre: "animated", emoji: "🦅", desc: "miyazaki's dreamlike masterpiece — visually stunning and emotionally deep", rating: 5 },
        { title: "Look Back", genre: "animated", emoji: "✏️", desc: "two girls bonding over drawing manga — short, sweet, and will make u cry", rating: 5 },
        { title: "Ticket to Paradise", genre: "romcom", emoji: "🏝️", desc: "george clooney and julia roberts trying to stop their daughter's wedding in bali", rating: 4 },
        { title: "Five Feet Apart", genre: "romance", emoji: "🏥", desc: "two people who can never touch falling deeply in love — grab tissues bb", rating: 4 },
        { title: "The Sun Is Also a Star", genre: "romance", emoji: "🌟", desc: "one magical day in NYC where two strangers fall for each other against all odds", rating: 4 },
        { title: "Your Place or Mine", genre: "romcom", emoji: "🏠", desc: "best friends swap lives for a week and realize what they really want", rating: 4 },
    ];

    let currentGenre = 'all';
    let isSpinning = false;

    const spinBtn = document.getElementById('spinMovieBtn');
    const rouletteStrip = document.getElementById('rouletteStrip');
    const movieResult = document.getElementById('movieResult');
    const moviePoster = document.getElementById('moviePoster');
    const movieTitle = document.getElementById('movieTitle');
    const movieDesc = document.getElementById('movieDesc');
    const movieGenreTag = document.getElementById('movieGenreTag');
    const movieRating = document.getElementById('movieRating');
    const genreBtns = document.querySelectorAll('.genre-btn');

    if (!spinBtn) return;

    // Genre filter
    genreBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            genreBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentGenre = btn.dataset.genre;
        });
    });

    // Spin logic
    spinBtn.addEventListener('click', () => {
        if (isSpinning) return;
        isSpinning = true;
        spinBtn.classList.add('spinning');

        const filtered = currentGenre === 'all'
            ? movies
            : movies.filter(m => m.genre === currentGenre);

        if (filtered.length === 0) {
            isSpinning = false;
            spinBtn.classList.remove('spinning');
            return;
        }

        // Pick random winner
        const winner = filtered[Math.floor(Math.random() * filtered.length)];

        // Build roulette items — show ~20 cycling through before landing on winner
        const totalSpins = 22;
        const items = [];
        for (let i = 0; i < totalSpins; i++) {
            const randomMovie = filtered[Math.floor(Math.random() * filtered.length)];
            items.push(randomMovie);
        }
        items.push(winner); // final item is the winner

        // Render roulette strip
        rouletteStrip.innerHTML = items.map(m =>
            `<div class="roulette-item">${m.emoji} ${m.title}</div>`
        ).join('');

        // Animate scroll
        const itemHeight = 60;
        const totalDistance = items.length * itemHeight - itemHeight;
        let start = null;
        const duration = 3000;

        // Reset position
        rouletteStrip.style.transition = 'none';
        rouletteStrip.style.transform = 'translateY(0)';
        movieResult.classList.remove('revealed');

        // Easing function — ease out cubic
        function easeOutCubic(t) {
            return 1 - Math.pow(1 - t, 3);
        }

        function animateSpin(timestamp) {
            if (!start) start = timestamp;
            const elapsed = timestamp - start;
            const progress = Math.min(elapsed / duration, 1);
            const eased = easeOutCubic(progress);

            const currentY = eased * totalDistance;
            rouletteStrip.style.transform = `translateY(-${currentY}px)`;

            if (progress < 1) {
                requestAnimationFrame(animateSpin);
            } else {
                // Landed! Show movie result
                isSpinning = false;
                spinBtn.classList.remove('spinning');

                moviePoster.textContent = winner.emoji;
                movieTitle.textContent = winner.title;
                movieDesc.textContent = winner.desc;
                movieGenreTag.textContent = winner.genre;
                movieRating.innerHTML = '<span class="stars">' + '⭐'.repeat(winner.rating) + '</span>';
                movieResult.classList.add('revealed');
            }
        }

        requestAnimationFrame(animateSpin);
    });
}

// ===== Bucket List =====
function setupBucketList() {
    const items = document.querySelectorAll('.bucket-item');
    const countEl = document.getElementById('bucketCount');
    const totalEl = document.getElementById('bucketTotal');
    const fillEl = document.getElementById('bucketFill');

    if (!items.length || !countEl) return;

    totalEl.textContent = items.length;

    function updateProgress() {
        const checked = document.querySelectorAll('.bucket-item.checked').length;
        countEl.textContent = checked;
        fillEl.style.width = (checked / items.length * 100) + '%';
    }

    items.forEach(item => {
        item.addEventListener('click', () => {
            item.classList.toggle('checked');
            updateProgress();
        });
    });
}

// ===== Initialize Everything =====
document.addEventListener('DOMContentLoaded', () => {
    setupCountdown();
    createFloatingHearts();
    setupEscapingNoButton();
    setupYesButton();
    setupCatchGame();
    setupQuiz();
    setupZodiacMeter();
    setupMoviePicker();
    setupBucketList();
    setupOpenWhen();
});

// ===== Open When Letters =====
function setupOpenWhen() {
    window.openLetter = function (type) {
        const modal = document.getElementById('letterModal');
        const modalTitle = document.getElementById('modalTitle');
        const modalBody = document.getElementById('modalBody');
        const modalIcon = document.getElementById('modalIcon');

        const letters = {
            'miss': {
                title: "Open when you miss me...",
                icon: "🥺",
                content: "bb, whenever you miss me, just remember that i'm missing you too, probably 10x more.\n\nlook at the moon? i'm looking at it too.\nclose your eyes? i'm right there in your heart.\n\ndistance is just a test to see how far love can travel. and ours? it's traveling miles and miles every single second.\n\ni love you. i'm here. always. 💕"
            },
            'sad': {
                title: "Open when you're sad...",
                icon: "😢",
                content: "i hate that i can't be there to hug you right now.\n\nbut please know that your feelings are valid. it's okay to be sad. it's okay to cry.\n\ntake a deep breath for me, okay? \nremember that you are so loved, so strong, and this feeling is only temporary.\n\ni'm sending you the biggest, warmest virtual hug ever. 🫂💖"
            },
            'tired': {
                title: "Open when you're tired...",
                icon: "😴",
                content: "you've been working so hard, haven't you?\n\ni'm so proud of you. truly.\n\nbut now... it's time to rest. put your phone down (after reading this!), close your eyes, and let yourself drift off.\n\ni'll be the first thing you see when you check your phone in the morning.\n\nsleep tight, my love. sweet dreams. 🌙💤"
            },
            'happy': {
                title: "Open when you're happy...",
                icon: "🥳",
                content: "YAYYY!!! i love seeing you happy! tell me everything!!!\n\nyour happiness is literally my favorite thing in the world. \n\ncelebrate it! soak it in! you deserve every bit of this joy.\n\nwish i was there to high-five (or kiss) you, but for now... THIS VIRTUAL CHEER IS FOR YOU! 🎉✨💖"
            },
            'confused': {
                title: "Open when you feel confused...",
                icon: "😵‍💫",
                content: "life gets messy sometimes, doesn't it?\n\nit's okay not to have all the answers right now. it's okay to feel lost.\n\nremember: we don't have to figure everything out today. take it one step at a time.\n\nand hey, you don't have to face the confusion alone. i'm right here. text me, call me. let's untangle it together. 🧶💕"
            },
            'boost': {
                title: "Open when you need a boost...",
                icon: "🚀",
                content: "stop right there 🛑\n\ndoubting yourself? NOT ALLOWED.\n\nyou are capable. you are smart. you are beautiful inside and out.\n\nlook at how far you've come! you can handle whatever is in front of you. i believe in you so much it's crazy.\n\nnow go out there and show them (and yourself) what you're made of! 💪😎💖"
            }
        };

        const letter = letters[type];
        if (letter) {
            modalTitle.textContent = letter.title;
            modalBody.textContent = letter.content;
            modalIcon.textContent = letter.icon;
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    };

    window.closeLetter = function () {
        const modal = document.getElementById('letterModal');
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
    };

    // Close on outside click
    const modal = document.getElementById('letterModal');
    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeLetter();
            }
        });
    }
}
