'use strict';

// Reload client for Chrome Apps & Extensions.
// The reload client has a compatibility with livereload.
// WARNING: only supports reload command.

module.exports = function (host, port) {
  host = host || 'localhost:';
  port = port || 35729;
  var connection = new WebSocket('wss://' + host + port + '/livereload');

  connection.onerror = function(error) {
    console.log('reload connection got error' + JSON.stringify(error));
  };

  connection.onmessage = function(e) {
    if (e.data) {
      var data = JSON.parse(e.data);
      if (data && data.command === 'reload') {
        chrome.runtime.reload();
      }
    }
  };
  return connection;
}
