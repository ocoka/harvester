var __karmaWebpackManifest__ = [];
window.env = {
  apiHost: ''
}

// require all modules ending in "_test" from the
// current directory and all subdirectories
var testsContext = require.context('./', true, /\.spec\.(ts|js)$/);

function inManifest (path) {
  return __karmaWebpackManifest__.indexOf(path) >= 0;
}

var runnable = testsContext.keys().filter(inManifest);

// Run all tests if we didn't find any changes
if (!runnable.length) {
  runnable = testsContext.keys();
}

runnable.forEach(testsContext);
