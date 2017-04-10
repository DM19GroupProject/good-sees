angular.module('goodSees')
    .controller('categoriesCtrl', function($scope, $state, mainService, tmdbService){

        console.log($state.params.id)

        tmdbService.getMoviesByGenre($state.params.id)
        .then(response => {
            console.log(response.data)
            $scope.moviesByGenre = response.data.results;
        })
});