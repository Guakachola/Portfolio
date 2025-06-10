document.addEventListener('DOMContentLoaded', function() {
    // Initialize Swiper
    const swiper = new Swiper('.swiper-container', {
        // Enable smooth sliding effect
        effect: 'cube',
        grabCursor: true,
        centeredSlides: true,
        slidesPerView: 1,
        initialSlide: 0,
        loop: true,
        cubeEffect: {
            shadow: true,
            slideShadows: true,
            shadowOffset: 20,
            shadowScale: 0.94,
        },
        // Add pagination
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        // Add navigation arrows
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        // Enable smooth transitions
        speed: 600,
        // Add keyboard control
        keyboard: {
            enabled: true,
            onlyInViewport: false,
        },
    });

    // Flip arch functionality
    const flipArch = document.querySelector('.flip-arch');
    if (flipArch) {
        flipArch.addEventListener('click', function() {
            const inner = this.querySelector('.flip-arch-inner');
            inner.classList.toggle('flipped');
        });
    }

    const title = document.querySelector('.title');
    if (title) {
        const text = title.textContent;
        title.textContent = '';
        text.split('').forEach(char => {
            const span = document.createElement('span');
            if (char === ' ') {
                span.innerHTML = '&nbsp;';
            } else {
                span.textContent = char;
            }
            title.appendChild(span);
        });
    }

    // Card shuffler functionality
    const cardContainer = document.querySelector('.card-container');
    if (cardContainer) {
        let currentIndex = 0;
        const cards = Array.from(document.querySelectorAll('.card'));
        const totalCards = cards.length;

        // Create wrapper for cards
        const wrapper = document.createElement('div');
        wrapper.className = 'cards-wrapper';
        cards.forEach(card => {
            card.parentNode.removeChild(card);
            wrapper.appendChild(card);
        });
        cardContainer.appendChild(wrapper);

        // Create navigation dots
        const dotsContainer = document.createElement('div');
        dotsContainer.className = 'card-dots';
        cards.forEach((_, index) => {
            const dot = document.createElement('div');
            dot.className = 'dot';
            dot.addEventListener('click', () => goToCard(index));
            dotsContainer.appendChild(dot);
        });
        cardContainer.appendChild(dotsContainer);

        // Create navigation arrows
        const prevButton = document.createElement('button');
        prevButton.className = 'card-nav prev';
        prevButton.addEventListener('click', () => goToCard(currentIndex - 1));

        const nextButton = document.createElement('button');
        nextButton.className = 'card-nav next';
        nextButton.addEventListener('click', () => goToCard(currentIndex + 1));

        cardContainer.appendChild(prevButton);
        cardContainer.appendChild(nextButton);

        // Add touch support
        let touchStartX = 0;
        let touchEndX = 0;

        cardContainer.addEventListener('touchstart', e => {
            touchStartX = e.changedTouches[0].screenX;
        });

        cardContainer.addEventListener('touchend', e => {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        });

        function handleSwipe() {
            const swipeThreshold = 50;
            const diff = touchStartX - touchEndX;

            if (Math.abs(diff) > swipeThreshold) {
                if (diff > 0) {
                    // Swipe left
                    goToCard(currentIndex + 1);
                } else {
                    // Swipe right
                    goToCard(currentIndex - 1);
                }
            }
        }

        function goToCard(index) {
            // Handle wraparound
            if (index < 0) index = totalCards - 1;
            if (index >= totalCards) index = 0;

            currentIndex = index;

            // Update cards
            cards.forEach((card, i) => {
                card.classList.remove('active', 'previous', 'next');
                if (i === currentIndex) {
                    card.classList.add('active');
                } else if (i === (currentIndex - 1 + totalCards) % totalCards) {
                    card.classList.add('previous');
                } else if (i === (currentIndex + 1) % totalCards) {
                    card.classList.add('next');
                }
            });

            // Update dots
            const dots = dotsContainer.querySelectorAll('.dot');
            dots.forEach((dot, i) => {
                dot.classList.toggle('active', i === currentIndex);
            });
        }

        // Initialize first card
        goToCard(0);
    }
});