'use strict';

// pins.js

// создание и отрисовка маркеров


(function () {
  // поиск блока в DOM дереве, куда будут вставляться маркеры

  var pinsList = document.querySelector('.map__pins');

  // поиск шаблона маркера
  var similarPinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

  // поиск места в DOM дереве для добавления карточки товара

  var mapFilterContainer = document.querySelector('.map__filters-container');

  // функция отрисовки маркера

  var getPinTemplate = function (dataList) {
    var pinElement = similarPinTemplate.cloneNode(true);
    pinElement.style.left = dataList.location.x + 'px';
    pinElement.style.top = dataList.location.y + 'px';
    var pinImage = pinElement.querySelector('img');
    pinImage.src = dataList.author.avatar;
    pinImage.alt = dataList.offer.title;

    // обработчик для вызова карточки объявления при клике на маркер.
    // При клике на другой маркер удаляется старая карточка и создается новая

    pinElement.addEventListener('click', function () {
      if (window.map.querySelector('.map__card') !== null) {
        window.deleteCard();
      }

      window.map.insertBefore(window.createCard(dataList), mapFilterContainer);
    });
    return pinElement;
  };

  window.insertPin = function () {
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < window.adsNearbyList.length; i++) {
      fragment.appendChild(getPinTemplate(window.adsNearbyList[i]));
    }

    pinsList.appendChild(fragment);
  };

})();
