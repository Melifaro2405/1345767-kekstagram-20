'use strict';

// -------- Загрузка изображения и показ формы редактирования --------

(function () {
  var main = document.querySelector('main');
  var form = document.querySelector('.img-upload__form');
  var openFormButton = document.querySelector('#upload-file');
  var closeFormCross = document.querySelector('#upload-cancel');
  var formEditImage = document.querySelector('.img-upload__overlay');
  var scaleValue = formEditImage.querySelector('.scale__control--value');
  var inputHashtags = formEditImage.querySelector('.text__hashtags');
  var textDescription = formEditImage.querySelector('.text__description');
  var effectLevelControl = formEditImage.querySelector('.effect-level');

  var openPopup = function () {
    formEditImage.classList.remove('hidden');
    document.body.classList.add('modal-open');
  };

  var closePopup = function () {
    formEditImage.classList.add('hidden');
    document.body.classList.remove('modal-open');
  };

  var resetForm = function () {
    form.reset();
    window.effects.defaultScale();
    window.effects.resetEffects();
  };

  var closeForm = function (evt) {
    if (evt.key === 'Escape' && window.effects.currentEffect && inputHashtags !== document.activeElement && textDescription !== document.activeElement) {
      closePopup();
      resetForm();
      document.removeEventListener('keydown', closeForm);
    }
  };

  openFormButton.addEventListener('change', function () {
    openPopup();
    scaleValue.value = window.util.MAX_SCALE + '%';
    effectLevelControl.classList.add('hidden');
    document.addEventListener('keydown', closeForm);
  });

  closeFormCross.addEventListener('click', function () {
    closePopup();
    resetForm();
  });

  // -------- Удачная и неудачная попытки отправки формы --------

  var successSubmitMessage = function () {
    var templateSuccessWindow = document.querySelector('#success')
      .content
      .querySelector('.success');
    var successWindow = templateSuccessWindow.cloneNode(true);
    main.appendChild(successWindow);

    var closeSuccessWindow = function () {
      successWindow.remove();
      document.removeEventListener('keydown', onSuccessWindowEsc);
    };

    var onSuccessButtonClick = function () {
      closeSuccessWindow();
    };

    var onSuccessWindowEsc = function (evt) {
      if (evt.key === 'Escape') {
        closeSuccessWindow();
      }
    };

    successWindow.addEventListener('click', onSuccessButtonClick);
    document.addEventListener('keydown', onSuccessWindowEsc);
  };

  var onSuccess = function () {
    closePopup();
    resetForm();
    successSubmitMessage();
  };

  var onError = function (messageError) {
    var templateErrorWindow = document.querySelector('#error')
      .content
      .querySelector('.error');

    var errorWindow = templateErrorWindow.cloneNode(true);
    errorWindow.querySelector('.error__title').textContent = messageError;
    main.appendChild(errorWindow);

    var closeErrorWindow = function () {
      errorWindow.remove();
      document.removeEventListener('keydown', onErrorWindowEsc);
    };

    var onErrorWindowClick = function () {
      closeErrorWindow();
    };

    var onErrorWindowEsc = function (evt) {
      if (evt.key === 'Escape') {
        closeErrorWindow();
      }
    };

    errorWindow.addEventListener('click', onErrorWindowClick);
    document.addEventListener('keydown', onErrorWindowEsc);

    closePopup();
    resetForm();
  };

  form.addEventListener('submit', function (evt) {
    evt.preventDefault();
    window.backend.save(new FormData(form), onSuccess, onError);
  });
})();
