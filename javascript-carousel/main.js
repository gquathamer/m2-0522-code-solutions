var img = document.querySelector('.object-fit');
var imgSourceArray = ['./images/001.png', './images/004.png', './images/007.png', './images/025.png', './images/039.png'];
var carouselContainer = document.querySelector('.carousel');

function slideRight() {
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
}

function slideLeft() {
  var imgIndex = imgSourceArray.indexOf(img.getAttribute('src'));
  var dot = document.querySelector('#pic' + imgIndex);
  if (imgIndex === 0) {
    imgIndex = imgSourceArray.length - 1;
    img.src = imgSourceArray[imgIndex];
    dot.classList.remove('fa-solid');
    dot.classList.add('fa-regular');
    dot = document.querySelector('#pic' + imgIndex);
    dot.classList.add('fa-solid');
    return;
  }
  img.src = imgSourceArray[imgIndex - 1];
  dot.classList.remove('fa-solid');
  dot.classList.add('fa-regular');
  var nextDot = document.querySelector('#pic' + (imgIndex - 1));
  nextDot.classList.remove('fa-regular');
  nextDot.classList.add('fa-solid');
}

var intervalID;

function startCarousel() {
  intervalID = setInterval(function () {
    slideRight();
  }, 3000);
}

function stopCarousel() {
  clearInterval(intervalID);
}

carouselContainer.addEventListener('click', function (event) {
  if (event.target.classList.contains('fa-angle-right')) {
    stopCarousel();
    slideRight();
    startCarousel();
  } else if (event.target.classList.contains('fa-angle-left')) {
    stopCarousel();
    slideLeft();
    startCarousel();
  } else if (event.target.classList.contains('fa-circle')) {
    stopCarousel();
    var idArray = event.target.id.split('');
    var imgIndex = parseInt(idArray[idArray.length - 1]);
    var currentImgIndex = imgSourceArray.indexOf(img.getAttribute('src'));
    var currentDot = document.querySelector('#pic' + currentImgIndex);
    var newDot = document.querySelector('#pic' + imgIndex);
    currentDot.classList.remove('fa-solid');
    currentDot.classList.add('fa-regular');
    img.src = imgSourceArray[imgIndex];
    newDot.classList.remove('fa-regular');
    newDot.classList.add('fa-solid');
    startCarousel();
  }
});

startCarousel();
