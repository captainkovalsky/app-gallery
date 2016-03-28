/**
 * Created by dzund on 27.03.2016.
 */
(function () {
  'use strict';

  angular
    .module('app')
    .directive('myGallery', GalleryDirective)
    .directive('errSrc', ErrorImageDirective);

  /* @ngInject */
  function GalleryDirective() {
    return {
      restrict: 'EA',
      scope: {
        searchBox: '=',
        autoRotateTime: '=',

        pagination: '=',
        sorting: '=',
        resultsPerPage: '='
      },
      controller: 'GalleryController',
      controllerAs: 'galleryCtrl',
      link: link,
      templateUrl: 'gallery/gallery.html'
    };

    function link(scope, element, attributes, controller){
      controller.init(attributes.feed, scope.sorting || true, {pagination: scope.pagination, perPage: scope.resultsPerPage}, scope.autoRotateTime || 4000);
    }
  }


  function ErrorImageDirective() {
    return {
      link: link
    };

    function link(scope, element, attrs) {
      element.bind('error', function() {
        if (attrs.src !== attrs.errSrc) {
          attrs.$set('src', attrs.errSrc);
        }
      });
    }
  }

})();
