angular.module('goodSees')
    .controller('feedCtrl', function ($scope, mainService, tmdbService) {

        $scope.baseUrl = mainService.baseUrl;
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
        $scope.selectMovie = function(movie) {
            $scope.recSelection = movie;
            console.log($scope.recSelection)
            
        }

        $scope.newRecommendation;
       
    });