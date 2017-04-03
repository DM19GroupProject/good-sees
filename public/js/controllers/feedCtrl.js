angular.module('goodSees')
    .controller('feedCtrl', function($scope, mainService){

        $scope.test = mainService.test;
});