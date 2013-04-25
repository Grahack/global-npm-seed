var argv = require('optimist').argv;

console.log('Hello ' + (argv.name || 'World') + '!');
