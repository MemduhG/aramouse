// content.js
document.addEventListener('mouseover', handleMouseOver);



function handleMouseOver(event) {
    console.log("Handling mouseover")
    // Retrieve the API endpoint URL from storage
    browser.storage.sync.get('apiEndpoint', (result) => {
      const apiEndpoint =  "http://127.0.0.1:5000/post_endpoint" ; //result.apiEndpoint;
     
      const target = event.target;
  
      if (apiEndpoint) {
        
        const range = document.createRange();
        range.selectNode(target);
    
        // Get the client rect of the range
        const rect = range.getBoundingClientRect();

        if (event.clientX >= rect.left && event.clientX <= rect.right
            && event.clientY >= rect.top && event.clientY <= rect.bottom) {
            const word = range.toString().trim();
            console.log(word)

            if (isArabicWord(word)) {
                // Make the API call and proceed with your logic
                makeAPICall(word);
              }
        } else {
            console.log("not in the rect")
        }

      }
    });
  }

function makeAPICall(word) {
    const postData = { word };
    console.log(word)

    const requestOptions = {
      method: 'POST',
      body: JSON.stringify(postData),
      headers: {
        'Content-Type': 'application/json',
      },
    };

    fetch(apiEndpoint, requestOptions)
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('API request failed');
        }
      })
      .then((data) => {
        browser.runtime.sendMessage({ apiResponse: data });
      })
      .catch((error) => {
        console.error('API call failed:', error);
      });
}
  

  function isArabicWord(element) {
    // Regular expression to match Arabic characters
    const arabicRegex = /[\u0600-\u06FF]/;
  
    // Check if the text content of the element contains Arabic characters
    return arabicRegex.test(element.textContent);
  }
