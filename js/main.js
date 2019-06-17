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
    comments[i] = COMMENTS[Math.floor(Math.random() * COMMENTS.length)];

    if (true) {
      comments[i] += COMMENTS[Math.floor(Math.random() * COMMENTS.length)];
    }
  }

  return comments;
};


var createTestPhotos = function (photosCount) {
  var photos = [];

  for (var i = 1; i <= photosCount; i++) {
    var photo = {
      url: 'photos/' + i + '.jpg',
      likes: Math.floor(Math.random() * (LIKES_COUNT_MAX - LIKES_COUNT_MIN) + LIKES_COUNT_MIN),
      comments: createComments(Math.floor(Math.random() * (COMMENTS_COUNT_MAX - COMMENTS_COUNT_MIN) + COMMENTS_COUNT_MIN)),
      avatar: 'img/avatar-' + Math.floor(Math.random() * (AVATAR_COUNT_MAX - AVATAR_COUNT_MIN) + AVATAR_COUNT_MIN) + '.svg',
      name: NAMES[Math.floor(Math.random() * NAMES.length)]
    };
    photos[i] = photo;
  }

  return photos;
};

var photos = createTestPhotos(PHOTOS_COUNT);
