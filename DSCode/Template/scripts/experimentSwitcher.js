document.addEventListener('DOMContentLoaded', function() {
    const dropdown = document.getElementById('dropdown');
    const experimentFrame = document.getElementById('experimentFrame');

    // Add event listener for dropdown change
    dropdown.addEventListener('change', function() {
        const selectedValue = this.value;

        // Clear output when switching experiments
        clearIframeOutput(experimentFrame);

        // Update the iframe's src and swapBox buttons based on the selected experiment
        switch (selectedValue) {
            case '1':
                experimentFrame.src = 'experiments/experiment1/Exp1Sim/index.html';
                updateSwapBox('experiments/experiment1/experiment1-code.html', 'experiments/experiment1/experiment1-algo.html');
                break;
            case '2':
                experimentFrame.src = 'experiments/experiment2/Exp2Sim/index.html';
                updateSwapBox('experiments/experiment2/experiment2-code.html', 'experiments/experiment2/experiment2-algo.html');
                break;
            case '3':
                experimentFrame.src = 'experiments/experiment3/Exp3Sim/index.html';
                updateSwapBox('experiments/experiment3/experiment3-code.html', 'experiments/experiment3/experiment3-algo.html');
                break;
            default:
                experimentFrame.src = ''; // Clear the iframe if no valid selection
                break;
        }

        // Load the content for the currently active tab after switching experiments
        loadTabContent(activeTab); // This will use the active tab stored in main.js
    });

    // Helper function to update swapBox buttons (Code and Algo links)
    function updateSwapBox(codePath, algoPath) {
        const swapBoxButtons = document.querySelectorAll('.swapBoxCont button');
        swapBoxButtons[1].setAttribute('onclick', `loadTabContent('code', '${codePath}')`);
        swapBoxButtons[2].setAttribute('onclick', `loadTabContent('algo', '${algoPath}')`);
    }

    // Helper function to clear output in the iframe
    function clearIframeOutput(iframe) {
        iframe.contentWindow.postMessage({ type: 'clearOutput' }, '*');
    }

    // Load initial content for the active tab
    loadTabContent(activeTab); // This will now use the active tab stored in main.js
});
