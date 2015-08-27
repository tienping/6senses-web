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
		.when('/monitoring', {
			templateUrl : 'views/monitoring.html',
			controller  : 'monitoringController'
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

myApp.controller('monitoringController', function($scope, $http, $routeParams) {
	$scope.onToiletCleanAction = function onToiletCleanAction() {
		alert("clean toilet to be built");
	};
	
	$http.get("index.php")
		.success(function (response) {
			if (response) {
				$scope.data = [{
					name: "G1a", 
					floor: "G1", 
					gender: "m", 
					count: 35, 
					status: "dirty", 
					alertTime: "xxx"
				}, {
					name: "G1b", 
					floor: "G1", 
					gender: "m", 
					count: 3, 
					status: "clean", 
					alertTime: "xxx"
				}, {
					name: "G2a", 
					floor: "G2", 
					gender: "m", 
					count: 22, 
					status: "dirty", 
					alertTime: "xxx"
				}, {
					name: "F1a", 
					floor: "F1", 
					gender: "m", 
					count: 15, 
					status: "clean", 
					alertTime: "xxx"
				}, {
					name: "F1b", 
					floor: "F1", 
					gender: "m", 
					count: 11, 
					status: "clean", 
					alertTime: "xxx"
				}, {
					name: "F2a", 
					floor: "F2", 
					gender: "m", 
					count: 6, 
					status: "clean", 
					alertTime: "xxx"
				}, {
					name: "F2b", 
					floor: "F2", 
					gender: "m", 
					count: 12, 
					status: "clean", 
					alertTime: "xxx"
				}, {
					name: "F3", 
					floor: "F3", 
					gender: "m", 
					count: 26, 
					status: "dirty", 
					alertTime: "xxx"
				}, {
					name: "F4", 
					floor: "F4", 
					gender: "m", 
					count: 2, 
					status: "clean", 
					alertTime: "xxx"
				}];
			}
		})
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
