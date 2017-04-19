angular.module('goodSees')
    .controller('profileCtrl', function($scope, mainService, userService){
        $scope.link = 'default'
        $scope.test = mainService.test;

        userService.getUserId().then( response => {
           return response
           $scope.currentUserData = response
        }).then( response =>  {

            
        mainService.getUserData(response)
        .then(function(response){
            $scope.userData = response[0];
            $scope.userId = response[0]['fb_id'];
            console.log('userId: ', $scope.userId)
        })
        mainService.getTopFriends(response)
        .then(function(response){
            $scope.friends = response;
        })

        mainService.getRecommendedMovies(response)
        .then(function(response){
            $scope.recMovies = response;
           
        })

        mainService.getSeenMovies(response)
        .then(function(response){
            $scope.seenMovies = response;
        })

        mainService.getWantToSee(response)
        .then(function(response){
            $scope.wantToSee = response;
        })

        $scope.getFavMovies = function(){
            mainService.getFavMovies(response)
            .then(function(response){
            $scope.favMovies = response;
            
            })
        }
        $scope.getFavMovies();
    })
    
    $scope.addToFavs = (userId, movieId) =>{
        mainService.addToFavs(userId, movieId)
        $scope.getFavMovies();        
    }
    $scope.deleteSeen = (userId, movieId) => {
        mainService.deleteSeen(userId, movieId)
        $scope.getSeenMovies();
    }
});