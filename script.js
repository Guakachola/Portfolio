document.addEventListener('DOMContentLoaded', function() {
    const flipArch = document.querySelector('.flip-arch-inner');

    if (flipArch) {
        flipArch.addEventListener('click', function() {
            this.classList.add('spinning');

            setTimeout(() => {
                this.classList.remove('spinning');
            }, 500);
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
});