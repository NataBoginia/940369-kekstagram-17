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

/**
  * Возвращает случайное целое число в заданном диапазоне,
  * включая или исключая верхнюю границу диапазона
  *
  * @param {number} min - Минимальное значение диапазона
  * @param {number} max - Максимальное значение дипазона
  * @param {boolean} excludeMax - Признак того, что максимальное значение диапазона исключается при генерации случайного числа
  * @return {number} Случайное целое число в заданном диапазоне
  */
var getRandomInt = function (min, max, excludeMax) {
  var randomNumber = Math.random() * (max - min) + min;

  return excludeMax ? Math.floor(randomNumber) : Math.round(randomNumber);
};

/**
  * Генерирует тестовые комментарии в виде массива объектов заданного размера.
  * Параметры каждого комментария задаются случайным образом, используя наборы тестовых данных
  *
  * @param {number} commentsCount - Количество комментариев (размер генерируемого массива)
  * @return {Object[]} Массив комментариев
  */
var createComments = function (commentsCount) {
  var comments = [];

  for (var i = 0; i < commentsCount; i++) {
    var comment = {
      avatar: 'img/avatar-' + getRandomInt(AVATAR_COUNT_MIN, AVATAR_COUNT_MAX, false) + '.svg',
      message: getRandomInt(0, 1, false) ? COMMENTS[getRandomInt(0, COMMENTS.length, true)] : (COMMENTS[getRandomInt(0, COMMENTS.length, true)] + ' ' + COMMENTS[getRandomInt(0, COMMENTS.length, true)]),
      name: NAMES[getRandomInt(0, NAMES.length, true)]
    };

    comments[i] = comment;
  }

  return comments;
};

/**
  * Генерирует тестовые фоторафии в виде массива объектов заданного размера.
  * Параметры каждой фотографии задаются случайным образом, используя наборы тестовых данных
  *
  * @param {number} photosCount - Количество фотографий (размер генерируемого массива)
  * @return {Object[]} Массив фотографий
  */
var createTestPhotos = function (photosCount) {
  var photos = [];

  for (var i = 1; i <= photosCount; i++) {
    var photo = {
      url: 'photos/' + i + '.jpg',
      likes: getRandomInt(LIKES_COUNT_MIN, LIKES_COUNT_MAX, false),
      comments: createComments(getRandomInt(COMMENTS_COUNT_MIN, COMMENTS_COUNT_MAX, false))
    };
    photos[i - 1] = photo;
  }

  return photos;
};

/**
  * Создает DOM-элемент для фотографии по шаблону
  *
  * @param {Object} photo - Объект фотографии
  * @param {Object} template - DOM-элемент шаблона разметки
  * @return {Object} DOM-элемент фотографии
  */
var renderPhoto = function (photo, template) {
  var photoElement = template.cloneNode(true);

  photoElement.querySelector('.picture__img').src = photo.url;
  photoElement.querySelector('.picture__likes').textContent = photo.likes;
  photoElement.querySelector('.picture__comments').textContent = photo.comments.length;

  return photoElement;
};

/**
  * Возвращает DOM-фрагмент, наполненный DOM-элементами всех фотографий
  *
  * @param {Object[]} photos - Массив фотографий
  * @param {Object} template - DOM-элемент шаблона разметки
  * @return {Object} DOM-фрагмент
  */
var createPhotosBlock = function (photos, template) {
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < photos.length; i++) {
    fragment.appendChild(renderPhoto(photos[i], template));
  }

  return fragment;
};

var photos = createTestPhotos(PHOTOS_COUNT);

var pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
var targetPhotoBlock = document.querySelector('.pictures');

targetPhotoBlock.appendChild(createPhotosBlock(photos, pictureTemplate));
