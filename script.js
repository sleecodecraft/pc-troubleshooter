const problemSelect = document.getElementById('problem-select');
const solutionDiv = document.getElementById('solution');
const problemTitle = document.getElementById('problem-title');
const currentStep = document.getElementById('current-step');
const stepIcon = document.getElementById('step-icon');
const nextBtn = document.getElementById('next-btn');
const prevBtn = document.getElementById('prev-btn');
const resetBtn = document.getElementById('reset-btn');
const stepProgress = document.getElementById('step-progress');
const successMessage = document.getElementById('success-message');

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

let currentProblem = null;
let stepIndex = 0;

function updateDisplay() {
    if (!currentProblem) {
        solutionDiv.style.display = 'none';
        solutionDiv.classList.remove('fade-in');
        resetBtn.style.display = 'none';
        return;
    }

    solutionDiv.style.display = 'block';
    solutionDiv.classList.add('fade-in');
    problemTitle.textContent = currentProblem.title;
    currentStep.textContent = currentProblem.steps[stepIndex].text;
    stepIcon.className = `fas ${currentProblem.steps[stepIndex].icon}`;

    // Update progress
    stepProgress.textContent = `Step ${stepIndex + 1} of ${currentProblem.steps.length}`;

    // Show/hide buttons
    prevBtn.style.display = stepIndex > 0 ? 'inline' : 'none';
    nextBtn.style.display = stepIndex < currentProblem.steps.length - 1 ? 'inline' : 'none';
    resetBtn.style.display = 'inline';

    // Show success message at the end
    successMessage.style.display = stepIndex === currentProblem.steps.length - 1 ? 'block' : 'none';
}

problemSelect.addEventListener('change', function() {
    const selectedProblem = problemSelect.value;
    if (selectedProblem) {
        currentProblem = solutions[selectedProblem];
        stepIndex = 0;
        updateDisplay();
    } else {
        currentProblem = null;
        updateDisplay();
    }
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
    problemSelect.value = '';
    currentProblem = null;
    stepIndex = 0;
    updateDisplay();
});