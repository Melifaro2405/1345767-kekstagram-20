'use strict';

// -------- Загрузка изображения и показ формы редактирования --------

(function () {
  var scaleValueNumber = window.util.MAX_SCALE;
  var form = document.querySelector('.img-upload__form');
  var openFormButton = document.querySelector('#upload-file');
  var closeFormCross = document.querySelector('#upload-cancel');
  var formEditImage = document.querySelector('.img-upload__overlay');
  var imgPreview = formEditImage.querySelector('.img-upload__preview');
  var image = formEditImage.querySelector('.img-upload__preview img');
  var scaleValue = formEditImage.querySelector('.scale__control--value');
  var inputHashtags = formEditImage.querySelector('.text__hashtags');
  var textDescription = formEditImage.querySelector('.text__description');
  var currentEffect = '';
  var effectLevelControl = formEditImage.querySelector('.effect-level');

  var defaultScale = function () {
    image.style.transform = 'scale(1)';
    scaleValueNumber = window.util.MAX_SCALE;
    scaleValue.value = scaleValueNumber + '%';
  };

  var closeForm = function (evt) {
    if (evt.key === 'Escape' && currentEffect && inputHashtags !== document.activeElement && textDescription !== document.activeElement) {
      formEditImage.classList.add('hidden');
      form.reset();
      imgPreview.classList.remove(currentEffect);
      defaultScale();
      document.removeEventListener('keydown', closeForm);
    }
  };

  openFormButton.addEventListener('change', function () {
    scaleValue.value = scaleValueNumber + '%';
    formEditImage.classList.remove('hidden');
    document.body.classList.add('modal-open');
    effectLevelControl.classList.add('hidden');
    document.addEventListener('keydown', closeForm);
  });

  closeFormCross.addEventListener('click', function () {
    formEditImage.classList.add('hidden');
    document.body.classList.remove('modal-open');
    if (currentEffect) {
      imgPreview.classList.remove(currentEffect);
    }
    defaultScale();
  });
})();
