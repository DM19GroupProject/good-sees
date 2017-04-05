angular.module('goodSees')
    .controller('searchCtrl', function ($scope, tmdbService) {
   /*--------------------------------------------------------------------*
                     Event Handlers 
    *--------------------------------------------------------------------*/ 
    //movie title search
        $scope.searchMovieByTitle = function (keyEvent) {
            if (keyEvent.which === 13) {
                tmdbService.searchMovieByTitle($scope.searchMoviesByTitle)
                .then(function (movieInfo) {
                    $scope.movieInfo = movieInfo.data
                })
            }
        }
       //cast search
        $scope.searchMovieByCast = function (keyEvent) {
            if(keyEvent.which === 13) {
                tmdbService.searchMovieByCast($scope.searchMoviesByCast)
                .then(function (movieInfo) {
                    console.log(movieInfo.data)
                    $scope.actorInfo = movieInfo.data
                })
            }
        }

    });