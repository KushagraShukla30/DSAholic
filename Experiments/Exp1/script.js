document.addEventListener('DOMContentLoaded', function() {
    const numDisksInput = document.getElementById('numDisks');
    const rodA = document.getElementById('rodA');
    const rodB = document.getElementById('rodB');
    const rodC = document.getElementById('rodC');
    const output = document.getElementById('output');

    let steps = [];
    let currentStep = 0;

    // Function to create disks
    function createDisks(numDisks) {
        clearRods(); // Clear rods before adding new disks
        output.innerText = ''; // Clear output box
        steps = []; // Clear steps
        currentStep = 0; // Reset current step
        
        for (let i = numDisks; i >= 1; i--) {
            const disk = document.createElement('div');
            disk.className = 'disk';
            disk.style.width = (i * 30) + 'px';
            disk.style.backgroundColor = getDiskColor(i);
            disk.innerText = i;

            // Visually place all disks on rodA at the start
            rodA.appendChild(disk);
        }

        // Generate steps using Tower of Hanoi algorithm
        towerOfHanoi(numDisks, 'rodA', 'rodC', 'rodB');
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

    // Function to display the current step with formatted output
    function displayStep() {
        if (currentStep < steps.length) {
            const { disk, from, to } = steps[currentStep];
            const fromRod = document.getElementById(from);
            const toRod = document.getElementById(to);
    
            const diskElements = Array.from(fromRod.querySelectorAll('.disk'));
            const diskElement = diskElements.find(d => parseInt(d.innerText) === disk);
    
            // Disable buttons at the start of the animation
            document.getElementById('nextStep').disabled = true;
            document.getElementById('finalOutput').disabled = true;
    
            if (diskElement) {
                // Add animation class to the disk element for upward motion
                diskElement.classList.add('animate-up');
    
                // Wait for the upward animation to finish before moving the disk down
                diskElement.addEventListener('animationend', function() {
                    // Move the disk to the target rod
                    // Set position to be on top of the target rod before falling
                    diskElement.style.top = `${toRod.offsetTop}px`; // Set to the height of the rod
                    toRod.appendChild(diskElement);
    
                    // Add animation class for downward motion
                    diskElement.classList.remove('animate-up');
                    diskElement.classList.add('animate-down');
    
                    // Reset the animation classes after the animation ends
                    diskElement.addEventListener('animationend', function() {
                        diskElement.classList.remove('animate-down');
                        diskElement.style.position = ''; // Reset position
                        diskElement.style.top = ''; // Reset top to default
    
                        // Enable buttons again
                        document.getElementById('nextStep').disabled = false;
                        document.getElementById('finalOutput').disabled = false;
                    }, { once: true });
                }, { once: true });
            }
    
            // Convert rod IDs to uppercase (ROD A, ROD B, ROD C)
            const formattedFrom = from.charAt(0).toUpperCase() + "OD " + from.charAt(3).toUpperCase();
            const formattedTo = to.charAt(0).toUpperCase() + "OD " + to.charAt(3).toUpperCase();
    
            // Format the output string
            output.innerText += `Move Disk ${disk} from ${formattedFrom} to ${formattedTo}\n`;
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
        while (currentStep < steps.length) {
            displayStep();
            currentStep++;
        }
    });

    // Initial disk creation
    createDisks(parseInt(numDisksInput.value));

    // Update disks based on number of disks input
    numDisksInput.addEventListener('change', function() {
        createDisks(parseInt(this.value));
    });
});
