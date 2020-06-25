'use strict';

(function () {

  var picturesContainer = document.querySelector('.pictures');
  var pictureTemplate = document.querySelector('#picture')
    .content
    .querySelector('.picture');
  var bigPicture = document.querySelector('.big-picture');
  var closeBigPicture = bigPicture.querySelector('.big-picture__cancel');
  var socialCommentCount = document.querySelector('.social__comment-count');
  var commentsLoader = document.querySelector('.comments-loader');

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
    pictureElement.querySelector('.picture__comments').textContent = picture.comments.length;
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
    window.backend.load(function (pictures) {
      drewPicture(pictures);
      socialCommentCount.classList.add('hidden');
      commentsLoader.classList.add('hidden');
    });
  };

  window.addEventListener('load', function () {
    init();
  });
})();
