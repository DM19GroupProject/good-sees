angular.module('goodSees')
    .controller('searchCtrl', function($scope, mainService){

        $scope.test = mainService.test;
    });