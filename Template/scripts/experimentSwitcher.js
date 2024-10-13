// experimentSwitcher.js

document.addEventListener('DOMContentLoaded', function() {
    const dropdown = document.getElementById('dropdown');
    const experimentFrame = document.getElementById('experimentFrame');

    // Add event listener for dropdown change
    dropdown.addEventListener('change', function() {
        const selectedValue = this.value;

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
            case '4':
                experimentFrame.src = 'experiments/final_year/FinalYearSim/index.html';
                updateSwapBox('experiments/final_year/final_year-code.html', 'experiments/final_year/final_year-algo.html');
                break;
            default:
                experimentFrame.src = ''; // Clear the iframe if no valid selection
                break;
        }
    });

    function updateSwapBox(codePath, algoPath) {
        const swapBoxButtons = document.querySelectorAll('.swapBoxCont button');
        swapBoxButtons[1].setAttribute('onclick', `loadTabContent('code', '${codePath}')`);
        swapBoxButtons[2].setAttribute('onclick', `loadTabContent('algo', '${algoPath}')`);
    }
});