angular.module('goodSees')
    .controller('searchCtrl', function ($scope, tmdbService, $state, userService, mainService) {

        var titlePage = 1;
        $scope.apiSearchTerm = $scope.searchTerm;

        userService.getUserId()
        .then( response => {
            return response
        })
        .then(response => {
            mainService.getUserData(response)
            .then(function(response){
                $scope.userData = response[0];
            })
        })

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

        ///////////add to lists functions////////////
        $scope.addToFavs = (userId, movieId) =>{
            mainService.addToFavs(userId, movieId)
        }
        $scope.addToSeen = (userId, movieId) => {
            mainService.addToSeen(userId, movieId)
        }
        $scope.addToSee = (userId, movieId) => {
            mainService.addToSee(userId, movieId)
        }

    });