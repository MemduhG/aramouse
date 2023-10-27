// popup.js

// Listen for messages from content.js (the API response)
browser.runtime.onMessage.addListener((message) => {
    const tooltip = document.getElementById('tooltip');
  
    // Display the API response in the tooltip
    tooltip.textContent = message.apiResponse;
  
    // Position the tooltip near the cursor (customize this logic)
    const x = event.clientX;
    const y = event.clientY;
    tooltip.style.left = x + 'px';
    tooltip.style.top = y + 'px';
  
    // Show the tooltip
    tooltip.style.display = 'block';
  });
  
  // Hide the tooltip when the mouse moves off the word
  document.addEventListener('mouseout', () => {
    const tooltip = document.getElementById('tooltip');
    tooltip.style.display = 'none';
  });
  