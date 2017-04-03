angular.module('goodSees')
    .controller('profileCtrl', function($scope, mainService){

        $scope.test = mainService.test;
});