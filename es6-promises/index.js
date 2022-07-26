const takeAChance = require('./take-a-chance');
const returnValue = takeAChance('Garrett');
returnValue.then(value => {
  console.log(value);
});
returnValue.catch(error => {
  console.error(error.message);
});
