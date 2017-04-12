angular.module('goodSees')
    .controller('categoriesCtrl', function($scope, $state, mainService, tmdbService){

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
});