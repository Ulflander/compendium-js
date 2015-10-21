var express = require('express');

var app = express(),
    server;

app.use(express.static(__dirname + '/'));

exports.run = function(){
  server = app.listen(process.env.PORT || 3000,
      function() {
          console.log("Go to http://localhost:" + server.address().port + "/public/")
      })

  .on('error',
      function(err) {
          if (err.errno === 'EADDRINUSE') {
              console.log('Server is already running');
          } else {
              console.log(err);
          }
      })

  .on('exit',
    function(){
      server.close();
    });

}
exports.stop = function(){
  server.emit('exit');
}

