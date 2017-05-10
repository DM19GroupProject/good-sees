angular.module('goodSees').controller('friendsProfileCtrl', function ($scope, mainService, $stateParams) {

    
    $scope.friendId = $stateParams.id;

    //   mainService.getFriends()
    //   .then(function(response){
    //     $scope.friendList = response;
    //   })

    mainService.getUserData($scope.friendId)
        .then(function (response) {
            $scope.userData = response[0];
            console.log("userData", $scope.userData)
        })

    mainService.getTopFriends($scope.friendId)
        .then(function (response) {
            $scope.friends = response;
        })

    mainService.getRecommendedMovies($scope.friendId)
        .then(function (response) {
            console.log("friends rec movies", response)
            $scope.recMovies = response;

        })

    mainService.getSeenMovies($scope.friendId)
        .then(function (response) {
            console.log("friends seen movies", response)
            $scope.seenMovies = response;
        })

    mainService.getWantToSee($scope.friendId)
        .then(function (response) {
            console.log("friends want to see movies", response)
            $scope.wantToSee = response;
        })

    mainService.getFavMovies($scope.friendId)
        .then(function (response) {
            console.log("friends fav movies", response)
            $scope.favMovies = response;
        })

})