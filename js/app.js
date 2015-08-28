// create the module and name it scotchApp
	// also include ngRoute for all our routing needs
var myApp = angular.module('myApp', ['ngRoute', 'ui.bootstrap']);

var test2 = "test2";

// configure our routes
myApp.config(function($routeProvider, $locationProvider) {
	$routeProvider
		.when('/', {
			templateUrl : 'views/monitoring.html',
			controller  : 'monitoringController'
		})
		.when('/notifications', {
			templateUrl : 'views/notifications.html',
			controller  : 'notificationsController'
		})
		.when('/monitoring', {
			templateUrl : 'views/monitoring.html',
			controller  : 'monitoringController'
		})
		.when('/summary', {
			templateUrl : 'views/summary.html',
			controller  : 'notificationsController'
		});
});

// create the controller and inject Angular's $scope
myApp.controller('mainController', function($scope) {
	// nothing yet
});

myApp.controller('notificationsController', function($scope, $http, $routeParams) {
	$http.get("https://thawing-hollows-2664.herokuapp.com/api/doors")
		.success(function (response) {
			if (response) {
				$scope.data = response;
			}
		}
	);
});

myApp.controller('monitoringController', function($scope, $http, $routeParams) {
	$scope.onToiletCleanAction = function onToiletCleanAction(targetDeviceID, count) {
		alert("clean toilet to be built");
		/*$http.get("https://thawing-hollows-2664.herokuapp.com/api/doors")
			.success(function (response) {
				if (response) {
					$scope.data = response.data;
					$scope.total = response.total;
				}
			}
		);*/
	};
	
	var fakeData = [{
		name: "G1a", 
		floor: "1", 
		gender: "male", 
		count: 35, 
		status: "dirty", 
		alertTime: "5:30AM"
	}, {
		name: "G1b", 
		floor: "1", 
		gender: "male", 
		count: 3, 
		status: "clean", 
		alertTime: "6:55PM"
	}, {
		name: "G2a", 
		floor: "2", 
		gender: "female", 
		count: 22, 
		status: "dirty", 
		alertTime: "2:54PM"
	}, {
		name: "F1a", 
		floor: "3", 
		gender: "male", 
		count: 15, 
		status: "warning", 
		alertTime: "xxx"
	}, {
		name: "F1b", 
		floor: "3", 
		gender: "female", 
		count: 11, 
		status: "clean", 
		alertTime: "xxx"
	}, {
		name: "F2a", 
		floor: "4", 
		gender: "male", 
		count: 6, 
		status: "clean", 
		alertTime: "xxx"
	} {
		name: "F6", 
		floor: "8", 
		gender: "male", 
		count: 2, 
		status: "clean", 
		alertTime: "xxx"
	}];
	
	$http.get("https://thawing-hollows-2664.herokuapp.com/api/doors")
		.success(function (response) {
			if (response) {
				//data = response.concat(fakeData);
				data = response;
				
				var floors = {};
				var rows = [];
				for (var i = 0, l = data.length; i < l; i++) {
					var item = data[i];
					
					if (item.floor) {
						if (floors[item.floor]) {
							floors[item.floor].push(item);
						} else {
							floors[item.floor] = [item];
						}
					}
				}
				
				$scope.data = floors;
			}
		})
		
		setInterval(function() {
			$http.get("https://thawing-hollows-2664.herokuapp.com/api/doors")
				.success(function (response) {
					if (response) {
						data = response;
						data = response.concat(fakeData);
						
						var floors = {};
						var rows = [];
						for (var i = 0, l = data.length; i < l; i++) {
							var item = data[i];
							
							if (item.floor) {
								if (floors[item.floor]) {
									floors[item.floor].push(item);
								} else {
									floors[item.floor] = [item];
								}
							}
						}
						
						$scope.data = floors;
					}
				})
		}, 1 * 1000);
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