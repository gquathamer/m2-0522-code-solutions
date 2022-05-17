var img = document.querySelector('.object-fit');
var imgSourceArray = ['./images/001.png', './images/004.png', './images/007.png', './images/025.png', './images/039.png'];

setInterval(function () {
  var imgIndex = imgSourceArray.indexOf(img.getAttribute('src'));
  var dot = document.querySelector('#pic' + imgIndex);
  if (imgIndex === imgSourceArray.length - 1) {
    imgIndex = 0;
    img.src = imgSourceArray[imgIndex];
    dot.classList.remove('fa-solid');
    dot.classList.add('fa-regular');
    dot = document.querySelector('#pic' + imgIndex);
    dot.classList.add('fa-solid');
    return;
  }
  img.src = imgSourceArray[imgIndex + 1];
  dot.classList.remove('fa-solid');
  dot.classList.add('fa-regular');
  var nextDot = document.querySelector('#pic' + (imgIndex + 1));
  nextDot.classList.remove('fa-regular');
  nextDot.classList.add('fa-solid');
}, 3000);
