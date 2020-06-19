'use strict';

// -------- Применение эффекта для изображения и редактирование размера изображения --------

(function () {
  var STEP_SCALE = 25;
  var effectsList = document.querySelector('.effects__list');
  var formEditImage = document.querySelector('.img-upload__overlay');
  var imgPreview = formEditImage.querySelector('.img-upload__preview');
  var image = formEditImage.querySelector('.img-upload__preview img');
  var currentEffect = '';
  var scaleValue = formEditImage.querySelector('.scale__control--value');
  var scaleSmaller = formEditImage.querySelector('.scale__control--smaller');
  var scaleBigger = formEditImage.querySelector('.scale__control--bigger');
  var scaleValueNumber = window.util.MAX_SCALE;

  effectsList.addEventListener('change', function (evt) {
    var required = 'effects__preview--' + evt.target.value;
    if (currentEffect) {
      imgPreview.classList.remove(currentEffect);
    }
    imgPreview.classList.add(required);
    currentEffect = required;
  });

  var lessScale = function () {
    if (scaleValueNumber > 0 && scaleValueNumber <= 100) {
      scaleValueNumber -= STEP_SCALE;
      image.style.transform = 'scale(' + (scaleValueNumber / 100) + ')';
      scaleValue.value = scaleValueNumber + '%';
    }
  };

  var moreScale = function () {
    if (scaleValueNumber >= 0 && scaleValueNumber < 100) {
      scaleValueNumber += STEP_SCALE;
      image.style.transform = 'scale(' + (scaleValueNumber / 100) + ')';
      scaleValue.value = scaleValueNumber + '%';
    }
  };

  scaleSmaller.addEventListener('click', function () {
    lessScale();
  });

  scaleBigger.addEventListener('click', function () {
    moreScale();
  });
})();
