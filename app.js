

var myapp = angular.module('myapp', [])

myapp.directive("swapiPlanetsSelector", function() {
	return {
		// restrict: 'A',
		transclude: true,
		scope: {
			minResidents: "=",
		},
		templateUrl: (elem, attr) => 'planets.html',
		controller: function($scope, $http) {
			$http.get('http://swapi.co/api/planets/?format=json').then(function(data){
			$scope.planets = data.data.results;
			// console.log(data.data.results)
			$scope.getPlanet = function(planet) {
         $scope.planetID = planet.url.match(/\d/g)
				 $scope.$broadcast('planetPicked', {planetID: $scope.planetID});
      }
		})
	}
}
})
myapp.directive("swapiPlanet", function() {
	return {
		// restrict: 'A',
		transclude: true,
		scope: {
			id: "=",
		},
		templateUrl: (elem, attr) => 'planet.html',
		controller: function($scope, $http) {
			// $http.get('http://swapi.co/api/planets/' + $scope.id).then(function(data){
			// $scope.planet = data.data;
			$scope.$on('planetPicked', function(event, args) {
				$http.get('http://swapi.co/api/planets/' + args.planetID).then(function(data){
					$scope.planet = data.data;
					$scope.residents = data.data.residents;
					$scope.$broadcast('residentsFound', {residentsID: $scope.residents});
				})
			});
		// })
	}
}
})
// myapp.directive("swapiResident", function() {
// 	return {
// 		// restrict: 'A',
// 		transclude: true,
// 		scope: {
// 			id: "=",
// 		},
// 		templateUrl: (elem, attr) => 'resident.html',
// 		controller: function($scope, $http) {
// 		$scope.$on('residentsFound', function(event, args) {
// 			console.log("ASDASDASDASDAWED")
// 	})
// 	}
// }
// })
myapp.directive("swapiResident", function() {
	return {
		// restrict: 'A',
		transclude: true,
		scope: {
			id: "=",
		},
		templateUrl: (elem, attr) => 'resident.html',
		controller: function($scope, $http) {
			$scope.$on('planetPicked', function(event, args) {
				$http.get('http://swapi.co/api/planets/' + args.planetID).then(function(data){
								var arr = [];
					data.data.residents.forEach(function(url){
							$http.get(url).then(function(data){
								arr.push(data.data)
								$scope.residents = arr;
								console.log(arr)
							})
					})
				})
			});
	}
}
})
