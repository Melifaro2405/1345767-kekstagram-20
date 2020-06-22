'use strict';

// -------- Создание слайдера --------

(function () {
  var SLIDER_DEFAULT_POSITION = 100;

  var slider = document.querySelector('.img-upload__effect-level');
  var sliderValue = slider.querySelector('.effect-level__value');
  var sliderLine = slider.querySelector('.effect-level__line');
  var yellowLine = slider.querySelector('.effect-level__depth');
  var sliderPin = slider.querySelector('.effect-level__pin');

  var form = document.querySelector('.img-upload__form');
  var image = form.querySelector('.img-upload__preview');

  // получаем пропорцию исходя из текущего положения пина (value) относительно общей длины слайдера (width):
  var getRatio = function (value, width) {
    return Math.floor(value * 100 / width);
  };
  // устанавливает положение пина, input.value, размер жёлтой полоски:
  var setPosition = function (value, width) {
    sliderPin.style.left = value + 'px';
    var effect = getRatio(value, width);
    // - заполняем инпут:
    sliderValue.value = effect;
    // - формирует длину жёлтой полоски левее пина:
    yellowLine.style.width = effect + '%';
  };

  var setDefaultPosition = function () {
    sliderPin.style.left = SLIDER_DEFAULT_POSITION + '%';
    yellowLine.style.width = SLIDER_DEFAULT_POSITION + '%';
  };

  // в зависимости от пропорции - меняем эффект:
  var changeFilter = function (effect) {
    slider.classList.remove('hidden');
    if (image.classList.contains('effects__preview--chrome')) {
      // для эффекта «Хром» — filter: grayscale(0..1);
      image.style.filter = 'grayscale(' + effect + '%)'; // * 0.1
    } else if (image.classList.contains('effects__preview--sepia')) {
      // для эффекта «Сепия» — filter: sepia(0..1);
      image.style.filter = 'sepia(' + effect + '%)'; // * 0.1
    } else if (image.classList.contains('effects__preview--marvin')) {
      // для эффекта «Марвин» — filter: invert(0..100%);
      image.style.filter = 'invert(' + effect + '%)';
    } else if (image.classList.contains('effects__preview--phobos')) {
      // для эффекта «Фобос» — filter: blur(0..3px);
      image.style.filter = 'blur(' + (effect * 4 / 100) + 'px)';
    } else if (image.classList.contains('effects__preview--heat')) {
      // для эффекта «Зной» — filter: brightness(1..3);
      image.style.filter = 'brightness(' + (effect * 3 / 100) + ')';
    }
  };

  // зажимаем ЛКМ на пине слайдера
  sliderPin.addEventListener('mousedown', function (evtDown) {
    evtDown.preventDefault();
    // координаты первоначальной точки
    var sliderSizes = sliderLine.getBoundingClientRect();

    var onMouseMove = function (evtMove) {
      evtMove.preventDefault();
      var position = evtMove.clientX - sliderSizes.x;

      // если курсор вышел за пределы слайдера
      if (position < 0) {
        // оставляем пин в пределах шкалы
        position = 0;
      } else if (position > sliderSizes.width) {
        position = sliderSizes.width;
      } else {
        // в остальных случаях позиция курсора равна позиции пина
        setPosition(position, sliderSizes.width);
        // - получаем пропорцию и изменяем в соответствии с ним эффект:
        var change = getRatio(position, sliderSizes.width);
        changeFilter(change);
      }
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

  window.slider = {
    setDefaultPosition: setDefaultPosition
  };
})();
