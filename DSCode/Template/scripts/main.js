let currentOutput = ''; // Variable to store the current output
let activeTab = 'out'; // Variable to track the currently active tab

// Function to load content dynamically into the tab-content area
    function loadTabContent(tab, filePath = null) {
        const contentDiv = document.getElementById('tab-content');
        const tabLinks = document.querySelectorAll('.swapBoxCont button');

        // Set the active tab
        activeTab = tab;

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
window.addEventListener('message', function (event) {
    const message = event.data;

    if (message.type === 'clearOutput') {
        clearOutput(); // Clear output when receiving a clear message
    } else if (typeof message === 'string') {
        currentOutput += message + '<br>'; // Append new output to the stored variable
        document.getElementById('tab-content').innerHTML = currentOutput; // Display updated output
    } else {
        console.warn("Received non-string data:", message); // Log any non-string data
    }
});

// Initial load for the OUT tab
window.onload = function () {
    loadTabContent(activeTab); // Load the active tab content by default
};
