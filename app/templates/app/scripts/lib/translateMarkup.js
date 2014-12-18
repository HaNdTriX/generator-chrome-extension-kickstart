'use strict';

/*
 * Translates each HTML node
 * with a data-message attribute
 *
 * @example
 *   HTML:
 *
 *     <span data-message="appName">MyAppName</span>
 *
 *   JAVASCRIPT:
 *
 *      var translateMarkup = require('./lib/translateMarkup');
 *      translateMarkup();
 *
 */
module.exports = function translateMarkup(selector){
  var tagsToTranslate = document.querySelectorAll(selector || '[data-message]');
  for (i = 0; i < tagsToTranslate.length; i++) {
    if (tagsToTranslate[i].dataset && tagsToTranslate[i].dataset.message) {
      tagsToTranslate[i].innerHTML = chrome.i18n.getMessage(tagsToTranslate[i].dataset.message);
    }
  }
}
