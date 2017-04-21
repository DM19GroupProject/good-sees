angular.module('goodSees')
    .controller('favoritesCtrl', function($scope, $state, mainService, tmdbService, userService){

        userService.getUserId()
        .then( response => {
            $scope.userId = response;
           return response
        })
        .then( response =>  {
            $scope.getFavMovies = function() {
                mainService.getFavMovies(response)
                .then(function(response){
                    $scope.favMovies = response;
                })
            }
            $scope.getFavMovies();  
        })

        $scope.addToFavs = (userId, movieId) =>{
             mainService.addToFavs(userId, movieId)
        }
        $scope.deleteFav = (userId, movieId) => {
            mainService.deleteFav(userId, movieId)
            $scope.getFavMovies();
        }
});