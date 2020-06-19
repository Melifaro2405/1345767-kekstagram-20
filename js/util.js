'use strict';

(function () {
  // -------- максимальный масштаб изображения --------
  var MAX_SCALE = 100;
  // -------- случайное число в диапазоне --------
  var getRandomInRange = function (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };
  // -------- случайный элемент массива --------
  var getRandomArray = function (array) {
    var randomIndex = Math.floor(Math.random() * array.length);
    return array[randomIndex];
  };
  window.util = {
    MAX_SCALE: MAX_SCALE,
    getRandomInRange: getRandomInRange,
    getRandomArray: getRandomArray
  };
})();
