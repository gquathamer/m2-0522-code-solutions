const addModule = require('./add');

const subtractModule = require('./subtract');

const multiplyModule = require('./multiply');

const divideModule = require('./divide');

const firstParameter = process.argv[2];

const operator = process.argv[3];

const secondParameter = process.argv[4];

if (operator === 'plus') {
  console.log(addModule.add(firstParameter, secondParameter));
} else if (operator === 'minus') {
  console.log(subtractModule.subtract(firstParameter, secondParameter));
} else if (operator === 'times') {
  console.log(multiplyModule.times(firstParameter, secondParameter));
} else if (operator === 'divided') {
  console.log(divideModule.divide(firstParameter, secondParameter));
} else {
  console.log('invalid operator');
}
