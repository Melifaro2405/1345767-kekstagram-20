'use strict';

(function () {
  // -------- максимальный масштаб изображения --------
  var MAX_SCALE = 100;
  // максимальное количество фото для выбора в категории "случайные":
  var TOTAL_PHOTOS = 10;

  // -------- случайное число в диапазоне --------
  var getRandomInRange = function (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  // -------- случайный элемент массива --------
  var getRandomArray = function (array) {
    return window.util.shuffle(array).slice(0, TOTAL_PHOTOS);
  };
  var shuffle = function (arr) {
    var j;
    var temp;
    for (var i = arr.length - 1; i > 0; i--) {
      j = Math.floor(Math.random() * (i + 1));
      temp = arr[j];
      arr[j] = arr[i];
      arr[i] = temp;
    }
    return arr;
  };

  window.util = {
    MAX_SCALE: MAX_SCALE,
    getRandomInRange: getRandomInRange,
    getRandomArray: getRandomArray,
    shuffle: shuffle
  };
})();
