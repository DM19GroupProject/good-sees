angular.module('goodSees')
    .controller('loginCtrl', function($scope, mainService){

        $scope.test = mainService.test;
    });