/**
 * Created by dzund on 27.03.2016.
 */
(function () {
  'use strict';

  angular
    .module('app')
    .service('galleryImageService', GalleryImageService);

  /* @ngInject */
  function GalleryImageService($http, $q, $filter) {
    this.getImagesFromArray = function (array) {
      return $q.when(array);
    };

    this.getImagesByUrl = function (url) {
      var task = $q.defer();
      $http.get(url, {
          headers: {
            'Access-Control-Allow-Origin': '*'
          }
        })
        .then(function (response) {
          task.resolve(response.data);
        })
        .catch(function () {
          task.reject();
        });

      return task.promise;
    };

    this.getImages = function (feedAttrData) {
      try {
        return this.getImagesFromArray(JSON.parse(feedAttrData));
      } catch (e) {
        if (this.isUrl(feedAttrData)) {
          return this.getImagesByUrl(feedAttrData)
        } else {
          throw new Error('Unknown feed provider');
        }
      }
    };

    this.isUrl = function isUrl(s) {
      return /^((http|https):\/\/)/.test(s);
    };

    this.filter = function (images, searchToken) {
      return searchToken ? $filter('filter')(images, {title: searchToken }) : images;
    };
  }

})();
