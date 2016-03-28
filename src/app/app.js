(function() {
    'use strict';
    angular.module('app', [
        'ngRoute', 'ngResource' ,'ngAnimate', 'ui.bootstrap'
    ]);

  angular.module('app').controller('MainController', MainController);

  /* @ngInject */
  function MainController($scope) {

  }

})();
