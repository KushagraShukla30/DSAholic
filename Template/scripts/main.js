let currentOutput = ''; // Variable to store the current output

// Function to load content dynamically into the tab-content area
function loadTabContent(tab, filePath = null) {
    const contentDiv = document.getElementById('tab-content');
    const tabLinks = document.querySelectorAll('.swapBoxCont button');

    // Remove 'active' class from all tab buttons
    tabLinks.forEach(link => {
        link.classList.remove('active');
    });

    // Set the clicked tab button as active
    if (tab === 'out') {
        contentDiv.innerHTML = currentOutput; // Restore the saved output
        tabLinks[0].classList.add('active'); // OUT tab active
    } else if (filePath) {
        fetch(filePath)
            .then(response => {
                if (!response.ok) throw new Error("Failed to load content");
                return response.text();
            })
            .then(htmlContent => {
                contentDiv.innerHTML = htmlContent;
                // Set the active class based on tab selection
                if (tab === 'code') {
                    tabLinks[1].classList.add('active'); // CODE tab
                } else if (tab === 'algo') {
                    tabLinks[2].classList.add('active'); // ALGO tab
                }
            })
            .catch(error => {
                contentDiv.innerHTML = `<p>Error loading content: ${error.message}</p>`;
            });
    }
}

// Function to clear output when the number of disks changes
function clearOutput() {
    currentOutput = ''; // Clear the output stored
    document.getElementById('tab-content').innerHTML = ''; // Clear the displayed output
}

// Event listener for messages from the iframe (Exp1Sim)
window.addEventListener('message', function(event) {
    const output = event.data;

    if (typeof output === 'string') {
        currentOutput += output + '<br>'; // Append new output to the stored variable
        document.getElementById('tab-content').innerHTML = currentOutput; // Display updated output
    } else {
        console.warn("Received non-string data:", output); // Log any non-string data
    }
});

// Initial load for the OUT tab
window.onload = function() {
    loadTabContent('out'); // Load OUT tab by default
};

// Function to handle disk count change
function onDiskCountChange(newDiskCount) {
    clearOutput(); // Clear output when the disk count changes
    // Additional logic to handle disk count change can be added here
}