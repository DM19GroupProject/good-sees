angular.module('goodSees')
    .controller('movieCtrl', function($scope, mainService, tmdbService, $state){
           
        var id = $state.params.id
       
        tmdbService.getMovieById(id).then(response =>{
            console.log(response.data)
            $scope.movieData = response.data 
        })
        




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