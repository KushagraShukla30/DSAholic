const basePath = 'experiments/experiment';

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
    const swapBoxButtons = document.querySelectorAll('.swapBoxCont button');

    const savedExperimentId = localStorage.getItem('selectedExperimentId') || '1';
    const savedTab = localStorage.getItem('activeTab') || 'out';

    dropdown.value = savedExperimentId;
    loadExperiment(savedExperimentId, savedTab);

    experiments.forEach(exp => {
        const option = document.createElement('option');
        option.value = exp.id;
        option.textContent = `${exp.title}`;
        dropdown.appendChild(option);
    });

    dropdown.addEventListener('change', function() {
        const selectedValue = this.value;
        const selectedExperiment = experiments.find(exp => exp.id === selectedValue);

        clearIframeOutput(experimentFrame);

        if (selectedExperiment) {
            const paths = getExperimentPaths(selectedExperiment.id);
            experimentFrame.src = paths.simPath;
            updateSwapBox(paths.codePath, paths.algoPath);

            experimentTitle.textContent = selectedExperiment.title;
            experimentQuestion.textContent = selectedExperiment.question;

            localStorage.setItem('selectedExperimentId', selectedExperiment.id);
            loadTabContent(savedTab); 
        } else {
            experimentFrame.src = ''; 
            experimentTitle.textContent = 'Experiment No. 00';
            experimentQuestion.textContent = 'To solve the tower of Hanoi problem using recursion.';
        }
    });

    function loadExperiment(experimentId, tab) {
        const selectedExperiment = experiments.find(exp => exp.id === experimentId);

        if (selectedExperiment) {
            const paths = getExperimentPaths(experimentId);
            experimentFrame.src = paths.simPath;
            updateSwapBox(paths.codePath, paths.algoPath);

            experimentTitle.textContent = selectedExperiment.title;
            experimentQuestion.textContent = selectedExperiment.question;

            document.querySelector(`.swapBoxCont button[data-tab="${tab}"]`).click();
        }
    }

    swapBoxButtons.forEach(button => {
        button.addEventListener('click', function() {
            const tab = this.textContent.toLowerCase();
            localStorage.setItem('activeTab', tab); 
        });
    });
});

function updateSwapBox(codePath, algoPath) {
    const swapBoxButtons = document.querySelectorAll('.swapBoxCont button');
    swapBoxButtons[1].setAttribute('onclick', `loadTabContent('code', '${codePath}')`);
    swapBoxButtons[2].setAttribute('onclick', `loadTabContent('algo', '${algoPath}')`);
}

function clearIframeOutput(iframe) {
    iframe.contentWindow.postMessage({ type: 'clearOutput' }, '*');
}

function loadTabContent(tab, filePath = null) {
    const contentDiv = document.getElementById('tab-content');
    const tabLinks = document.querySelectorAll('.swapBoxCont button');

    activeTab = tab; 
    localStorage.setItem('activeTab', tab); 

    tabLinks.forEach(link => {
        link.classList.remove('active');
    });

    if (tab === 'out') {
        contentDiv.innerHTML = currentOutput;
        tabLinks[0].classList.add('active');
    } else if (filePath) {
        fetch(filePath)
            .then(response => {
                if (!response.ok) throw new Error("Failed to load content");
                return response.text();
            })
            .then(htmlContent => {
                contentDiv.innerHTML = htmlContent;
                if (tab === 'code') {
                    tabLinks[1].classList.add('active');
                } else if (tab === 'algo') {
                    tabLinks[2].classList.add('active');
                }
            })
            .catch(error => {
                contentDiv.innerHTML = `<p>Error loading content: ${error.message}</p>`;
            });
    }
}
