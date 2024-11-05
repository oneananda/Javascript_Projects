# Large File Generator with Progress Bar

This project demonstrates how to generate large files (e.g., 100MB) in the browser with a real-time progress bar. The interface displays a progress bar showing the file generation status and provides a downloadable link upon completion. The project also uses asynchronous file generation to prevent the browser from freezing.

## Features

- **Asynchronous File Generation**: Generates a large file in chunks to avoid blocking the main thread.
- **Real-Time Progress Bar**: Shows the file generation progress as a percentage.
- **GUID-Based Filename**: Each file download includes a unique identifier in the filename to avoid conflicts.
- **Button Locking**: Disables the button during file generation to prevent multiple clicks.

## Files

- `Generate_Large_File_Progress_Bar.html`: The HTML file that includes the button and progress modal interface.
- `Generate_Large_File_Progress_Bar.js`: The JavaScript file containing the logic for generating the large file and updating the progress bar.

## How It Works

1. **File Generation**: The JavaScript function generates a large file in 1MB chunks, updating the progress bar after each chunk. The `setTimeout` method is used to run chunks asynchronously, keeping the UI responsive.
2. **Progress Update**: The progress bar is updated in real-time, showing the file generation percentage.
3. **Download Link**: When the file generation is complete, a download link is created with a unique filename that includes a GUID-based identifier.
4. **Button Management**: The "Generate File" button is disabled during the process and re-enabled once the file is ready.

## Usage

1. Open `Generate_Large_File_Progress_Bar.html` in a browser.
2. Click the **Generate Large File** button.
3. Watch the progress bar fill up as the file is generated.
4. Once complete, the file will automatically download with a unique filename, e.g., `largeFile_ab12c.txt`.

## Code Snippets

### Initialize Progress Bar and Modal

The `Generate_Large_File_Progress_Bar.html` file initializes the button, modal, and includes the JavaScript file:

```html
<button id="generateFile">Generate Large File</button>

<div id="progressModal" class="modal">
  <p>Generating File...</p>
  <div class="progress-bar">
    <div id="progress" class="progress">0%</div>
  </div>
</div>

<script src="Generate_Large_File_Progress_Bar.js"></script>
```

### Generate Large File Asynchronously

The file generation logic in `Generate_Large_File_Progress_Bar.js` works in chunks and updates progress accordingly:

```javascript
function generateChunk() {
  const generateButton = document.getElementById('generateFile');
  generateButton.disabled = true; // Disable the button at the start

  // Chunk-based file generation and progress update
  if (generatedSize < fileSize) {
    setTimeout(generateChunk, 0); // Schedule the next chunk
  } else {
    // Create and download the Blob
    const blob = new Blob([largeText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'largeFile_' + generateAlphaGUID().substring(0, 5) + '.txt';
    a.click();
  }
}
```

### License

This project is open-source and can be modified or distributed as needed.



