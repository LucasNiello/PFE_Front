/**
 * Core Logic: Celsius to Fahrenheit conversion
 * Formula: $F = C \times 1.8 + 32$
 */
const convertToFahrenheit = (celsius) => (celsius * 1.8) + 32;

/**
 * UI Controller: Handles the visual changes based on temperature
 */
const updateInterface = () => {
    const inputField = document.getElementById('tempCelsius');
    const display = document.getElementById('resultDisplay');
    const body = document.body;

    // Convert input value to a float
    const celsiusValue = parseFloat(inputField.value);

    // Validation: Check if the input is a valid number
    if (isNaN(celsiusValue)) {
        display.textContent = "⚠️ Please enter a valid number.";
        return;
    }

    const fahrenheitResult = convertToFahrenheit(celsiusValue);
    
    // Update text content with 1 decimal precision
    display.innerHTML = `Result: <strong>${fahrenheitResult.toFixed(1)}°F</strong>`;

    // Visual feedback logic
    // Clear previous states before applying new ones
    body.classList.remove('state-hot', 'state-cold');

    if (fahrenheitResult > 80) {
        body.classList.add('state-hot');
    } else {
        body.classList.add('state-cold');
    }
};

// Event Binding
document.getElementById('convertBtn').addEventListener('click', updateInterface);