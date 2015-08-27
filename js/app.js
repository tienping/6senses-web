// create the module and name it scotchApp
	// also include ngRoute for all our routing needs
var myApp = angular.module('myApp', ['ngRoute']);

// configure our routes
myApp.config(function($routeProvider, $locationProvider) {
	$routeProvider
		.when('/', {
			templateUrl : 'views/notifications.html',
			controller  : 'notificationsController'
		})
		.when('/notifications', {
			templateUrl : 'views/notifications.html',
			controller  : 'notificationsController'
		})
		.when('/security', {
			templateUrl : 'views/security.html',
			controller  : 'notificationsController'
		});
});

// create the controller and inject Angular's $scope
myApp.controller('mainController', function($scope) {
	// nothing yet
});

myApp.controller('notificationsController', function($scope, $http, $routeParams) {
	$http.get("http://tienpingx2.96.lt/php/searchResult.php?studentID=1")
		.success(function (response) {
			if (response) {
				$scope.data = response.data;
				$scope.total = response.total;
			}
		}
	);
});

myApp.controller('notificationsController', function($scope, $http, $routeParams) {
	$http.get("http://tienpingx2.96.lt/php/searchResult.php?studentID=1")
		.success(function (response) {
			if (response) {
				$scope.data = response.data;
				$scope.total = response.total;
			}
		}
	);
});

myApp.filter('formatter', function($filter) {
	return function() {
		var filterValue = arguments[0];
		var filterName = arguments[1];
		if (filterName == "unescape") {
			return unescape(filterValue);
		}
	};
});
