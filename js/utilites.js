'use strict';

(function () {
  // поиск основного блока с классом map

  var map = document.querySelector('.map');

  // случайное число для price от 1000 до 1000000 и rooms от 1 до 5, для количества гостей guest, для координат

  var getRandomNumber = function (min, max) {
    return Math.floor((Math.random() * (max - min) + min));
  };

  // вывод случайного элемента массива

  var getRandomArrayElement = function (array) {
    return array[Math.round(Math.random() * (array.length - 1))];
  };

  // функция удаления отрисованной карточки объявления

  var deleteCard = function () {
    map.removeChild(map.querySelector('.map__card'));
  };


  window.utilites = {
    getRandomNumber: getRandomNumber,
    getRandomArrayElement: getRandomArrayElement,
    deleteCard: deleteCard,
    map: map
  };
})();
