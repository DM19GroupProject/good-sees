angular.module('goodSees')
    .controller('headerCtrl', function($scope, mainService, tmdbService){

        $scope.test = mainService.test;
});