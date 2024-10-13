document.addEventListener('DOMContentLoaded', function() {
    const numDisksInput = document.getElementById('numDisks');
    const rodA = document.getElementById('rodA');
    const rodB = document.getElementById('rodB');
    const rodC = document.getElementById('rodC');
    const outputContainer = document.getElementById('output'); // Assuming you have an output container

    let steps = [];
    let currentStep = 0;
    let initialNumDisks = 0;

    // Function to create disks
    function createDisks(numDisks) {
        clearRods(); 
        sendOutputToParent(''); // Clear the output in parent window on disk change
        steps = [];
        currentStep = 0;
        initialNumDisks = numDisks;

        for (let i = numDisks; i >= 1; i--) {
            const disk = document.createElement('div');
            disk.className = 'disk';
            disk.style.width = (i * 30) + 'px';
            disk.style.backgroundColor = getDiskColor(i);
            disk.innerText = i;
            rodA.appendChild(disk);
        }

        towerOfHanoi(initialNumDisks, 'rodA', 'rodC', 'rodB');
    }

    // Function to clear rods
    function clearRods() {
        [rodA, rodB, rodC].forEach(rod => rod.innerHTML = '');
    }

    // Function to generate color for each disk
    function getDiskColor(diskNumber) {
        const colors = ['#FF6384', '#FF9F40', '#FFCD56', '#4BC0C0', '#36A2EB', '#9966FF'];
        return colors[diskNumber - 1] || '#888';
    }

    // Tower of Hanoi logic
    function towerOfHanoi(n, fromRod, toRod, auxRod) {
        if (n === 0) return;
        towerOfHanoi(n - 1, fromRod, auxRod, toRod);
        steps.push({ disk: n, from: fromRod, to: toRod });
        towerOfHanoi(n - 1, auxRod, toRod, fromRod);
    }

    // Function to display the current step
    function displayStep() {
        if (currentStep < steps.length) {
            const { disk, from, to } = steps[currentStep];
            const fromRod = document.getElementById(from);
            const toRod = document.getElementById(to);

            const diskElements = Array.from(fromRod.querySelectorAll('.disk'));
            const diskElement = diskElements.find(d => parseInt(d.innerText) === disk);

            document.getElementById('nextStep').disabled = true;
            document.getElementById('finalOutput').disabled = true;

            if (diskElement) {
                diskElement.classList.add('animate-up');
                    
                diskElement.addEventListener('animationend', function() {
                    diskElement.style.top = `${toRod.offsetTop}px`;
                    toRod.appendChild(diskElement);

                    diskElement.classList.remove('animate-up');
                    diskElement.classList.add('animate-down');

                    diskElement.addEventListener('animationend', function() {
                        diskElement.classList.remove('animate-down');
                        diskElement.style.position = '';
                        diskElement.style.top = '';

                        document.getElementById('nextStep').disabled = false;
                        document.getElementById('finalOutput').disabled = false;
                    }, { once: true });
                }, { once: true });
            }

            const formattedFrom = from.charAt(0).toUpperCase() + "OD " + from.charAt(3).toUpperCase();
            const formattedTo = to.charAt(0).toUpperCase() + "OD " + to.charAt(3).toUpperCase();

            sendOutputToParent(`Move Disk ${disk} from ${formattedFrom} to ${formattedTo}\n`);
        }
    }

    // Handle Next Step button
    document.getElementById('nextStep').addEventListener('click', function() {
        if (currentStep < steps.length) {
            displayStep();
            currentStep++;
        }
    });

    // Handle Final Output button
    document.getElementById('finalOutput').addEventListener('click', function() {
        clearRods(); 
        
        // Repopulate the final state on Rod C
        for (let i = initialNumDisks; i >= 1; i--) {
            const disk = document.createElement('div');
            disk.className = 'disk';
            disk.style.width = (i * 30) + 'px';
            disk.style.backgroundColor = getDiskColor(i);
            disk.innerText = i;
            rodC.appendChild(disk);
        }

        // Send all steps (moves) as output before clearing steps array
        for (let step of steps) {
            const formattedFrom = step.from.charAt(0).toUpperCase() + "OD " + step.from.charAt(3).toUpperCase();
            const formattedTo = step.to.charAt(0).toUpperCase() + "OD " + step.to.charAt(3).toUpperCase();
            sendOutputToParent(`Move Disk ${step.disk} from ${formattedFrom} to ${formattedTo}\n`);
        }

        // Send final message
        sendOutputToParent('All disks moved to Rod C\n');

        // Clear steps AFTER printing final output
        steps = [];
        currentStep = 0;

        // Hide the output container (if needed)
        outputContainer.style.display = 'none';
    });

    // Function to send output message to parent window
    function sendOutputToParent(message) {
        window.parent.postMessage(message, '*');
    }

    // Initial disk creation
    createDisks(parseInt(numDisksInput.value));

    // Update disks based on number of disks input
    numDisksInput.addEventListener('change', function() {
        createDisks(parseInt(this.value));
    });
});