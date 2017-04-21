angular.module('goodSees')
    .controller('categoriesCtrl', function($scope, $state, mainService, tmdbService, userService){

        userService.getUserId().then( response => {
            return response
        }).then(response => {
            mainService.getUserData(response)
        .then(function(response){
            $scope.userData = response[0];
        })
        })

        var categoryPage = 1;

        $scope.getMoviesByGenre = function(){
            tmdbService.getMoviesByGenre($state.params.id, categoryPage)
            .then(response => {
                console.log(response.data)
                $scope.moviesByGenre = response.data.results;
            })
        };

        $scope.getMoviesByGenre();

        $scope.nextPage = function() {
            categoryPage++;
            $scope.getMoviesByGenre();
        }
        $scope.prevPage = function (){
            if(categoryPage > 1){
                categoryPage--;
            $scope.getMoviesByGenre();    
            }
        
        }

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