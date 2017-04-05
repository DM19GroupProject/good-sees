angular.module('goodSees')
    .controller('mainCtrl', function($scope, mainService){

        $scope.test = mainService.test;
    });