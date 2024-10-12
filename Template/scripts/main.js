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
        contentDiv.innerHTML = '<p>Real-time output for the OUT tab will be generated here.</p>';
        // Your logic to generate output dynamically
        tabLinks[0].classList.add('active'); // OUT tab
    }
    // CODE or ALGO tab content loaded from external HTML files
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

// Initial load for the OUT tab
window.onload = function() {
    loadTabContent('out'); // Load OUT tab content by default
};