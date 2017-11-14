var fs = require('fs');
var path = require('path');

function addGitIgnoreFile(dir) {
  fs.readdir(dir, 'utf8', function(err, files) {
    if (err) {
      console.log(err.message);
      return;
    }

    var len = files.length;
    if (len === 0) {
      var gitFilePath = dir + '/' + '.gitignore';
      fs.open(gitFilePath, 'w', function(err, fd) {
        if (err) {
          console.log(err.message);
          return;
        }

        fs.close(fd, function(err) {
          if (err) {
            console.log(err.message);
          }
        })
      });
    } 

    else {
      index = 0;
      for (var i = 0; i < len; i++) {
        var filePath = path.join(dir, files[i]);
        var isDir = fs.statSync(filePath).isDirectory();
        
        if (isDir) {
          addGitIgnoreFile(filePath);
        }
      }
    }
  });
}

var dir = __dirname;
addGitIgnoreFile(dir);