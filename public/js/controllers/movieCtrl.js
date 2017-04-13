angular.module('goodSees')
    .controller('movieCtrl', function($scope, mainService, tmdbService, $state){
         mainService.getUserData(2197287247035846)
        .then(function(response){
            $scope.userData = response[0];
        console.log($scope.userData)
        })
        var id = $state.params.id
        tmdbService.getMovieById(id).then(response =>{
            console.log(response.data)
            $scope.movieData = response.data 
        })
        
        $scope.addToFavs = (userId, movieId) =>{
            mainService.addToFavs(userId, movieId)
        }



        // if ($state.params.id === NaN){
        //     return  tmdbService.getMovieById(id)
        //             .then(id => {
                        
        //                 $scope.movieInfo = id
        //             })
        // }
    //  getMovieById = function (id) {
    //             tmdbService.getMovieById(id)
    //                 .then(id => {
    //                     $scope.movieInfo = id
    //                 })
            
    //     }
    });