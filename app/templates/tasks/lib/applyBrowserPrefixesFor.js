/**
 * Converts and removes keys with a
 * browser prefix to the key without prefix
 *
 * Example:
 *
 *    __chrome__keyName
 *    __firefox__keyName
 *    __opera__keyName
 *
 * to `keyName`.
 * This way we can write one manifest thats valid
 * for all browsers
 *
 * @param  {Object} manifest
 * @return {Object}
 */
export default function applyBrowserPrefixesFor(vendor){
  return function(manifest){
    Object.keys(manifest).forEach((key)=>{
      let match = key.match(/^__(chrome|firefox|opera)__(.*)/);

      if(!match){
        return;
      }

      // Swap key with non prefixed name
      if(match[1] === vendor){
        manifest[match[2]] = manifest[key];
      }

      // Remove the prefixed key
      // so it won't cause warings
      delete manifest[key];

    });
    return manifest;
  }
};
