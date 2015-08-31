'use strict';

// Enable chromereload by uncommenting this line:
// import './lib/chromereload';

chrome.runtime.onInstalled.addListener(function (details) {
  console.log('previousVersion', details.previousVersion);
});

console.log('\'Allo \'Allo! Event Page');


test = 1;

super = 'lala';
var super2 = "lala";
