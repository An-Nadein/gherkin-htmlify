var gherkinHtmlify = require('.');
var featureDirectoryPath = 'C:/git/tcm/gherkin-htmlify/test/features';
var outputDirectory = 'C:/git/tcm/gherkin-htmlify/test/output';
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
                                          
