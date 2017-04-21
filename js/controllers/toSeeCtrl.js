angular.module('goodSees')
    .controller('toSeeCtrl', function($scope, $state, mainService, tmdbService, userService){
    

        userService.getUserId()
        .then( response => {
            $scope.userId = response;
           return response
        })
        .then( response =>  {
            $scope.getWantToSee = function() {
                mainService.getWantToSee(response)
                .then(function(response){
                    $scope.toSeeMovies = response;
                })
            }
            $scope.getWantToSee();  
        })

        $scope.deleteToSee = (userId, movieId) => {
            mainService.deleteToSee(userId, movieId)
            $scope.getWantToSee();
        }
        $scope.addToSeen = (userId, movieId) =>{
             mainService.addToSeen(userId, movieId);
             $scope.deleteToSee(userId, movieId);
        }

});