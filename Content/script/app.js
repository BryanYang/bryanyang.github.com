var omoApp = angular.module('omoApp', [
  'ngRoute',
  'omoControllers'
]);

omoApp.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/products', {
        templateUrl: 'partials/productsList.html',
        controller: 'ProductListCtrl'
      }).
      when('/products/:pid', {
        templateUrl: 'partials/productDetail.html',
        controller: 'ProductDetailCtrl'
      }).
      when('/recommend1',{
        templateUrl: 'partials/recommend1.html',
        controller: 'ProductDetailCtrl'
      }).
      when('/recommend2',{
        templateUrl: 'partials/recommend2.html',
        controller: 'ProductDetailCtrl'
      }).
       when('/recommend3',{
        templateUrl: 'partials/recommend3.html',
        controller: 'ProductDetailCtrl'
      }).
      when('/recommend4',{
        templateUrl: 'partials/recommend4.html',
        controller: 'ProductDetailCtrl'
      }).
      when('/recommend5',{
        templateUrl: 'partials/recommend5.html',
        controller: 'ProductDetailCtrl'
      }).
      when('/recommend6',{
        templateUrl: 'partials/recommend6.html',
        controller: 'ProductDetailCtrl'
      }).
      when('/recommend7',{
        templateUrl: 'partials/recommend7.html',
        controller: 'ProductDetailCtrl'
      }).
      when('/recommend8',{
        templateUrl: 'partials/recommend8.html',
        controller: 'ProductDetailCtrl'
      }).
      when('/recommend9',{
        templateUrl: 'partials/recommend9.html',
        controller: 'ProductDetailCtrl'
      }).
      otherwise({
        redirectTo: '/products'
      });
  }]);