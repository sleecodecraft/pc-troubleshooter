const problemSelect = document.getElementById('problem-select');
const selectedText = document.getElementById('selected-text');
const problemOptions = document.getElementById('problem-options');
const solutionDiv = document.getElementById('solution');
const problemTitle = document.getElementById('problem-title');
const currentStep = document.getElementById('current-step');
const stepIcon = document.getElementById('step-icon');
const nextBtn = document.getElementById('next-btn');
const prevBtn = document.getElementById('prev-btn');
const resetBtn = document.getElementById('reset-btn');
const stepProgress = document.getElementById('step-progress');
const successMessage = document.getElementById('success-message');
const dropdown = document.getElementById('dropdown');
const stepContainer = document.querySelector('.step-container');
const customProblemDiv = document.getElementById('custom-problem');
const customInput = document.getElementById('custom-input');
const searchBtn = document.getElementById('search-btn');
const customResetBtn = document.getElementById('custom-reset-btn');

const solutions = {
    'no-display': {
        title: 'No Display on Monitor',
        steps: [
            { text: 'Check if the monitor is powered on and cables are secure.', icon: 'fa-plug' },
            { text: 'Ensure the PC is running (listen for fans or lights).', icon: 'fa-desktop' },
            { text: 'Test with another monitor or cable to isolate the issue.', icon: 'fa-exchange-alt' }
        ]
    },
    'slow-pc': {
        title: 'PC Running Slow',
        steps: [
            { text: 'Check Task Manager for high CPU/memory usage.', icon: 'fa-tachometer-alt' },
            { text: 'Close unnecessary programs or restart the PC.', icon: 'fa-times' },
            { text: 'Scan for malware using an antivirus tool.', icon: 'fa-shield-alt' }
        ]
    },
    'no-internet': {
        title: 'No Internet Connection',
        steps: [
            { text: 'Verify the router is on and cables are plugged in.', icon: 'fa-wifi' },
            { text: 'Restart the modem/router and PC.', icon: 'fa-sync' },
            { text: 'Check network settings for correct IP configuration.', icon: 'fa-cogs' }
        ]
    },
    'pc-wont-boot': {
        title: 'PC Won’t Boot',
        steps: [
            { text: 'Check if the power cable is securely connected.', icon: 'fa-plug-circle-exclamation' },
            { text: 'Listen for beep codes or check for power lights.', icon: 'fa-lightbulb' },
            { text: 'Reset the BIOS by removing the CMOS battery for a few minutes.', icon: 'fa-microchip' }
        ]
    },
    'blue-screen': {
        title: 'Blue Screen of Death (BSOD)',
        steps: [
            { text: 'Note the error code displayed on the screen.', icon: 'fa-exclamation-triangle' },
            { text: 'Boot into Safe Mode to check for recent changes.', icon: 'fa-life-ring' },
            { text: 'Update or roll back drivers that might be causing the issue.', icon: 'fa-tools' }
        ]
    },
    'no-sound': {
        title: 'No Sound Output',
        steps: [
            { text: 'Check if the speakers or headphones are plugged in.', icon: 'fa-headphones' },
            { text: 'Ensure the volume is not muted and turned up.', icon: 'fa-volume-up' },
            { text: 'Update audio drivers from the manufacturer’s website.', icon: 'fa-download' }
        ]
    },
    'overheating': {
        title: 'Overheating Issues',
        steps: [
            { text: 'Check if the fans are running and free of dust.', icon: 'fa-fan' },
            { text: 'Ensure the PC is in a well-ventilated area.', icon: 'fa-wind' },
            { text: 'Apply new thermal paste to the CPU if needed.', icon: 'fa-thermometer-half' }
        ]
    }
};

// Ensure "Other" option exists in the dropdown
if (!problemOptions.querySelector('li[data-value="other"]')) {
    const otherOption = document.createElement('li');
    otherOption.setAttribute('data-value', 'other');
    otherOption.textContent = 'Other';
    problemOptions.appendChild(otherOption);
}

let currentProblem = null;
let stepIndex = 0;

