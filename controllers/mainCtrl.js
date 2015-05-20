var app = angular.module('app', ['ngRoute'])
  .config(['$routeProvider', '$locationProvider',
    function($routeProvider, $locationProvider) {
      $routeProvider.
        when('/', {
          redirectTo: '/anvandaruppgifter'
        }).
        when('/lagg-till-ny', {
          templateUrl: '/partials/lagg-till-ny.html',
          controller: 'addCtrl'
        }).
        otherwise({
          redirectTo: '/'
        });

        $locationProvider.html5Mode({ enabled: true, requireBase: true});
    }]);