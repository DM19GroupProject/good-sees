angular.module('goodSees')
    .service('tmdbService', function($http){
    var baseUrl = 'https://api.themoviedb.org/3/'
    var key = '?api_key=dacb04943975d3dddd961e4b876f8019'
    var discoverPageNum = 1
    var thing
    
 //get movies by popularity or for a discover page


    // this.getMovies = function(){
    //     return $http({
    //         method: "GET",
    //         url: baseUrl + 'discover/movie' + key + '&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=' + discoverPageNum

    //     }).then(function(response){
            
    //         if(response.status===200){
    //             // console.log(response.data)
    //             return response.data
    //         }return "ERROR!!!"
    //     })
    //     console.log(url)
    //     console.log(baseUrl + 'discover/movie' + key + '&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=' + discoverPageNum
    //         )
    // }

    this.getMoviesBy =function(thing){
        return $http({
            method: "GET",
            url: baseUrl + 'search/movie' + key +  '&language=en-US&query='+thing+'&page=1' 
        
    }).then(function(response){
            if(response.status===200){
                // console.log(response.data)
                return response.data
            }return "ERROR!!!" + response.status
        })
    }
});