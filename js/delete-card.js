'use strict';

(function () {
// функция удаления отрисованной карточки объявления

  window.deleteCard = function () {
    window.map.removeChild(window.map.querySelector('.map__card'));
  };
})();
