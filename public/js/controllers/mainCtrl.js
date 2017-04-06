angular.module('goodSees')
    .controller('mainCtrl', function($scope, mainService, tmdbService){
       
        
        /*--------------------------------------------------------------------*
                     Event Handlers 
        *--------------------------------------------------------------------*/ 
    //movie title search
        $scope.navSearchMovieByTitle = function (keyEvent, navMovieTitle) {
            if (keyEvent.which === 13) {
                tmdbService.searchMovieByTitle(navMovieTitle)
                .then(movieInfo => {
                    console.log(movieInfo.data)
                    $scope.navMovieInfo = movieInfo.data
                })
            }
        }
        
       //cast search
        $scope.navSearchMovieByCast = function (keyEvent, navCastMember) {
            if(keyEvent.which === 13) {
            
                tmdbService.ssearchMovieByCastMember(navCastMember)
                .then(navActorInfo => {
                    
                    $scope.navActorInfo = navActorInfo.data
                })
            }
        }
    });