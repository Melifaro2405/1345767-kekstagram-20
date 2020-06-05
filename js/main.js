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

var getRandomInRange = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

var getRandomArray = function (array) {
  var randomIndex = Math.floor(Math.random() * array.length);
  var required = array[randomIndex];
  return required;
};
var getRandomAvatar = function () {
  var randomAvatar = 'img/avatar-' + getRandomInRange(1, AMOUNT_AVATARS) + '.svg';
  return randomAvatar;
};

var generateRandomComment = function (amount) {
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

var generateRandomObjects = function () {
  var objects = [];
  for (var i = 1; i <= AMOUNT_PHOTOS; i++) {
    objects.push({
      url: 'photos/' + i + '.jpg',
      description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam, voluptatum.',
      likes: getRandomInRange(AmountLikes.MIN, AmountLikes.MAX),
      comments: getRandomArray(generateRandomComment(getRandomInRange(AmountComments.MIN, AmountComments.MAX)))
    });
  }
  return objects;
};

var renderPicture = function (picture) {
  var pictureElement = pictureTemplate.cloneNode(true);

  pictureElement.querySelector('.picture__img').src = picture.url;
  pictureElement.querySelector('.picture__likes').textContent = picture.likes;
  pictureElement.querySelector('.picture__comments').textContent = picture.comments;
  return pictureElement;
};

var drewPicture = function () {
  var objects = generateRandomObjects();
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < objects.length; i++) {
    fragment.appendChild(renderPicture(objects[i]));
  }
  picturesContainer.appendChild(fragment);
};

drewPicture();
