'use strict';

(function () {
  window.randomize = {
    // -------- случайное число в диапазоне --------
    getRandomInRange: function (min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    },
    // -------- случайный элемент массива --------
    getRandomArray: function (array) {
      var randomIndex = Math.floor(Math.random() * array.length);
      return array[randomIndex];
    }
  };
})();
