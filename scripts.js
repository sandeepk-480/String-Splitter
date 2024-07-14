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

  // Display the sections
  document.getElementById('output1').textContent = `'''${sections[0].trim()}'''`;
  document.getElementById('output2').textContent = `'''${sections[1].trim()}'''`;
  document.getElementById('output3').textContent = `'''${sections[2].trim()}'''`;

  // // Show the output sections and copy buttons
  // document.getElementById('output1').style.display = 'block';
  // document.getElementById('output2').style.display = 'block';
  // document.getElementById('output3').style.display = 'block';
  // document.querySelectorAll('.copy-button').forEach(button => button.style.display = 'inline-block');
}

function copyToClipboard(elementId) {
  const textToCopy = document.getElementById(elementId).textContent.trim();

  // Create a temporary textarea to perform the copy operation
  const tempTextArea = document.createElement('textarea');
  tempTextArea.value = textToCopy;
  document.body.appendChild(tempTextArea);
  tempTextArea.select();
  document.execCommand('copy');
  document.body.removeChild(tempTextArea);

  // Provide visual feedback or alert
  alert('Copied to clipboard: ' + textToCopy.slice(0,100));
}
