document.addEventListener('DOMContentLoaded', function() {
    // Check if mobile device
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    
    // Create falling hearts
    function createHearts() {
        const heartsContainer = document.getElementById('hearts-container');
        const heart = document.createElement('div');
        heart.className = 'heart';
        
        const emojis = [
            '❤️', '💖', '💗', '💓', '💞', '💕', '💘', '💝', '💟', '❣️',
            '💔', '🧡', '💛', '💚', '💙', '💜', '🤎', '🖤', '🤍', '💯',
            '💐', '🌸', '💮', '🏵️', '🌹', '🥀', '🌺', '🌻', '🌼', '🌷'
        ];
        
        heart.innerHTML = emojis[Math.floor(Math.random() * emojis.length)];
        
        heart.style.left = `${Math.random() * 100}%`;
        heart.style.fontSize = `${Math.random() * (isMobile ? 20 : 30) + 15}px`;
        heart.style.animationDuration = `${Math.random() * (isMobile ? 8 : 15) + 5}s`;
        heart.style.animationDelay = `${Math.random() * 3}s`;
        heart.style.opacity = `${Math.random() * 0.7 + 0.3}`;
        
        heartsContainer.appendChild(heart);
        
        heart.addEventListener('animationend', function() {
            this.remove();
            createHearts();
        });
    }

    // Initial hearts
    for (let i = 0; i < (isMobile ? 25 : 50); i++) {
        setTimeout(createHearts, i * 300);
    }

    // Audio player functionality
    const audioPlayer = document.getElementById('audioPlayer');
    const prevBtn = document.getElementById('prevBtn');
    const playPauseBtn = document.getElementById('playPauseBtn');
    const nextBtn = document.getElementById('nextBtn');
    
    const songs = [
        'mp3/1 (1).mp3',
        'mp3/1 (2).mp3'
    ];
    
    let currentSongIndex = 0;
    
    function playNextSong() {
        currentSongIndex = (currentSongIndex + 1) % songs.length;
        audioPlayer.src = songs[currentSongIndex];
        audioPlayer.play();
    }
    
    function playPreviousSong() {
        currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
        audioPlayer.src = songs[currentSongIndex];
        audioPlayer.play();
    }
    
    function togglePlayPause() {
        if (audioPlayer.paused) {
            audioPlayer.play();
            playPauseBtn.textContent = '⏸';
        } else {
            audioPlayer.pause();
            playPauseBtn.textContent = '⏯';
        }
    }
    
    prevBtn.addEventListener('click', playPreviousSong);
    nextBtn.addEventListener('click', playNextSong);
    playPauseBtn.addEventListener('click', togglePlayPause);
    
    // Autoplay audio on first interaction
    document.body.addEventListener('click', function initAudio() {
        audioPlayer.play().catch(e => console.log('Autoplay prevented:', e));
        document.body.removeEventListener('click', initAudio);
    }, { once: true });
    
    // Main floating photos animation control
    const floatingPhotos = document.querySelectorAll('.floating-photo');
    let activePhotos = 0;
    const maxActivePhotos = 5;

    function setupFloatingPhoto(photo, index) {
        const randomLeft = Math.random() * 85 + 5;
        photo.style.left = `${randomLeft}%`;
        
        const startDelay = index * 3000 + Math.random() * 4000;
        photo.style.animationDelay = `${startDelay}ms`;
        
        const duration = 20000 + Math.random() * 10000;
        photo.style.animationDuration = `${duration}ms`;
        
        photo.addEventListener('animationend', function() {
            activePhotos--;
            setTimeout(() => restartPhoto(photo), 2000);
        });
        
        setTimeout(() => {
            photo.style.opacity = '0.8';
            activePhotos++;
        }, startDelay);
    }

    function restartPhoto(photo) {
        if (activePhotos >= maxActivePhotos) return;
        
        const randomLeft = Math.random() * 85 + 5;
        photo.style.left = `${randomLeft}%`;
        
        const duration = 20000 + Math.random() * 10000;
        photo.style.animationDuration = `${duration}ms`;
        
        // Reset animation
        photo.style.animation = 'none';
        void photo.offsetWidth;
        photo.style.animation = 'gentleFall linear forwards';
        
        activePhotos++;
    }

    // Initialize main photos
    floatingPhotos.forEach((photo, index) => {
        setupFloatingPhoto(photo, index);
    });

    // Additional falling elements functions
    function createFallingEmoji() {
        const container = document.getElementById('extra-elements-container');
        const emoji = document.createElement('div');
        emoji.className = 'falling-element emoji-element';
        
        const emojis = ['❤️', '💖', '💗', '💓', '💞', '💕', '💘', '💝', '💟', '❣️', '🌸', '🌹', '🌺', '🌻', '🌼', '🌷', '✨', '🎀', '💍', '👑'];
        emoji.textContent = emojis[Math.floor(Math.random() * emojis.length)];
        
        emoji.style.left = `${Math.random() * 100}%`;
        emoji.style.fontSize = `${Math.random() * 20 + 20}px`;
        emoji.style.animationDuration = `${Math.random() * 15 + 10}s`;
        emoji.style.animationDelay = `${Math.random() * 5}s`;
        
        container.appendChild(emoji);
        
        emoji.addEventListener('animationend', function() {
            this.remove();
            createFallingEmoji();
        });
    }

    function createFallingPhoto() {
        const container = document.getElementById('extra-elements-container');
        const photo = document.createElement('img');
        photo.className = 'falling-element small-photo';
        
        const photos = [
            'assets/cheat (1).JPG',
            'assets/cheat (2).JPG',
            'assets/cheat (3).JPG',
            'assets/cheat.JPG',
            'assets/IMG_1762.JPG',
            'assets/IMG_1764.JPG',
            'assets/IMG_1961.JPG',
            'assets/IMG_1962.JPG',
            'assets/IMG_2243.JPG',
            'assets/IMG_2254.JPG',
            'assets/IMG_2255.JPG',
            'assets/lihor.JPG'
        ];
        
        photo.src = photos[Math.floor(Math.random() * photos.length)];
        photo.style.left = `${Math.random() * 100}%`;
        photo.style.animationDuration = `${Math.random() * 20 + 15}s`;
        photo.style.animationDelay = `${Math.random() * 5}s`;
        photo.style.transform = `rotate(${Math.random() * 20 - 10}deg)`;
        
        container.appendChild(photo);
        
        photo.addEventListener('animationend', function() {
            this.remove();
            createFallingPhoto();
        });
        
        photo.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.1)';
            this.style.zIndex = '100';
            this.style.animationPlayState = 'paused';
        });
        
        photo.addEventListener('mouseleave', function() {
            this.style.transform = '';
            this.style.zIndex = '';
            this.style.animationPlayState = 'running';
        });
    }

    // Initialize additional falling elements
    function initExtraElements() {
        // Create 30 emojis
        for (let i = 0; i < 30; i++) {
            setTimeout(createFallingEmoji, i * 300);
        }
        
        // Create 20 small photos
        for (let i = 0; i < 20; i++) {
            setTimeout(createFallingPhoto, i * 500);
        }
    }

    initExtraElements();

    // Handle window resize
    let resizeTimer;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(function() {
            floatingPhotos.forEach(photo => {
                photo.style.animation = 'none';
                void photo.offsetWidth;
                photo.style.animation = 'gentleFall linear forwards';
            });
        }, 250);
    });

    // Handle screen size changes
    function handleResize() {
        const currentIsMobile = window.innerWidth <= 768;
        if (currentIsMobile !== isMobile) {
            window.location.reload();
        }
    }
    
    window.addEventListener('resize', handleResize);
});