angular.module('goodSees')
    .controller('categoriesCtrl', function($scope, mainService){

        $scope.test = mainService.test;
});