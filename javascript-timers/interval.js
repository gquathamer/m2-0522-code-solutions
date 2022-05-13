var countdown = document.querySelector('.countdown-display');

var intervalCount = 4;

var setIntervalReturnValue = setInterval(function () {
  intervalCount--;
  if (intervalCount === 0) {
    countdown.textContent = '~Earth below us~';
    clearInterval(setIntervalReturnValue);
    return;
  }
  countdown.textContent = intervalCount;
}, 1000);
