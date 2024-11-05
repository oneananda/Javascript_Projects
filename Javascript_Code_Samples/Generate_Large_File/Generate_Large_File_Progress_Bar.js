  document.getElementById('generateFile').addEventListener('click', () => {
      // Open the modal
      const modal = document.getElementById('progressModal');
      modal.style.display = 'block';
      
      const progressElement = document.getElementById('progress');
      const fileSize = 100 * 1024 * 1024; // 100MB
      const chunkSize = 1 * 1024 * 1024; // 1MB chunks
      let generatedSize = 0;
      let largeText = '';

      // Function to update the progress bar
      function updateProgress() {
        const percent = Math.min((generatedSize / fileSize) * 100, 100).toFixed(0);
        progressElement.style.width = percent + '%';
        progressElement.textContent = percent + '%';
      }
	  
	  function generateAlphaGUID() {
		return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
		const randomChar = String.fromCharCode(97 + Math.floor(Math.random() * 26)); // a-z
		return randomChar;
		});
	  }
	  
      // Recursive function to generate the file asynchronously
      function generateChunk() {
		const generateButton = document.getElementById('generateFile');

		generateButton.disabled = true; // Disable the button at the start
        // Generate a chunk of text
        largeText += new Array(chunkSize + 1).join('A');
        generatedSize += chunkSize;

        // Update the progress bar
        updateProgress();

        // Check if the file generation is complete
        if (generatedSize < fileSize) {
          // Schedule the next chunk
          setTimeout(generateChunk, 0);
        } else {
          // Once complete, create and download the Blob
          const blob = new Blob([largeText], { type: 'text/plain' });
          const url = URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = 'largeFile_' + generateAlphaGUID().substring(0, 5) + '.txt';
          a.style.display = 'none';
          document.body.appendChild(a);
          a.click();

          // Clean up and close the modal
          URL.revokeObjectURL(url);
          document.body.removeChild(a);
          modal.style.display = 'none';
		  const generateButton = document.getElementById('generateFile');
		  generateButton.disabled = false;
        }
      }
      // Start generating the file
      generateChunk();
    });