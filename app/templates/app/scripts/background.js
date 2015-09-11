'use strict';

// Enable chromereload by uncommenting this line:
// import './lib/chromereload';

chrome.runtime.onInstalled.addListener(function (details) {
  console.log('previousVersion', details.previousVersion);
});

console.log('\'Allo \'Allo! Event Page');
