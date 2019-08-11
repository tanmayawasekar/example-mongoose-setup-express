var fs = require('fs');
var path = require('path');

var modelsPath = path.join(__dirname, "../models") ;

// Loop through all the files in models folder
fs.readdir(modelsPath, function (err, files) {
  if (err) {
    console.error("Could not list the directory.", err);
    process.exit(1);
  }

  files.forEach(function (file, index) {
    console.log("Requiring File===>", path.join(__dirname,"../models", file));
    require(path.join(__dirname,"../models", file));
  });
});