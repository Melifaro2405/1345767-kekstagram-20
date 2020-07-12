'use strict';

// -------- Валидация хеш-тегов --------
(function () {
  var MAX_QUANTITY_HASHTAGS = 5;
  var MAX_HASHTAG_LENGTH = 20;
  var formEditImage = document.querySelector('.img-upload__overlay');
  var inputHashtags = formEditImage.querySelector('.text__hashtags');
  var imageUploadSubmit = document.querySelector('.img-upload__submit');

  inputHashtags.addEventListener('input', function () {
    inputHashtags.setCustomValidity('');
  });

  imageUploadSubmit.addEventListener('click', function () {
    var hashtags = inputHashtags.value.toLowerCase().split(' '); // формируем массив из хэштегов
    var pattern = /^#[a-zA-Zа-яА-ЯёЁ0-9]{1,19}$/; // регулярное выражение для проверки валидации хэштега
    var sortedHashtags = hashtags.slice().sort(); // сортируем и проверям хэштеги на совпадение

    inputHashtags.setCustomValidity(''); // очищаем сообщение об ошибке

    if (hashtags.length > MAX_QUANTITY_HASHTAGS) { // проверям количество ввведенных хэштегов
      inputHashtags.setCustomValidity('Количество хэштегов не должно быть больше ' + MAX_QUANTITY_HASHTAGS);
    }

    for (var i = 0; i < sortedHashtags.length; i++) {
      var hashtag = sortedHashtags[i];
      if (hashtag.length === 0) {
        continue;
      }
      if (hashtag === sortedHashtags[i + 1]) { // проверяем на одинаковые хэштеги
        inputHashtags.setCustomValidity('Необходимо удалить хэштег ' + hashtag + ' т.к. он уже используется');
      }
      if (!pattern.test(hashtag)) {
        inputHashtags.setCustomValidity('Хэштег "' + hashtag + '" должен соответствовать шаблону: символ #, за которым следуют любые не специальные символы (от 1 до 20) без пробелов)');
      }
      if (hashtag.length > MAX_HASHTAG_LENGTH) { // проверяем длину одного хэштега
        inputHashtags.setCustomValidity('Количество символов в хэштеге не должно превышать ' + MAX_HASHTAG_LENGTH);
      }
    }
  });
})();
