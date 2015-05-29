var fs = require('fs');

var path = process.argv[2];

fs.stat(path, function(err, stat) {
  if (err && err.code != 'ENOENT') {
    console.error(err.message);
  }
  else if(stat) {
    console.log(stat.size);
  }
});
