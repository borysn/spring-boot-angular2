/* fixBootstrapLoader.js */
const fs = require('fs');

/**
 *
 * the use of postcss requires a postcss.config.js file
 * be present, even if it is just an empty module export.
 *
 */

// create post css config
function createPostCssConfig() {
  let file = 'node_modules/bootstrap-loader/postcss.config.js';
  let content = 'module.exports = {};\n';
  let fw = fs.createWriteStream(file);
 
  // log when finished
  fw.on('finish', function() {
    console.log('postcss bootstrap-loader fix applied');
    console.log('  -postcss.config.js has been created\n');
  });

  // write and end
  fw.write(content);
  fw.end();
}

// run function
createPostCssConfig();
