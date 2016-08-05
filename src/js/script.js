var web = angular.module('web', ['ngRoute']);
web.controller('mainController', ['$scope', function($scope){
	$scope.name = "Mauricio Correa";
	$scope.jobTitle = "Front-end developer";
	$scope.sectionLive = "Vivo en Madrid";
	$scope.sectionLike = "Me gusta";
	$scope.sectionSkill = "Habilidades";
	$scope.sectionEducation = "Educación";
	$scope.sectionPortfolio = "Portafolio";
	$scope.sectionContact = "Contacto";
}]);

web.directive('sectionOne', function(){
	return {
		//restrict: 'AECM',
		templateUrl: 'directives/section-one.html'
		//replace: true
	};
});

web.directive('sectionTwo', function(){
	return {
		//restrict: 'AECM',
		templateUrl: 'directives/section-two.html'
		//replace: true
	};
});