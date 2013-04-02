var argv = require('optimist').argv;

if (argv.name) {
  console.log('Hello ' + argv.name + '!');
} else {
  console.log('Hello world!');
}
