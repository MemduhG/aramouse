// options.js

const apiEndpointInput = document.getElementById('apiEndpoint');
const saveButton = document.getElementById('saveButton');

// Load the current API endpoint URL from storage and populate the input field
browser.storage.sync.get('apiEndpoint', (result) => {
  apiEndpointInput.value = result.apiEndpoint || '';
});

// Save the API endpoint URL to storage when the Save button is clicked
saveButton.addEventListener('click', () => {
  const apiEndpoint = apiEndpointInput.value;
  browser.storage.sync.set({ apiEndpoint });
});