// content.js
document.addEventListener('mouseover', handleMouseOver);



function handleMouseOver(event) {
    console.log("handling mouseover")
    const target = event.target;
  
    const textContent = target.textContent;
    const words = textContent.trim().split(/\s+/); // Split text into words
    console.log(words)
    for (const word of words) {
        const range = document.createRange();
        range.selectNode(target);
        const wordRange = range.getRangeAt(0);
        const wordRect = wordRange.getBoundingClientRect();

        if (wordRect.left <= event.clientX && event.clientX <= wordRect.right) {
            if (isArabicWord(word)) {
            // Now, 'word' contains the specific word you're mousing over
            // Make the API call and proceed with your logic for the word
                makeAPICall(word);
                break; // Stop processing after the first word found
            }
        }
    }
    
  }

function makeAPICall(word) {
    const apiEndpoint =  "http://127.0.0.1:5000/post_endpoint" ; //result.apiEndpoint;
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
