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
var closeBigPicture = bigPicture.querySelector('.big-picture__cancel');
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
var openPopupBigPicture = function () {
  bigPicture.classList.remove('hidden');
  document.body.classList.add('modal-open');
};

var closePopupBigPicture = function () {
  bigPicture.classList.add('hidden');
  document.body.classList.remove('modal-open');
};

var renderPicture = function (picture) {
  var pictureElement = pictureTemplate.cloneNode(true);

  pictureElement.querySelector('.picture__img').src = picture.url;
  pictureElement.querySelector('.picture__likes').textContent = picture.likes;
  pictureElement.querySelector('.picture__comments').textContent = getRandomInRange(AmountComments.MIN, AmountComments.MAX);
  pictureElement.addEventListener('click', function () {
    renderBigPicture(picture);
  });
  closeBigPicture.addEventListener('click', function () {
    closePopupBigPicture();
  });
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
  openPopupBigPicture();

  document.addEventListener('keydown', function (evt) {
    if (evt.key === 'Escape') {
      closePopupBigPicture();
    }
  });
};

var init = function () {
  var pictures = generateRandomObjects();
  drewPicture(pictures);
  socialCommentCount.classList.add('hidden');
  commentsLoader.classList.add('hidden');
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
    if (evt.key === 'Escape' && currentEffect && inputHashtags !== document.activeElement && textDescription !== document.activeElement) {
      formEditImage.classList.add('hidden');
      form.reset();
      imgPreview.classList.remove(currentEffect);
      defaultScale();
    }
  });
});

closeFormCross.addEventListener('click', function () {
  formEditImage.classList.add('hidden');
  document.body.classList.remove('modal-open');
  if (currentEffect) {
    imgPreview.classList.remove(currentEffect);
  }
  defaultScale();
});

// -------- Применение эффекта для изображения и редактирование размера изображения --------

var effectsList = document.querySelector('.effects__list');
var imgPreview = formEditImage.querySelector('.img-upload__preview');
var image = formEditImage.querySelector('.img-upload__preview img');
var currentEffect = '';
var scaleValue = formEditImage.querySelector('.scale__control--value');
var scaleSmaller = formEditImage.querySelector('.scale__control--smaller');
var scaleBigger = formEditImage.querySelector('.scale__control--bigger');
var MAX_SCALE = 100;
var scaleValueNumber = MAX_SCALE;

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

var defaultScale = function () {
  image.style.transform = 'scale(1)';
  scaleValueNumber = MAX_SCALE;
  scaleValue.value = scaleValueNumber + '%';
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
var submitForm = formEditImage.querySelector('.img-upload__submit');
var MAX_QUANTITY_HASHTAGS = 5;
var MAX_HASHTAG_LENGTH = 20;

submitForm.addEventListener('click', function () {
  var arrHashtags = inputHashtags.value.toLowerCase().split(' '); // формируем массив из хэштегов
  var pattern = /^#[a-zA-Zа-яА-ЯёЁ0-9]{2,20}$/; // регулярное выражение для проверки валидации хэштега
  var sortedHashtags = arrHashtags.slice().sort(); // сортируем и проверям хэштеги на совпадение

  if (arrHashtags.length > MAX_QUANTITY_HASHTAGS) { // проверям количество ввведенных хэштегов
    inputHashtags.setCustomValidity('Количество хэштегов не должно быть больше ' + MAX_QUANTITY_HASHTAGS);
  }

  for (var j = 0; j < sortedHashtags.length; j++) {
    var hashtag = sortedHashtags[j];
    if (hashtag === sortedHashtags[j + 1]) { // проверяем на одинаковые хэштеги
      inputHashtags.setCustomValidity('Необходимо удалить хэштег ' + hashtag + ' т.к. он уже используется');
    }
    if (hashtag.length > MAX_HASHTAG_LENGTH) { // проверяем длину одного хэштега
      inputHashtags.setCustomValidity('Количество символов в хэштеге не должно превышать ' + MAX_HASHTAG_LENGTH);
    }
    if (!pattern.test(hashtag)) {
      inputHashtags.setCustomValidity('Хэштег "' + hashtag + '" должен соответствовать шаблону: символ #, за которым следуют любые не специальные символы (от двух до 20-и) без пробелов)');
    } else {
      inputHashtags.setCustomValidity(''); // очищаем сообщение об ошибке
    }
  }
});
