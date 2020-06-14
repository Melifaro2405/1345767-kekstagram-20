'use strict';

var AMOUNT_PHOTOS = 25;
var AMOUNT_AVATARS = 6;

var AmountComments = {
  MIN: 1,
  MAX: 6
};
var AmountLikes = {
  MIN: 15,
  MAX: 200
};

var userNames = ['Бернард', 'Викентий', 'Корнелий', 'Емельян', 'Федот', 'Макар', 'Харитон', 'Тимон', 'Фекла', 'Авдотья'];
var messages = ['Всё отлично!', 'В целом всё неплохо. Но не всё.', 'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.', 'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.', 'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.', 'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];

var picturesContainer = document.querySelector('.pictures');
var pictureTemplate = document.querySelector('#picture')
  .content
  .querySelector('.picture');
var bigPicture = document.querySelector('.big-picture');
var socialCommentCount = document.querySelector('.social__comment-count');
var commentsLoader = document.querySelector('.comments-loader');

// -------- случайное число в диапазоне --------

var getRandomInRange = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

// -------- случайный элемент массива --------

var getRandomArray = function (array) {
  var randomIndex = Math.floor(Math.random() * array.length);
  var required = array[randomIndex];
  return required;
};

// -------- случайный аватар для комментария --------

var getRandomAvatar = function () {
  var randomAvatar = 'img/avatar-' + getRandomInRange(1, AMOUNT_AVATARS) + '.svg';
  return randomAvatar;
};

// -------- создаем массив объектов с комментариями --------

var generateRandomComments = function (amount) {
  var randomComments = [];
  for (var i = 0; i < amount; i++) {
    randomComments.push({
      avatar: getRandomAvatar(),
      message: getRandomArray(messages),
      name: getRandomArray(userNames)
    });
  }
  return randomComments;
};

// -------- создаем массив превью фотографий --------

var generateRandomObjects = function () {
  var objects = [];
  for (var i = 1; i <= AMOUNT_PHOTOS; i++) {
    objects.push({
      url: 'photos/' + i + '.jpg',
      description: 'Lorem ipsum dolor sit amet.',
      likes: getRandomInRange(AmountLikes.MIN, AmountLikes.MAX),
      comments: generateRandomComments(getRandomInRange(AmountComments.MIN, AmountComments.MAX))
    });
  }
  return objects;
};

// -------- отрисовываем превью фото с адресом, лайками и комментариями --------

var renderPicture = function (picture) {
  var pictureElement = pictureTemplate.cloneNode(true);

  pictureElement.querySelector('.picture__img').src = picture.url;
  pictureElement.querySelector('.picture__likes').textContent = picture.likes;
  pictureElement.querySelector('.picture__comments').textContent = getRandomInRange(AmountComments.MIN, AmountComments.MAX);
  return pictureElement;
};

// -------- отображаем превью фотографий на странице --------

var drewPicture = function (objects) {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < objects.length; i++) {
    fragment.appendChild(renderPicture(objects[i]));
  }
  picturesContainer.appendChild(fragment);
};

// -------- отрисовываем массив превью фотографий --------

var renderSocialComment = function (comment, template) {
  var socialComment = template.cloneNode(true);
  socialComment.querySelector('.social__picture').src = comment.avatar;
  socialComment.querySelector('.social__picture').alt = comment.name;
  socialComment.querySelector('.social__text').textContent = comment.message;
  return socialComment;
};

var renderBigPicture = function (picture) {
  var socialComment = bigPicture.querySelector('.social__comment');
  bigPicture.querySelector('.big-picture__img img').src = picture.url;
  bigPicture.querySelector('.likes-count').textContent = picture.likes;
  bigPicture.querySelector('.social__caption').textContent = picture.description;

  var fragment = document.createDocumentFragment();
  for (var i = 0; i < picture.comments.length; i++) {
    fragment.appendChild(renderSocialComment(picture.comments[i], socialComment));
  }
  if (picture.comments.length > 0) {
    bigPicture.querySelector('.social__comments').innerHTML = '';
  }
  bigPicture.querySelector('.social__comments').appendChild(fragment);
  return bigPicture;
};

var init = function () {
  var pictures = generateRandomObjects();
  drewPicture(pictures);
  renderBigPicture(pictures[0]);
  // bigPicture.classList.remove('hidden');
  socialCommentCount.classList.add('hidden');
  commentsLoader.classList.add('hidden');
  // document.body.classList.add('modal-open');
};

init();

// -------- Загрузка изображения и показ формы редактирования --------

var form = document.querySelector('.img-upload__form');
var openFormButton = document.querySelector('#upload-file');
var closeFormCross = document.querySelector('#upload-cancel');
var formEditImage = document.querySelector('.img-upload__overlay');


openFormButton.addEventListener('change', function () {
  scaleValue.value = scaleValueNumber + '%';
  formEditImage.classList.remove('hidden');
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', function (evt) {
    if (evt.key === 'Escape' && inputHashtags !== document.activeElement && textDescription !== document.activeElement) {
      formEditImage.classList.add('hidden');
      form.reset();
    }
  });
});

