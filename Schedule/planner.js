// planner.js
document.addEventListener('DOMContentLoaded', function() {
    const timeSlots = document.querySelectorAll('.time-slot');
timeSlots.forEach(slot => {
    slot.addEventListener('click', function() {
        const event = prompt('Enter your event:');
        if (event) {
            this.innerHTML = event;
        }
    });
});
});