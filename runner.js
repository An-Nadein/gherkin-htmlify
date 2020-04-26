var pwd = '.';
 var gherkinHtmlify = require(pwd);
var path = require('path');
var featureDirectoryPath = path.join(pwd, '/test/features');
var outputDirectory = path.join(pwd, '/test/output');
var options = {
  mainTitle: "My Meaningful Title"
};                      

let exec = require('child_process').exec
exec('rm -Rf ' + outputDirectory, (error, stdout, stderr) => {
  if (error) {
    console.error(`exec error: ${error}`);
    return;
  }
  console.log(`stdout: ${stdout}`);
  console.error(`stderr: ${stderr}`);
  gherkinHtmlify.process(featureDirectoryPath, outputDirectory, options);
});
                                          
