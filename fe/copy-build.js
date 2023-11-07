const fs = require('fs-extra');

// Define the source directory (the build directory)
const sourceDirectory = 'build';

// Define the target directory (the absolute path)
const targetDirectory = 'C:/laragon/www/kk/';

fs.copy(sourceDirectory, targetDirectory, (err) => {
  if (err) {
    console.error('Error copying build directory:', err);
  } else {
    console.log('Build directory copied successfully.');
  }
});
