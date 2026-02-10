document.addEventListener('DOMContentLoaded', () => {
    const proposalSection = document.getElementById('proposal-section');
    const successSection = document.getElementById('success-section');
    const yesBtn = document.getElementById('yes-btn');
    const noBtn = document.getElementById('no-btn');

    // Confetti function
    const launchConfetti = () => {
        const duration = 3000;
        const animationEnd = Date.now() + duration;
        const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

        const random = (min, max) => Math.random() * (max - min) + min;

        const interval = setInterval(function () {
            const timeLeft = animationEnd - Date.now();

            if (timeLeft <= 0) {
                return clearInterval(interval);
            }

            const particleCount = 50 * (timeLeft / duration);
            // since particles fall down, start a bit higher than random
            confetti(Object.assign({}, defaults, { particleCount, origin: { x: random(0.1, 0.3), y: Math.random() - 0.2 } }));
            confetti(Object.assign({}, defaults, { particleCount, origin: { x: random(0.7, 0.9), y: Math.random() - 0.2 } }));
        }, 250);
    };

    yesBtn.addEventListener('click', () => {
        // Hide proposal, show success
        proposalSection.style.display = 'none';
        successSection.classList.remove('hidden');

        // Launch confetti
        launchConfetti();

        // Play sound effects if we had any, but for now just visual joy
    });

    // Make the No button run away
    const moveNoBtn = () => {
        const x = Math.random() * (window.innerWidth - noBtn.offsetWidth);
        const y = Math.random() * (window.innerHeight - noBtn.offsetHeight);

        // Make sure it doesn't leave the viewport or cover the yes button (basic check)
        // A simpler approach for the "contained" run away:
        // Move it within the card or switch its position to fixed/absolute on hover

        // Let's use a smarter "run away" - just move it a bit away from cursor
        // For simplicity and effectiveness in the card layout:

        const cardRect = proposalSection.getBoundingClientRect();

        // Calculate new random position within the card boundaries roughly, or just chaotic around the screen
        // "Sticking to the card" is safer for UX so it doesn't disappear entirely

        const maxMoveX = 150;
        const maxMoveY = 150;

        const randomX = (Math.random() - 0.5) * maxMoveX * 2;
        const randomY = (Math.random() - 0.5) * maxMoveY * 2;

        noBtn.style.transform = `translate(${randomX}px, ${randomY}px)`;

        // Change text playfully
        const texts = ["Are you sure? 🥺", "Really? 😢", "Think again! 💔", "Pls say yes! 💕", "Don't do this! 😭", "Last chance! ⚠️"];
        const randomText = texts[Math.floor(Math.random() * texts.length)];
        noBtn.innerText = randomText;
    };

    noBtn.addEventListener('mouseover', moveNoBtn);
    noBtn.addEventListener('touchstart', (e) => {
        e.preventDefault(); // Prevent clicking on mobile immediate tap
        moveNoBtn();
    });

    // Fallback if they manage to click it
    noBtn.addEventListener('click', (e) => {
        e.preventDefault();
        alert("Nice try, but you can't say no! 😈");
    });
});
