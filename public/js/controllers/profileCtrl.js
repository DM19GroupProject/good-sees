angular.module('goodSees')
    .controller('profileCtrl', function($scope, mainService){
        $scope.link = 'default'
        $scope.test = mainService.test;

        
});