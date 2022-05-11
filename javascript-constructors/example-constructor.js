function ExampleConstructor() {}
console.log('value of prototype property of ExampleConstructor ', ExampleConstructor.prototype);
console.log('typeof ExampleConstructor function: ', typeof ExampleConstructor);
var newExample = new ExampleConstructor();
console.log('value of newExample: ', newExample);
console.log('is newExample instance of ExampleConstructor: ', newExample instanceof ExampleConstructor);