function updateDisplay() {
    // Hide custom problem input if not "Other"
    if (currentProblem !== 'other') {
        customProblemDiv.style.display = 'none';
    }

    if (!currentProblem || currentProblem === 'other') {
        solutionDiv.style.display = 'none';
        solutionDiv.classList.remove('fade-in');
        resetBtn.style.display = 'none';
        successMessage.style.display = 'none';
        return;
    }

    solutionDiv.style.display = 'block';
    solutionDiv.classList.add('fade-in');
    problemTitle.textContent = currentProblem.title;

    // Animate step content
    stepContainer.classList.remove('slide-in');
    stepContainer.classList.add('slide-out');
    setTimeout(() => {
        currentStep.textContent = currentProblem.steps[stepIndex].text;
        stepIcon.className = `fas ${currentProblem.steps[stepIndex].icon}`;
        stepContainer.classList.remove('slide-out');
        stepContainer.classList.add('slide-in');
        stepIcon.classList.add('scale-up');
    }, 300);

    // Update progress with pulse effect
    stepProgress.textContent = `Step ${stepIndex + 1} of ${currentProblem.steps.length}`;
    stepProgress.parentElement.classList.add('pulse');

    // Show/hide buttons
    prevBtn.style.display = stepIndex > 0 ? 'inline' : 'none';
    nextBtn.style.display = stepIndex < currentProblem.steps.length - 1 ? 'inline' : 'none';
    resetBtn.style.display = 'inline';

    // Show success message at the end
    successMessage.style.display = stepIndex === currentProblem.steps.length - 1 ? 'block' : 'none';
}

// Handle dropdown hover
dropdown.addEventListener('mouseover', function() {
    dropdown.classList.add('open');
});

dropdown.addEventListener('mouseout', function() {
    if (!problemOptions.classList.contains('closed')) {
        dropdown.classList.remove('open');
    }
});

// Handle option selection
problemOptions.querySelectorAll('li').forEach(option => {
    option.addEventListener('click', function() {
        const selectedValue = this.getAttribute('data-value');
        selectedText.textContent = this.textContent;

        if (selectedValue === 'other') {
            currentProblem = 'other';
            customProblemDiv.style.display = 'block';
            customInput.value = '';
        } else if (selectedValue) {
            currentProblem = solutions[selectedValue];
            stepIndex = 0;
        } else {
            currentProblem = null;
        }

        // Close the dropdown after selection
        problemOptions.classList.add('closed');
        dropdown.classList.remove('open');

        // Update display after a slight delay to allow closing animation
        setTimeout(updateDisplay, 300);
    });
});

// Handle custom problem search
searchBtn.addEventListener('click', function() {
    const query = customInput.value.trim();
    if (query) {
        const searchQuery = `${query} PC troubleshooting solution`;
        const googleSearchUrl = `https://www.google.com/search?q=${encodeURIComponent(searchQuery)}`;
        window.open(googleSearchUrl, '_blank');
    }
});

// Allow Enter key to trigger search
customInput.addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        event.preventDefault();
        searchBtn.click();
    }
});

// Handle custom problem reset
customResetBtn.addEventListener('click', function() {
    selectedText.textContent = '-- Choose a Problem --';
    currentProblem = null;
    stepIndex = 0;
    customInput.value = ''; // Clear the input field
    updateDisplay();
    problemOptions.classList.remove('closed');
    dropdown.classList.remove('open');
});

nextBtn.addEventListener('click', function() {
    if (stepIndex < currentProblem.steps.length - 1) {
        stepIndex++;
        updateDisplay();
        nextBtn.classList.add('bounce');
        setTimeout(() => nextBtn.classList.remove('bounce'), 300);
    }
});

prevBtn.addEventListener('click', function() {
    if (stepIndex > 0) {
        stepIndex--;
        updateDisplay();
        prevBtn.classList.add('bounce');
        setTimeout(() => prevBtn.classList.remove('bounce'), 300);
    }
});

resetBtn.addEventListener('click', function() {
    selectedText.textContent = '-- Choose a Problem --';
    currentProblem = null;
    stepIndex = 0;
    updateDisplay();
    problemOptions.classList.remove('closed');
    dropdown.classList.remove('open');
});