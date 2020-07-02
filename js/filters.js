'use strict';

// ------------------ Настройка фильтров показа фотографий ------------------

(function () {

  var filterBlock = document.querySelector('.img-filters');
  var filterButtons = filterBlock.querySelectorAll('.img-filters__button');
  var imgFiltersForm = document.querySelector('.img-filters__form');

  var onFilterButtonsClick = function (evt) {
    if (!evt.target.classList.contains('img-filters__button--active')) {
      var activeButton = filterBlock.querySelector('.img-filters__button--active');
      activeButton.classList.remove('img-filters__button--active');
      evt.target.classList.add('img-filters__button--active');
    }
  };

  filterButtons.forEach(function (item) {
    item.addEventListener('click', onFilterButtonsClick);
  });

  imgFiltersForm.addEventListener('click', function (evt) {
    if (evt.target.tagName !== 'BUTTON') {
      return;
    }
    window.preview.useFilterDebounce(evt.target.id);
  });
})();
