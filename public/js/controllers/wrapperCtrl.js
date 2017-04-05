angular.module('goodSees')
    .controller('wrapperCtrl', function($scope, mainService){

        $scope.test = mainService.test;
    });