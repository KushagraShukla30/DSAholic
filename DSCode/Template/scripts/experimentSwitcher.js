const basePath = 'experiments/experiment';

// Array with only essential details
const experiments = [
    {
        id: '1',
        title: 'Experiment No. 1: Tower of Hanoi',
        question: 'To solve the tower of Hanoi problem using recursion.'
    },
    {
        id: '2',
        title: 'Experiment No. 2: Stack Operations',
        question: 'To perform basic stack operations using an array.'
    },
    {
        id: '3',
        title: 'Experiment No. 3: Queue Operations',
        question: 'To implement queue operations using linked lists.'
    }
];

// Function to generate paths dynamically based on experiment ID
function getExperimentPaths(id) {
    return {
        simPath: `${basePath}${id}/Exp${id}Sim/index.html`,
        codePath: `${basePath}${id}/experiment${id}-code.html`,
        algoPath: `${basePath}${id}/experiment${id}-algo.html`
    };
}

document.addEventListener('DOMContentLoaded', function() {
    const dropdown = document.getElementById('dropdown');
    const experimentFrame = document.getElementById('experimentFrame');
    const experimentTitle = document.getElementById('experimentTitle');
    const experimentQuestion = document.getElementById('experimentQuestion');

    // Populate the dropdown with experiments from the array
    experiments.forEach(exp => {
        const option = document.createElement('option');
        option.value = exp.id;
        option.textContent = `${exp.title}`;
        dropdown.appendChild(option);
    });

    // Event listener for dropdown change
    dropdown.addEventListener('change', function() {
        const selectedValue = this.value;
        const selectedExperiment = experiments.find(exp => exp.id === selectedValue);

        clearIframeOutput(experimentFrame);

        if (selectedExperiment) {
            // Get paths using getExperimentPaths
            const paths = getExperimentPaths(selectedExperiment.id);

            // Update iframe and swapBox paths
            experimentFrame.src = paths.simPath;
            updateSwapBox(paths.codePath, paths.algoPath);

            // Update Experiment Title and Question dynamically
            experimentTitle.textContent = selectedExperiment.title;
            experimentQuestion.textContent = selectedExperiment.question;

            // Load tab content based on the active tab
            loadTabContent(activeTab);
        } else {
            // Reset content if no valid experiment is selected
            experimentFrame.src = ''; // Clear iframe
            experimentTitle.textContent = 'Experiment No. 00';
            experimentQuestion.textContent = 'To solve the tower of Hanoi problem using recursion.';
        }
    });
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
