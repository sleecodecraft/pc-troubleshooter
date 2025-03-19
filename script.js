// Get elements from the HTML
const problemSelect = document.getElementById('problem-select');
const solutionDiv = document.getElementById('solution');

// Troubleshooting solutions
const solutions = {
    'no-display': `
        <h2>No Display on Monitor</h2>
        <ol>
            <li>Check if the monitor is powered on and cables are secure.</li>
            <li>Ensure the PC is running (listen for fans or lights).</li>
            <li>Test with another monitor or cable to isolate the issue.</li>
        </ol>
    `,
    'slow-pc': `
        <h2>PC Running Slow</h2>
        <ol>
            <li>Check Task Manager for high CPU/memory usage.</li>
            <li>Close unnecessary programs or restart the PC.</li>
            <li>Scan for malware using an antivirus tool.</li>
        </ol>
    `,
    'no-internet': `
        <h2>No Internet Connection</h2>
        <ol>
            <li>Verify the router is on and cables are plugged in.</li>
            <li>Restart the modem/router and PC.</li>
            <li>Check network settings for correct IP configuration.</li>
        </ol>
    `
};

// Listen for dropdown changes
problemSelect.addEventListener('change', function() {
    const selectedProblem = problemSelect.value;
    if (selectedProblem) {
        solutionDiv.innerHTML = solutions[selectedProblem];
        solutionDiv.style.display = 'block'; // Show the solution
    } else {
        solutionDiv.style.display = 'none'; // Hide if no problem selected
    }
});