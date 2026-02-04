/**
 * Business Card Logic
 * Professional approach: Using a single initialization function
 */

const initCardGenerator = () => {
    // Select Inputs
    const inputName = document.getElementById('inputName');
    const inputRole = document.getElementById('inputRole');
    const inputColor = document.getElementById('inputColor');

    // Select Preview Elements
    const previewName = document.getElementById('previewName');
    const previewRole = document.getElementById('previewRole');
    const cardElement = document.getElementById('businessCard');

    /**
     * Updates the text content of the card
     * @param {Element} target - The DOM element to update
     * @param {string} value - The new text
     * @param {string} defaultValue - Text to show if input is empty
     */
    const updateText = (target, value, defaultValue) => {
        target.innerText = value.trim() === "" ? defaultValue : value;
    };

    // Event Listeners for Text
    inputName.addEventListener('input', (e) => {
        updateText(previewName, e.target.value, "Your Name");
    });

    inputRole.addEventListener('input', (e) => {
        updateText(previewRole, e.target.value, "Job Title");
    });

    // Event Listener for Color (Using CSS Variables)
    inputColor.addEventListener('input', (e) => {
        const selectedColor = e.target.value;
        // The magic happens here: updating the CSS variable directly on the document
        document.documentElement.style.setProperty('--card-color', selectedColor);
    });
};

// Start the script
initCardGenerator();