(function () {
  'use strict';

  angular
    .module('app')
    .controller('GalleryController', GalleryController);

  /* @ngInject */
  function GalleryController($scope, $timeout, galleryImageService) {
    var vm = this;
    var imagesLoaded = [];
    angular.extend(vm, {
      images: [],
      sort: false,
      sortOptions: [
        'title',
        'date'
      ],
      sortBy: 'title',

      perPage: [5, 10, 20, 50],
      currentPage: 1,

      searchToken: null,
      loaded: false,
      init: init,
      updateSearch: updateSearch,
      next: next
    });

    function next() {
      vm.currentPage++;
      if (vm.currentPage >= vm.pagination.numPages) {
        vm.currentPage = 0;
      }

      updateSearch();
    }

    var sortConfigFn = {
      title: function sortByTitle(a, b) {
        return b.title.localeCompare(a.title);
      },
      date: function sortByDate(a, b) {
        return new Date(b.date) - new Date(a.date);
      }
    };

    function init(feed, sort, pagination, rotationTime) {
      galleryImageService
        .getImages(feed)
        .then(function (images) {
          imagesLoaded = images;
          vm.sort = sort;
          vm.pagination = pagination;
          vm.loaded = true;
          updateSearch();
          initGalleryRotation(rotationTime);
        })
        .catch(showError);
    }

    function initGalleryRotation(rotationTime){
      var timer;
      var sliderFunc = function() {
        timer = $timeout(function() {
          vm.next();
          timer = $timeout(sliderFunc, rotationTime);
        }, rotationTime);
      };

      sliderFunc();

      $scope.$on('$destroy', function() {
        $timeout.cancel(timer);
      });
    }

    function updateSearch() {
      vm.images = galleryImageService
        .filter(imagesLoaded, vm.searchToken)
        .sort(sortConfigFn[vm.sortBy] || angular.noop);
      vm.totalPages = vm.images.length;
      vm.images = vm.images.slice((vm.currentPage - 1) * vm.pagination.perPage);
    }

    function showError() {
      $scope.error = {
        message: 'failed to load images.'
      };
    }
  }

})();
