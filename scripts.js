function splitString() {
    const inputText = document.getElementById('inputText').value.trim();
    const MAX_LENGTH = 2100;

    if (inputText.length === 0) {
        alert('Please enter a valid string.');
        return;
    }
  
    // Split the input text into paragraphs
    const paragraphs = inputText.split('\n').filter(paragraph => paragraph.trim().length > 0);
  
    const sections = [];
    let currentSection = "";

    // Distribute paragraphs into sections
    for (const paragraph of paragraphs) {
        // Check if adding this paragraph would exceed the max length
        if (currentSection.length + paragraph.length + 1 > MAX_LENGTH) { // +1 for the newline character
            sections.push(currentSection.trim());
            currentSection = paragraph + "\n"; // Start a new section with the current paragraph
        } else {
            currentSection += paragraph + "\n"; // Add the paragraph to the current section
        }
    }

    // Push the last section if it has content
    if (currentSection.length > 0) {
        sections.push(currentSection.trim());
    }

    // Clear previous output sections
    const outputContainer = document.getElementById('output');
    outputContainer.innerHTML = '';

    // Function to get the first 10 words of a text
    function getFirst10Words(text) {
        const words = text.split(' ');
        return words.slice(0, 10).join(' ') + (words.length > 10 ? '...' : '');
    }
  
    // Create output sections dynamically
    sections.forEach((section, index) => {
        const outputDiv = document.createElement('div');
        outputDiv.className = 'output-section';
        outputDiv.id = `output${index + 1}`;
        outputDiv.innerHTML = getFirst10Words(section);
        outputDiv.setAttribute('data-fulltext', `'''${section}'''\n[${index + 1}]\nTranslate the entire given text into English while maintaining the original meaning of the text and the sentence, and extra line break for paragraphs.`);
        
        const copyButton = document.createElement('button');
        copyButton.className = 'copy-button';
        copyButton.innerText = `Copy-${index + 1}`;
        copyButton.onclick = () => copyToClipboard(outputDiv.id);
        
        outputContainer.appendChild(outputDiv);
        outputContainer.appendChild(copyButton);
    });
}

// function copyToClipboard(elementId) {
//     const element = document.getElementById(elementId);
//     const textToCopy = element.getAttribute('data-fulltext');
  
//     // Create a temporary textarea to perform the copy operation
//     const tempTextArea = document.createElement('textarea');
//     tempTextArea.value = textToCopy;
//     document.body.appendChild(tempTextArea);
//     tempTextArea.select();
//     document.execCommand('copy');
//     document.body.removeChild(tempTextArea);
  
//     // Provide visual feedback or message
//     const msgElement = document.getElementById('msg');
//     msgElement.style.display = 'block';
//     setTimeout(function() {
//         msgElement.style.display = 'none';
//     }, 2000);
// }

function copyToClipboard(elementId) {
    const element = document.getElementById(elementId);
    const textToCopy = element.getAttribute('data-fulltext');

    // Use the Clipboard API to copy text
    navigator.clipboard.writeText(textToCopy).then(function() {
        // Provide visual feedback or message
        const msgElement = document.getElementById('msg');
        msgElement.style.display = 'block';
        setTimeout(function() {
            msgElement.style.display = 'none';
        }, 2000);
    }).catch(function(err) {
        console.error('Could not copy text: ', err);
    });
}
