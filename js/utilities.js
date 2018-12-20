'use strict';

(function () {
  // поиск основного блока с классом map

  var map = document.querySelector('.map');

  var deleteCard = function () {
    if (window.utilities.map.querySelector('.map__card') !== null) {
      map.removeChild(map.querySelector('.map__card'));
    }
  };

  window.utilities = {
    deleteCard: deleteCard,
    map: map
  };
})();
