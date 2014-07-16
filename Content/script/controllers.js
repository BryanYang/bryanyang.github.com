var omoControllers = angular.module('omoControllers', []);

omoControllers.controller('ProductListCtrl',['$scope', '$http', function ($scope,$http) {
  	$http.get('data/index/products.json').success(function(data){
 		   $scope.products = data;
    })
 }]);

omoControllers.controller('ProductDetailCtrl', ['$scope','$http','$routeParams',function ($scope, $http,$routeParams) {
      $http.get('data/index/products.json').success(function(data){
      		var index = Number($routeParams.pid);
 		   $scope.product = data[index-1];
    })

}]);


omoControllers.controller('NavLeftCtrl', ['$scope', '$http', function ($scope,$http) {
 	$http.get('data/index/navigations.json').success(function(data){
 		$scope.navLefts = data;
	})
}]);
