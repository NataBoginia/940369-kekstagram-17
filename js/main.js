'use strict';

var LIKES_COUNT_MIN = 15;
var LIKES_COUNT_MAX = 200;
var COMMENTS_COUNT_MIN = 0;
var COMMENTS_COUNT_MAX = 10;
var AVATAR_COUNT_MIN = 1;
var AVATAR_COUNT_MAX = 6;

var PHOTOS_COUNT = 25;

var COMMENTS = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];

var NAMES = ['Анна', 'Богдан', 'Виктория', 'Гена', 'Дима', 'Ева', 'Женя', 'Зина', 'Ира', 'Константин'];

var createComments = function (commentsCount) {
  var comments = [];

  for (var i = 0; i < commentsCount; i++) {
    var comment = {
      avatar: 'img/avatar-' + (Math.round(Math.random() * (AVATAR_COUNT_MAX - AVATAR_COUNT_MIN)) + AVATAR_COUNT_MIN) + '.svg',
      message: (Math.round(Math.random())) ? (COMMENTS[Math.floor(Math.random() * COMMENTS.length)]) : (COMMENTS[Math.floor(Math.random() * COMMENTS.length)] + ' ' + COMMENTS[Math.floor(Math.random() * COMMENTS.length)]),
      name: NAMES[Math.floor(Math.random() * NAMES.length)]
    };

    comments[i] = comment;
  }

  return comments;
};

var createTestPhotos = function (photosCount) {
  var photos = [];

  for (var i = 1; i <= photosCount; i++) {
    var photo = {
      url: 'photos/' + i + '.jpg',
      likes: Math.round(Math.random() * (LIKES_COUNT_MAX - LIKES_COUNT_MIN)) + LIKES_COUNT_MIN,
      comments: createComments(Math.round(Math.random() * (COMMENTS_COUNT_MAX - COMMENTS_COUNT_MIN)) + COMMENTS_COUNT_MIN)
    };
    photos[i - 1] = photo;
  }

  return photos;
};

var renderPhoto = function (photo, template) {
  var photoElement = template.cloneNode(true);

  photoElement.querySelector('.picture__img').src = photo.url;
  photoElement.querySelector('.picture__likes').textContent = photo.likes;
  photoElement.querySelector('.picture__comments').textContent = photo.comments.length;

  return photoElement;
};

var createPhotosBlock = function (photos, template) {
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < photos.length; i++) {
    fragment.appendChild(renderPhoto(photos[i], template));
  }

  return fragment;
};

var pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
var targetPhotoBlock = document.querySelector('.pictures');

var photos = createTestPhotos(PHOTOS_COUNT);

targetPhotoBlock.appendChild(createPhotosBlock(photos, pictureTemplate));
