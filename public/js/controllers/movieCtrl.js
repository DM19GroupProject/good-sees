angular.module('goodSees')
    .controller('movieCtrl', function($scope, mainService){

        $scope.test = mainService.test;
    });