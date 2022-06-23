exports.divide = function divideValues(a, b) {
  if (isNaN(parseInt(a)) || isNaN(parseInt(b))) {
    return 'invalid input';
  }
  return parseInt(a) / parseInt(b);
};
