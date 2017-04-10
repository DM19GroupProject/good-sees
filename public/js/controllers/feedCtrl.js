angular.module('goodSees')
    .controller('feedCtrl', function ($scope, mainService, tmdbService) {

        /*--------------------------------------------------------------------*
                      Event Handlers 
         *--------------------------------------------------------------------*/
        //movie title search
        $scope.searchMovieByTitle = function (keyEvent, movieTitle) {
            if (keyEvent.which === 13) {
                tmdbService.searchMovieByTitle(movieTitle)
                    .then(movieInfo => {
                        console.log(movieInfo.data)
                        $scope.movieInfo = movieInfo.data
                    })
            }
        }

        $scope.newRecommendation;

        //cast search
        $scope.searchMovieByCast = function (keyEvent, castMember) {
            if (keyEvent.which === 13) {

                tmdbService.searchMovieByCastMember(castMember)
                    .then(actorInfo => {

                        $scope.actorInfo = actorInfo.data
                    })
            }
        }
    });