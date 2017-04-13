angular.module('goodSees')
    .controller('profileCtrl', function($scope, mainService){
        $scope.link = 'default'
        $scope.test = mainService.test;

        mainService.getUserData(2197287247035846)
        .then(function(response){
            $scope.userData = response[0];
        })

        mainService.getTopFriends(2197287247035846)
        .then(function(response){
            $scope.friends = response;
        })

        mainService.getRecommendedMovies(2197287247035846)
        .then(function(response){
            $scope.recMovies = response;
            console.log($scope.recMovies)
        })

        mainService.getSeenMovies(2197287247035846)
        .then(function(response){
            $scope.seenMovies = response;
        })

        mainService.getWantToSee(2197287247035846)
        .then(function(response){
            $scope.wantToSee = response;
        })

        mainService.getFavMovies(2197287247035846)
        .then(function(response){
            $scope.favMovies = response;
        })
});