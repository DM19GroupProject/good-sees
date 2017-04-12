angular.module('goodSees')
    .controller('searchCtrl', function ($scope, tmdbService, $state) {

        var titlePage = 1;
        $scope.apiSearchTerm = $scope.searchTerm;

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
                        $scope.resultFlag = true;
                        $scope.hideFlag = false;
                        $scope.apiSearchTerm = $scope.movieTitle;
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
                        $scope.resultFlag = false;
                        $scope.hideFlag = true;

                    })
            }
        }
        $scope.nextPage = function () {
            titlePage++;
            tmdbService.searchMovieByTitle($scope.apiSearchTerm, titlePage)
                .then(movieInfo => {
                    console.log(movieInfo.data)
                    $scope.movieInfo = movieInfo.data

                });
        }
        $scope.prevPage = function () {
            if (titlePage > 1) {
                titlePage--;
                tmdbService.searchMovieByTitle($scope.apiSearchTerm, titlePage)
                    .then(movieInfo => {
                        console.log(movieInfo.data)
                        $scope.movieInfo = movieInfo.data

                    });
            }

        }

    });