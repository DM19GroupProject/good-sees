angular.module('goodSees')
    .controller('searchCtrl', function ($scope, tmdbService, $state) {
    
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

        //cast search
        $scope.searchMovieByCast = function (keyEvent, castMember) {
            if (keyEvent.which === 13) {

                tmdbService.searchMovieByCastMember(castMember)
                    .then(actorInfo => {
                            console.log(actorInfo.data)
                            console.log(actorInfo.data.known_for)
                        $scope.actorInfo = actorInfo.data

                    })
            }
        }

    });
