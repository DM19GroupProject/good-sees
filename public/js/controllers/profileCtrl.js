angular.module('goodSees')
    .controller('profileCtrl', function($scope, mainService){
        $scope.link = 'default'
        $scope.test = mainService.test;

        mainService.getUserData(1197287247035846)
        .then(function(response){
            $scope.userData = response[0];
        })

        mainService.getTopFriends(1197287247035846)
        .then(function(response){
            $scope.friends = response;
        })
});