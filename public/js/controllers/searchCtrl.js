angular.module('goodSees')
    .controller('searchCtrl', function($scope, tmdbService){
// console.log('this is working')
    //      $scope.test = 'controller is working'
    // $scope.test1 = tmdbService.test1
    //  tmdbService.getMovies().then(function(response){
         
    //      $scope.movies = response.results
    //      console.log($scope.movies)
    //  })

     $scope.searchStuff
     $scope.myfunc = function(keyEvent) {
         if (keyEvent.which === 13){
         
         
     tmdbService.getMoviesBy($scope.searchStuff).then(function(movieInfo){
            $scope.search = movieInfo.results
            //   console.log($scope.search)
                   })
         }
     }
    
    });