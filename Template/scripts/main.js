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
        // Load current output or clear it depending on the disk change
        contentDiv.innerHTML = currentOutput; // Display the saved output
        tabLinks[0].classList.add('active'); // OUT tab active
    }
    // For CODE or ALGO tab content loaded from external HTML files
    else if (filePath) {
        fetch(filePath)
            .then(response => {
                if (!response.ok) throw new Error("Failed to load content");
                return response.text();
            })
            .then(htmlContent => {
                contentDiv.innerHTML = htmlContent;
                // Add the active class to the appropriate tab based on the selection
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
    currentOutput = ''; // Clear the output variable
    document.getElementById('tab-content').innerHTML = ''; // Clear the display
}

// Listen for messages from the iframe (Exp1Sim)
window.addEventListener('message', function(event) {
    const output = event.data; // Assuming this is now a string

    // Only append if the output is a string, ignore if it's an object
    if (typeof output === 'string') {
        currentOutput += output + '<br>'; // Append new output to the variable
        // Display the updated output in the tab-content
        document.getElementById('tab-content').innerHTML = currentOutput;
    } else {
        console.warn("Received non-string data: ", output); // For debugging
    }
});

// Initial load for the OUT tab
window.onload = function() {
    loadTabContent('out'); // Load OUT tab content by default
};

// Call this function whenever you change the number of disks
// For example, you might have a function like this:
function onDiskCountChange(newDiskCount) {
    clearOutput(); // Clear the output when the disk count changes
    // Additional logic for handling the disk count change
}

// Listen for messages from the iframe (Exp1Sim)
window.addEventListener('message', function(event) {
    const output = event.data; // Capture the event data
    
    // Only append if the output is a string, ignore if it's an object
    if (typeof output === 'string') {
        const tabContent = document.getElementById('tab-content');
        // Append the output with a new line
        tabContent.innerHTML += output + '<br>'; // Adds new line for each output
    } else {
        console.warn("Received non-string data: ", output); // For debugging
    }
});

