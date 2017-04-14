angular.module('goodSees')
    .controller('feedCtrl', function ($scope, mainService, tmdbService, userService) {

        userService.getUserId().then(response => {
            console.log("mubuaba",response)
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

        $scope.getMovieForFeed = function(){
            mainService.getMovieForFeed(id)
            .then(function(response){
                $scope.activities = response;
            })
        }

        $scope.getMovieForFeed();
       
    });