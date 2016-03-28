(function() {
    'use strict';

    angular
        .module('app')
        .config(configure);


    /* @ngInject */
    function configure($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'index.html',
                controller: 'MainController'
            });
    }

})();
