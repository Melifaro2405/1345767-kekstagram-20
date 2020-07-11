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
  var effectLevelControl = formEditImage.querySelector('.effect-level');

  effectsList.addEventListener('change', function (evt) {
    var required = 'effects__preview--' + evt.target.value;
    imgPreview.removeAttribute('style');
    window.slider.setDefaultPosition();

    if (window.effects.currentEffect) {
      imgPreview.classList.remove(window.effects.currentEffect);
    }
    imgPreview.classList.add(required);
    window.effects.currentEffect = required;
    if (evt.target.value === 'none') {
      effectLevelControl.classList.add('hidden');
    } else {
      effectLevelControl.classList.remove('hidden');
    }
  });

  var resetEffects = function () {
    if (window.effects.currentEffect) {
      imgPreview.classList.remove(window.effects.currentEffect);
    }
    imgPreview.removeAttribute('style');
  };

  var setDefaultScale = function () {
    image.style.transform = 'scale(1)';
    scaleValueNumber = window.util.MAX_SCALE;
    scaleValue.value = scaleValueNumber + '%';
  };

  var lessScale = function () {
    if (scaleValueNumber > STEP_SCALE && scaleValueNumber <= 100) {
      scaleValueNumber -= STEP_SCALE;
      image.style.transform = 'scale(' + (scaleValueNumber / 100) + ')';
      scaleValue.value = scaleValueNumber + '%';
    }
  };

  var moreScale = function () {
    if (scaleValueNumber >= STEP_SCALE && scaleValueNumber < 100) {
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

  window.effects = {
    currentEffect: currentEffect,
    defaultScale: setDefaultScale,
    resetEffects: resetEffects
  };
})();
