'use strict';

(function () {
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

  // -------- случайный аватар для комментария --------

  var getRandomAvatar = function () {
    var randomAvatar = 'img/avatar-' + window.util.getRandomInRange(1, AMOUNT_AVATARS) + '.svg';
    return randomAvatar;
  };

  // -------- создаем массив объектов с комментариями --------

  var generateRandomComments = function (amount) {
    var randomComments = [];
    for (var i = 0; i < amount; i++) {
      randomComments.push({
        avatar: getRandomAvatar(),
        message: window.util.getRandomArray(messages),
        name: window.util.getRandomArray(userNames)
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
        likes: window.util.getRandomInRange(AmountLikes.MIN, AmountLikes.MAX),
        comments: generateRandomComments(window.util.getRandomInRange(AmountComments.MIN, AmountComments.MAX))
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
    pictureElement.querySelector('.picture__comments').textContent = window.util.getRandomInRange(AmountComments.MIN, AmountComments.MAX);
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
  };

  document.addEventListener('keydown', function (evt) {
    if (evt.key === 'Escape') {
      closePopupBigPicture();
    }
  });

  var init = function () {
    var pictures = generateRandomObjects();
    drewPicture(pictures);
    socialCommentCount.classList.add('hidden');
    commentsLoader.classList.add('hidden');
  };

  window.addEventListener('load', function () {
    init();
  });
})();