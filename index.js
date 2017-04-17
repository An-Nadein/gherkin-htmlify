
var fs = require("fs");
var file = require("file");
var path = require('path');

function process(featureDirectoryPath, outputDir, options) {
  if (fs.existsSync(outputDir)) {
    throw outputDir + ' already exists. Please remove it manually.';
  }
  copyFolderRecursiveSync(__dirname + '/html', outputDir);

  var features = [];

  file.walkSync(featureDirectoryToScan,
    function callback(directory, dirs, files) {

      files.forEach(function(file) {

        var filePath = directory + '/' + file;
        var fileContent = fs.readFileSync(filePath, 'utf8');

        console.log(filePath);

        var regExp, match;
        var feature = {};
        feature.name = '';
        feature.description = '';
        feature.meta = []
        feature.tests = [];
        feature.path = filePath.replace(featureDirectoryPath, '').replace('.feature', '');
        features.push(feature);

        var zeroOrMoreAnnotationLine = '(?: *@.*\\n)*';
        var scenarioHeader = zeroOrMoreAnnotationLine + ' *Scenario\\b.*:.*';
        var anyNumberOfChararctersButAsFewAsPossible = '[\\s\\S]+?';
        var followedByAScenarioOrEndOfFile = '(?=(?:' + scenarioHeader + ')|$)';

        match = /([\s\S]*)feature\s*:/gi.exec(fileContent);
        if (match && match[1].trim()) {
          feature.meta = match[1].replace(/\s+/g, ' ').trim().split(' ');
        }
        match = /feature\s*:\s*(.*)\s*\n/gi.exec(fileContent);
        if (match) {
          feature.name = match[1];
        }

        regExp = new RegExp( 'feature\\s*:.*\\n' + '(' + anyNumberOfChararctersButAsFewAsPossible + ')' + followedByAScenarioOrEndOfFile, 'gi');
        match = regExp.exec(fileContent);
        if (match) {
          feature.description = match[1].trim();
        }

        regExp = new RegExp( scenarioHeader + anyNumberOfChararctersButAsFewAsPossible + followedByAScenarioOrEndOfFile, 'gi');
        while((match = regExp.exec(fileContent)) !== null) {
          var text = match[0];
          var test = {};
          test.name = /scenario.*:\s*(.*)/gi.exec(text)[1].trim();
          console.log('  > ' + test.name);

          match = /([\s\S]*)scenario\s*:/gi.exec(text);
          if (match && match[1].trim()) {
            test.meta = match[1].replace(/\s+/g, ' ').trim().split(' ');
          }

          test.content = /scenario.*:.*\s*\n([\s\S]*)/gi.exec(text)[1];
          feature.tests.push(test);
        }

      });
    });

    var features = JSON.stringify(features, null, "\t");

    var output = "var source = {};\n"
    output += "source.project = '" + options.mainTitle + "';\n";
    output += "source.features = " + features + ";\n";
    output += "source.date = '" + getFormattedDate() + "';\n";

    fs.writeFileSync(outputDir +'/data.js', output, {encoding: 'utf8'});
}

var getFormattedDate = function() {
  var date = new Date();
  var hour = date.getHours();
  hour = (hour < 10 ? "0" : "") + hour;
  var min  = date.getMinutes();
  min = (min < 10 ? "0" : "") + min;
  var sec  = date.getSeconds();
  sec = (sec < 10 ? "0" : "") + sec;
  var year = date.getFullYear();
  var month = date.getMonth() + 1;
  month = (month < 10 ? "0" : "") + month;
  var day  = date.getDate();
  day = (day < 10 ? "0" : "") + day;
  return year + ":" + month + ":" + day + ":" + hour + ":" + min + ":" + sec;
}


function copyFileSync( source, target ) {
  var targetFile = target;
  //if target is a directory a new file with the same name will be created
  if ( fs.existsSync( target ) ) {
    if ( fs.lstatSync( target ).isDirectory() ) {
      targetFile = path.join( target, path.basename( source ) );
    }
  }
  fs.writeFileSync(targetFile, fs.readFileSync(source));
}

function copyFolderRecursiveSync( source, target ) {
  var files = [];
  //check if folder needs to be created or integrated
  var targetFolder = path.join( target, path.basename( source ) );
  if ( !fs.existsSync( targetFolder ) ) {
      fs.mkdirSync( targetFolder );
  }
  //copy
  if ( fs.lstatSync( source ).isDirectory() ) {
    files = fs.readdirSync( source );
    files.forEach( function ( file ) {
      var curSource = path.join( source, file );
      if ( fs.lstatSync( curSource ).isDirectory() ) {
        copyFolderRecursiveSync( curSource, targetFolder );
      } else {
        copyFileSync( curSource, targetFolder );
      }
    } );
  }
}