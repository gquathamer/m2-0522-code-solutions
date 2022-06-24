exports.times = function multiplyValues(a, b) {
  if (isNaN(parseFloat(a)) || isNaN(parseFloat(b))) {
    return 'invalid input';
  }
  return parseFloat(a) * parseFloat(b);
};
