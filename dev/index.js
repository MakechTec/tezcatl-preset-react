const concat = require('concat-files');
 
  concat([
    "./src/ReactCLI.mjs",
    "./src/constants.mjs",
  ], "./prebuild/react-cli.mjs", function(err) {
    if (err) throw err
    console.log('done');
  });