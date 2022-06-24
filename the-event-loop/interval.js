let currentCount = 3;
const logCount = setInterval(() => {
  if (currentCount <= 0) {
    clearInterval(logCount);
    console.log('Blast off!');
    return;
  }
  console.log(currentCount);
  currentCount--;
}, 1000);
