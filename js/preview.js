'use strict';

(function () {

  var COMMENTS_AT_A_TIME = 5; // количество комментариев при показе за раз
  var picturesContainer = document.querySelector('.pictures');
  var pictureTemplate = document.querySelector('#picture')
    .content
    .querySelector('.picture');
  var bigPicture = document.querySelector('.big-picture');
  var closeBigPicture = bigPicture.querySelector('.big-picture__cancel');
  var socialCommentCount = document.querySelector('.social__comment-count');
  var commentsLoader = document.querySelector('.comments-loader');
  var commentsContainer = bigPicture.querySelector('.social__comments');
  var imageFilter = document.querySelector('.img-filters');
  var pictures = document.querySelector('.pictures');
  var picturesStorage = [];

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

    return pictureElement;
  };

  var clearPictures = function () {
    pictures.querySelectorAll('.picture').forEach(function (picture) {
      picture.remove();
    });
  };

  // -------- отображаем превью фотографий на странице --------

  var drewPicture = function (objects) {
    clearPictures();
    var fragment = document.createDocumentFragment();
    objects.forEach(function (item) {
      fragment.appendChild(renderPicture(item));
    });
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
    var countOfClicks = 0;

    var setNumerationComments = function (currentCommentCounter, totalCommentCounter) {
      if (currentCommentCounter > totalCommentCounter) {
        currentCommentCounter = totalCommentCounter;
      }
      var textCountComments = currentCommentCounter + ' из ' + totalCommentCounter + ' комментариев';
      socialCommentCount.textContent = textCountComments;
    };

    bigPicture.querySelector('.big-picture__img img').src = picture.url;
    bigPicture.querySelector('.likes-count').textContent = picture.likes;
    bigPicture.querySelector('.social__caption').textContent = picture.description;

    var drewComments = function () {
      var count = COMMENTS_AT_A_TIME * countOfClicks++;
      var countComments = count + COMMENTS_AT_A_TIME;
      var comments = picture.comments.slice(count, countComments);
      var commentsFragment = document.createDocumentFragment();
      comments.forEach(function (comment) {
        commentsFragment.appendChild(renderSocialComment(comment, socialComment));
      });
      commentsContainer.appendChild(commentsFragment);
      if ((countComments) >= picture.comments.length) {
        commentsLoader.classList.add('hidden');
      }
      setNumerationComments(countComments, picture.comments.length);
    };

    var onCommentsLoaderClick = function () {
      drewComments();
    };

    commentsLoader.addEventListener('click', onCommentsLoaderClick);

    if (picture.comments.length > 0) {
      commentsContainer.innerHTML = '';
    }
    commentsLoader.classList.remove('hidden');

    drewComments();
    openPopupBigPicture();

    document.addEventListener('keydown', function (evt) {
      if (evt.key === 'Escape') {
        closePopupBigPicture();
        commentsLoader.removeEventListener('click', onCommentsLoaderClick);
      }
    });

    closeBigPicture.addEventListener('click', function () {
      closePopupBigPicture();
      commentsLoader.removeEventListener('click', onCommentsLoaderClick);
    });
  };

  var useFilter = function (filter) {
    var photos = picturesStorage.slice();
    switch (filter) {
      case 'filter-random':
        photos = window.util.getRandomArray(photos);
        break;
      case 'filter-discussed':
        photos.sort(function (a, b) {
          return b.comments.length - a.comments.length;
        });
        break;
      default: break;
    }
    drewPicture(photos);
  };

  var init = function () {
    window.backend.load(function (allPictures) {
      picturesStorage = allPictures;
      drewPicture(allPictures);
    });
    imageFilter.classList.remove('img-filters--inactive');
  };

  window.addEventListener('load', function () {
    init();
  });

  window.preview = {
    useFilterDebounce: window.debounce(useFilter)
  };

})();
