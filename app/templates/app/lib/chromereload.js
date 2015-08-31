// Use for background page reloads

if (ENV === 'development') {
  (function() {

    let nextPossibleReloadTime = Date.now() + 1000 * 10;
    let timeoutId = null;
    let LIVERELOAD_HOST = 'localhost:';
    let LIVERELOAD_PORT = 35729;
    let connection = new WebSocket('ws://' + LIVERELOAD_HOST + LIVERELOAD_PORT + '/livereload');

    function reload() {
      let now = Date.now();
      let reloadIn = nextPossibleReloadTime - now;
      let reloadPossible = reloadIn < 0;

      // Chrome considers a reload a "fast reload" 
      // when you call chrome.runtime.reload within 
      // ten seconds after loading the extension. 
      // When your extension triggers more than 
      // five "fast reloads", then the following 
      // warning will be shown in the UI:
      if (reloadPossible) {
        return chrome.runtime.reload();
      } else if (!timeoutId) {
        setTimeout(() => {
          chrome.runtime.reload();
        }, reloadIn);
      }
      console.log('%cChromereload: reloading in %s seconds to prevent fast reload', 'color: gray' ,Math.floor(reloadIn/1000));
    }

    connection.onerror = function(error) {
      console.error('reload connection got error:', error);
    };

    connection.onmessage = function(e) {
      if (e.data) {
        var data = JSON.parse(e.data);
        if (data && data.command === 'reload') {
          reload();
        }
      }
    };

    console.log('%cChromereload: enabled', 'color: gray');
  })();
}