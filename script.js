
const problemSelect = document.getElementById('problem-select');
const solutionDiv = document.getElementById('solution');
const problemTitle = document.getElementById('problem-title');
const currentStep = document.getElementById('current-step');
const nextBtn = document.getElementById('next-btn');

const solutions = {
    'no-display': {
        title: 'No Display on Monitor',
        steps: [
            'Check if the monitor is powered on and cables are secure.',
            'Ensure the PC is running (listen for fans or lights).',
            'Test with another monitor or cable to isolate the issue.'
        ]
    },
    'slow-pc': {
        title: 'PC Running Slow',
        steps: [
            'Check Task Manager for high CPU/memory usage.',
            'Close unnecessary programs or restart the PC.',
            'Scan for malware using an antivirus tool.'
        ]
    },
    'no-internet': {
        title: 'No Internet Connection',
        steps: [
            'Verify the router is on and cables are plugged in.',
            'Restart the modem/router and PC.',
            'Check network settings for correct IP configuration.'
        ]
    }
};

let currentProblem = null;
let stepIndex = 0;

problemSelect.addEventListener('change', function() {
    const selectedProblem = problemSelect.value;
    if (selectedProblem) {
        currentProblem = solutions[selectedProblem];
        stepIndex = 0;
        problemTitle.textContent = currentProblem.title;
        currentStep.textContent = currentProblem.steps[stepIndex];
        solutionDiv.style.display = 'block';
        nextBtn.style.display = stepIndex < currentProblem.steps.length - 1 ? 'inline' : 'none';
    } else {
        solutionDiv.style.display = 'none';
    }
});

nextBtn.addEventListener('click', function() {
    stepIndex++;
    if (stepIndex < currentProblem.steps.length) {
        currentStep.textContent = currentProblem.steps[stepIndex];
        nextBtn.style.display = stepIndex < currentProblem.steps.length - 1 ? 'inline' : 'none';
    }

});