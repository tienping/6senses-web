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
		$http.put("https://thawing-hollows-2664.herokuapp.com/api/doors/clean", {"device_id": targetDeviceID})
			.success(function (response) {
				if (response) {
					$scope.data = response;
					alert("Toilet clean, good job!!");
					$http.get("https://thawing-hollows-2664.herokuapp.com/api/doors")
						.success(function (response) {
							if (response) {
								data = response;
								data = response.concat(fakeData);
								
								var floors = {};
								var rows = [];
								var counter = {};
								for (var i = 0, l = data.length; i < l; i++) {
									var item = data[i];
									
									if (item.floor && (!counter[item.floor] || counter[item.floor] <= 4)) {
										if (floors[item.floor]) {
											floors[item.floor].push(item);
											counter[item.floor] += 1;
										} else {
											floors[item.floor] = [item];
											counter[item.floor] = 1;
										}
									}
								}
								
								$scope.data = floors;
							}
						})
					
				}
			}
		);
	};
	
	var fakeData = [{
		name: "G1a", 
		floor: "1", 
		gender: "male", 
		count: 35, 
		status: "warning", 
		alertTime: "5:30AM", 
		device_id: "some id"
	}, {
		name: "G2b", 
		floor: "1", 
		gender: "male", 
		count: 63, 
		status: "dirty", 
		alertTime: "6:55PM", 
		device_id: "some id"
	}, {
		name: "G4a", 
		floor: "2", 
		gender: "female", 
		count: 42, 
		status: "clean", 
		alertTime: "2:54PM", 
		device_id: "some id"
	}, {
		name: "G1b", 
		floor: "1", 
		gender: "male", 
		count: 3, 
		status: "clean", 
		alertTime: "6:55PM", 
		device_id: "some id"
	}, {
		name: "G2a", 
		floor: "2", 
		gender: "female", 
		count: 22, 
		status: "clean", 
		alertTime: "2:54PM", 
		device_id: "some id"
	}, {
		name: "F1a", 
		floor: "3", 
		gender: "male", 
		count: 15, 
		status: "clean", 
		alertTime: "5:30PM", 
		device_id: "some id"
	}, {
		name: "F1b", 
		floor: "3", 
		gender: "female", 
		count: 45, 
		status: "warning", 
		alertTime: "7:35AM", 
		device_id: "some id"
	}, {
		name: "F2a", 
		floor: "5", 
		gender: "male", 
		count: 6, 
		status: "clean", 
		alertTime: "9:11AM", 
		device_id: "some id"
	}, {
		name: "F6", 
		floor: "8", 
		gender: "male", 
		count: 52, 
		status: "warning", 
		alertTime: "3:07PM", 
		device_id: "some id"
	}];
	
	$http.get("https://thawing-hollows-2664.herokuapp.com/api/doors")
		.success(function (response) {
			if (response) {
				//data = response.concat(fakeData);
				data = response;
				data = response.concat(fakeData);
				
				var floors = {};
				var rows = [];
				var counter = {};
				for (var i = 0, l = data.length; i < l; i++) {
					var item = data[i];
					
					if (item.floor && (!counter[item.floor] || counter[item.floor] <= 4)) {
						if (floors[item.floor]) {
							floors[item.floor].push(item);
							counter[item.floor] += 1;
						} else {
							floors[item.floor] = [item];
							counter[item.floor] = 1;
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
						var counter = {};
						for (var i = 0, l = data.length; i < l; i++) {
							var item = data[i];
							
							if (item.floor && (!counter[item.floor] || counter[item.floor] <= 4)) {
								if (floors[item.floor]) {
									floors[item.floor].push(item);
									counter[item.floor] += 1;
								} else {
									floors[item.floor] = [item];
									counter[item.floor] = 1;
								}
							}
						}
						
						$scope.data = floors;
					}
				})
		}, 3 * 1000);
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