let fs = require('fs');

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.substring(1);
}

module.exports = {};

fs.readdirSync('./models').filter(function(file) {
  return file.match(/^(?!\.).*\.js(?!~)$/) && file !== 'index.js';
}).forEach(function(file) {
  module.exports[capitalize(file.split(/\.js$/)[0])] = require('./' + file);
});
