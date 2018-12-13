'use strict';

// randomize-data.js
// случайное число для price от 1000 до 1000000 и rooms от 1 до 5, для количества гостей guest, для координат

(function () {
  var getRandomNumber = function (min, max) {
    return Math.floor((Math.random() * (max - min) + min));
  };

  // вывод случайного элемента массива

  var getRandomArrayElement = function (array) {
    return array[Math.round(Math.random() * (array.length - 1))];
  };

  window.randomizeData = {
    getRandomNumber: getRandomNumber,
    getRandomArrayElement: getRandomArrayElement
  };
})();
