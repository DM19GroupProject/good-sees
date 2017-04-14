angular.module('goodSees')
    .controller('feedCtrl', function ($scope, mainService, tmdbService, userService) {

        userService.getUserId().then(response => {
    
            return response
        }).then(response => {
            mainService.getUserData(response)
            .then( response => {
                $scope.currentUserData = response[0]
                console.log($scope.currentUserData)
            })
        })
        $scope.baseUrl = mainService.baseUrl;
        var id = 2197287247035846;
        /*--------------------------------------------------------------------*
                      Event Handlers 
         *--------------------------------------------------------------------*/
        //movie title search
        $scope.searchMovieByTitle = function (movieTitle) {
            tmdbService.searchMovieByTitle(movieTitle)
                .then(movieInfo => {
                    $scope.feedMovieInfo = movieInfo.data
                    console.log('feedSearch: ', $scope.feedMovieInfo)
                })
        }
        $scope.selectMovie = function(movie) {
            $scope.recSelection = movie;
        }
        
     

        $scope.newRecommendation;

        $scope.getMovieForFeed = function(){
            mainService.getMovieForFeed(id)
            .then(function(response){
                $scope.activities = response;
            })
        }

        $scope.getMovieForFeed();
       
    });