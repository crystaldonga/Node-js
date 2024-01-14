const chalk = require('chalk');
const validator = require('validator');

console.log(chalk.blue.underline.inverse('Hello world!'));
//console.log(validator.isEmail('foo@bar.com'));
const validation  = validator.isEmail('foo@bar.m');
console.log(validation?chalk.green.inverse(validation):chalk.red.inverse(validation));