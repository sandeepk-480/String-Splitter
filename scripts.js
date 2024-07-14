function splitString() {
  const inputText = document.getElementById('inputText').value.trim();
  if (inputText.length === 0) {
      alert('Please enter a valid string.');
      return;
  }

  // Split the input text into paragraphs
  const paragraphs = inputText.split('\n').filter(paragraph => paragraph.trim().length > 0);

  // Calculate the total length of the text
  const totalLength = paragraphs.reduce((sum, paragraph) => sum + paragraph.length, 0);

  // Calculate the target length for each section
  const targetLength = Math.ceil(totalLength / 3);

  let currentLength = 0;
  let sectionIndex = 0;
  let sections = ["", "", ""];

  // Distribute paragraphs into sections
  for (const paragraph of paragraphs) {
      if (currentLength + paragraph.length > (sectionIndex + 1) * targetLength) {
          sectionIndex++;
          if (sectionIndex > 2) sectionIndex = 2; // Ensure we don't go beyond the third section
      }
      sections[sectionIndex] += paragraph + "\n";
      currentLength += paragraph.length;
  }

  // Function to get the first 50 words of a text
  function getFirst50Words(text) {
    return text.split(' ').slice(0, 10).join(' ') + (text.split(' ').length > 50 ? '...' : '');
  }

  // Display the sections
  document.getElementById('output1').innerHTML = `'''${getFirst50Words(sections[0].trim())}'''`;
  document.getElementById('output2').innerHTML = `'''${getFirst50Words(sections[1].trim())}'''`;
  document.getElementById('output3').innerHTML = `'''${getFirst50Words(sections[2].trim())}'''`;

  // Store full sections for copying
  document.getElementById('output1').setAttribute('data-fulltext', `'''${sections[0].trim()}'''\n\nTranslate this text into English`);
  document.getElementById('output2').setAttribute('data-fulltext', `'''${sections[1].trim()}'''\n\nTranslate this text into English`);
  document.getElementById('output3').setAttribute('data-fulltext', `'''${sections[2].trim()}'''\n\nTranslate this text into English`);

}

function copyToClipboard(elementId) {
  const element = document.getElementById(elementId);
  const textToCopy = element.getAttribute('data-fulltext');

  // Create a temporary textarea to perform the copy operation
  const tempTextArea = document.createElement('textarea');
  tempTextArea.value = textToCopy;
  document.body.appendChild(tempTextArea);
  tempTextArea.select();
  document.execCommand('copy');
  document.body.removeChild(tempTextArea);

  // Provide visual feedback or alert
  alert("Copied to clipboard: \n" + textToCopy.slice(0,20) + "'''");
}