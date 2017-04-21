angular.module('goodSees')
    .controller('seenCtrl', function($scope, $state, mainService, tmdbService, userService){
    
        userService.getUserId()
        .then( response => {
            $scope.userId = response;
           return response
        })
        .then( response =>  {
            $scope.getSeenMovies = function() {
                mainService.getSeenMovies(response)
                .then(function(response){
                    $scope.seenMovies = response;
                })
            }
            $scope.getSeenMovies();  
        })

        $scope.addToFavs = (userId, movieId) =>{
             mainService.addToFavs(userId, movieId)
        }
        $scope.deleteSeen = (userId, movieId) => {
            mainService.deleteSeen(userId, movieId)
            $scope.getSeenMovies();
        }
});