closeFormCross.addEventListener('click', function () {
  formEditImage.classList.add('hidden');
  document.body.classList.remove('modal-open');
});

// -------- Применение эффекта для изображения и редактирование размера изображения --------

var effectsList = document.querySelector('.effects__list');
var imgPreview = formEditImage.querySelector('.img-upload__preview');
var image = formEditImage.querySelector('.img-upload__preview img');
var currentEffect = '';
var scaleValue = formEditImage.querySelector('.scale__control--value');
var scaleSmaller = formEditImage.querySelector('.scale__control--smaller');
var scaleBigger = formEditImage.querySelector('.scale__control--bigger');
var scaleValueNumber = 100;

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
    scaleValueNumber -= 25;
    image.style.transform = 'scale(' + (scaleValueNumber / 100) + ')';
    scaleValue.value = scaleValueNumber + '%';
  }
};

var moreScale = function () {
  if (scaleValueNumber >= 0 && scaleValueNumber < 100) {
    scaleValueNumber += 25;
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

// -------- Валидация хеш-тегов --------

var inputHashtags = formEditImage.querySelector('.text__hashtags');
var textDescription = formEditImage.querySelector('.text__description');
var submitImgForm = formEditImage.querySelector('.img-upload__submit');
var stopSubmit; // переменная для прекращения отправки формы
var MAX_QUANTITY_HASHTAGS = 5;
var MIN_HASHTAG_LENGTH = 2;
var MAX_HASHTAG_LENGTH = 20;
var MAX_COMMENT_LENGTH = 140;

inputHashtags.addEventListener('input', function () {
  var arrHashtags = inputHashtags.value.split(' '); // формируем массив из хэштегов

  inputHashtags.setCustomValidity(''); // очищаем сообщение об ошибке
  stopSubmit = false;

  var pattern = /^#[a-zA-Zа-яА-ЯёЁ0-9]{2,20}$/; // регулярное выражение для проверки валидации хэштега

  if (arrHashtags.length > MAX_QUANTITY_HASHTAGS) { // проверям количество ввведенных хэштегов
    stopSubmit = true;
    inputHashtags.setCustomValidity('Количество хэштегов не должно быть больше ' + MAX_QUANTITY_HASHTAGS);
  }

  for (var i = 0; i < arrHashtags.length; i++) { // проверяем соответствие шаблону ^#[a-zA-Zа-яА-ЯёЁ0-9]{2,20}$
    var hashtag = arrHashtags[i];
    if (!pattern.test(hashtag)) {
      stopSubmit = true;
      inputHashtags.setCustomValidity('Хэштег "' + hashtag + '" должен соответствовать шаблону: символ #, за которым следуют любые не специальные символы (от двух до 20-и) без пробелов)');
    }
  }

  var sortedHashtags = arrHashtags.slice().sort(); // сортируем и проверям хэштеги на совпадение
  for (var j = 0; j < sortedHashtags.length; j++) {
    if (sortedHashtags[j] === sortedHashtags[j + 1]) {
      stopSubmit = true;
      inputHashtags.setCustomValidity('Необходимо удалить хэштег ' + sortedHashtags[j] + ' т.к. он уже используется');
    }
  }
});

textDescription.addEventListener('keydown', function (evt) {
  if (evt.key === 'Escape' && textDescription.onfocus) {
    formEditImage.classList.remove('hidden');
    document.body.classList.add('modal-open');
  }
});

// если хотя бы одна проверка не пройдена, прервать отправление формы:
submitImgForm.addEventListener('submit', function (evt) {
  if (stopSubmit) {
    evt.preventDefault();
    return;
  }
});

inputHashtags.addEventListener('invalid', function () {
  if (inputHashtags.validity.tooShort) {
    inputHashtags.setCustomValidity('Хэштег должен состоять минимум из 2-х символов');
  } else if (inputHashtags.validity.tooLong) {
    inputHashtags.setCustomValidity('Хэштег не должен превышать 20-ти символов');
  } else {
    inputHashtags.setCustomValidity('');
  }
});

inputHashtags.addEventListener('input', function () {
  if (inputHashtags.value.length < MIN_HASHTAG_LENGTH) {
    inputHashtags.setCustomValidity('Имя должно состоять минимум из ' + MIN_HASHTAG_LENGTH + ' символов');
  } else if (inputHashtags.value.length > MAX_HASHTAG_LENGTH) {
    inputHashtags.setCustomValidity('Имя должно состоять максимум из ' + MAX_HASHTAG_LENGTH + ' символов');
  } else {
    inputHashtags.setCustomValidity('');
  }
});

textDescription.addEventListener('input', function () {
  if (textDescription.value.length > MAX_HASHTAG_LENGTH) {
    textDescription.setCustomValidity('Имя должно состоять максимум из ' + MAX_COMMENT_LENGTH + ' символов');
  } else {
    textDescription.setCustomValidity('');
  }
});
