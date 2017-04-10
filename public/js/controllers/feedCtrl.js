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
                        $scope.feedMovieInfo = movieInfo.data
                    })
            }
        }

        $scope.newRecommendation;
       
    });