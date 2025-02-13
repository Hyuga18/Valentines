let messages = ["Please?", "Give me a chance!", "Are you sure?", "Think again!", "You might regret this!", "One last chance!", "Pretty please?", "Don’t break my heart 💔"];
let noCount = 0;
let noButton = document.getElementById("no");
let yesButton = document.getElementById("yes");
let messageText = document.getElementById("message");

const backgroundMusic = new Audio('your-music-file.mp3'); // Ensure the path is correct
backgroundMusic.loop = true;

noButton.addEventListener("click", rejectLove);
yesButton.addEventListener("click", acceptLove);

function rejectLove() {
    if (noCount < messages.length) {
        messageText.innerText = messages[noCount];
        noCount++;
        noButton.style.transform = `scale(${1 - noCount * 0.1})`;
        yesButton.style.transform = `scale(${1 + noCount * 0.1})`;
        messageText.style.animation = 'shake 0.5s';
        showTextBubble("Bakit ayaw mo na ba ako?");
    }
    if (noCount === messages.length) {
        noButton.style.display = "none";
    }
}

function acceptLove() {
    document.getElementById("valentine").innerHTML = `
        <img src="https://media1.tenor.com/m/aEWN44So2ckAAAAC/kiss-kisses.gif" class="gif">
        <div class="question">YAYAYYAYAYAYAY Alam kong hindi ka nag hesitate na pindutin yan yes AHAHAHAH❤️</div>
    `;
    launchConfetti();
    startHeartRain();
    playBackgroundMusic(); // Play background music when "Yes" button is clicked
    setTimeout(() => {
        const folderContainer = document.getElementById('folder-container');
        if (folderContainer) {
            folderContainer.classList.remove('hidden');
        }
    }, 5000);
}

function showTextBubble(message) {
    const bubble = document.createElement('div');
    bubble.className = 'text-bubble';
    bubble.innerText = message;
    document.body.appendChild(bubble);

    const rect = noButton.getBoundingClientRect();
    bubble.style.top = `${rect.bottom + 10}px`; // Position below the "No" button
    bubble.style.left = `${rect.left + rect.width / 2 - bubble.offsetWidth / 2}px`;

    setTimeout(() => {
        bubble.remove();
    }, 3000);
}

function launchConfetti() {
    var duration = 3 * 1000;
    var end = Date.now() + duration;

    (function frame() {
        confetti({
            particleCount: 5,
            angle: 60,
            spread: 55,
            origin: { x: 0 }
        });
        confetti({
            particleCount: 5,
            angle: 120,
            spread: 55,
            origin: { x: 1 }
        });

        if (Date.now() < end) {
            requestAnimationFrame(frame);
        }
    }());
}

function startHeartRain() {
    const heartContainer = document.getElementById('heart-container');
    setInterval(() => {
        const heart = document.createElement('div');
        heart.className = 'heart';
        heart.innerText = '❤️';
        heart.style.left = `${Math.random() * 100}vw`;
        heart.style.animationDuration = `${Math.random() * 2 + 3}s`;
        heartContainer.appendChild(heart);
        setTimeout(() => {
            heart.remove();
        }, 5000);
    }, 300);
}

function playBackgroundMusic() {
    backgroundMusic.play().catch(error => {
      console.error('Error playing background music:', error);
    });
}

document.addEventListener('DOMContentLoaded', () => {
  const pinkboard = document.getElementById('pinkboard');
  const ctx = pinkboard.getContext('2d');
  const hearts = [];
  const colors = ['#ff69b4', '#ff1493', '#ff6ec7'];

  function createHeart() {
    const x = Math.random() * pinkboard.width;
    const y = pinkboard.height;
    const size = Math.random() * 20 + 10;
    const color = colors[Math.floor(Math.random() * colors.length)];
    hearts.push({ x, y, size, color });
  }

  function drawHearts() {
    ctx.clearRect(0, 0, pinkboard.width, pinkboard.height);
    hearts.forEach((heart, index) => {
      ctx.fillStyle = heart.color;
      ctx.beginPath();
      ctx.arc(heart.x, heart.y, heart.size, 0, Math.PI * 2);
      ctx.fill();
      heart.y -= 2;
      if (heart.y < 0) {
        hearts.splice(index, 1);
      }
    });
  }

  function animate() {
    drawHearts();
    requestAnimationFrame(animate);
  }

  setInterval(createHeart, 200);
  animate();

  // Sound effects
  const popSound = new Audio('pop-39222.mp3');
  const chimeSound = new Audio('chime-sound-7143.mp3');
  const yeheySound = new Audio('yehey.mp3');

  backgroundMusic.addEventListener('canplaythrough', () => {
    console.log('Background music can play through');
  });

  backgroundMusic.addEventListener('error', (e) => {
    console.error('Error loading background music:', e);
  });

  chimeSound.play();

  document.getElementById('yes').addEventListener('click', () => {
    popSound.play();
    yeheySound.play();
    const message = document.getElementById('message');
    if (message) {
      message.innerHTML = 'Yay! You made my day! 💖';
      const img = document.createElement('img');
      img.src = 'giphy.gif';
      img.alt = 'Happy bear hugging a heart';
      img.style.width = '150px';
      message.appendChild(img);
      playBackgroundMusic();
    }
  });

  document.getElementById('no').addEventListener('click', () => {
    popSound.play();
    showTextBubble("Bakit ayaw mo na ba ako?");
    playBackgroundMusic();
  });

  document.getElementById('folder-button').addEventListener('click', () => {
    const hiddenMessage = document.getElementById('hidden-message');
    hiddenMessage.classList.remove('hidden');
  });

  function onResize() {
    pinkboard.width = window.innerWidth;
    pinkboard.height = window.innerHeight;
  }
  window.addEventListener('resize', onResize);
  onResize();
});