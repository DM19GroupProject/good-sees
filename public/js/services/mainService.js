angular.module('goodSees')
    .service('mainService', function($http){

        var baseUrl = "https://image.tmdb.org/t/p/w300_and_h450_bestv2"

        this.test = 'Service is working'

        this.getUserData = function(id){
            return $http.get('/getUser/'+ id).then(function(response){
                console.log(response.data);
                return response.data;
            })
        }

        this.getTopFriends = function(id){
            return $http.get('/getFriends/' + id).then(function(response){
                console.log(response.data);
                return response.data;
            })
        }

        this.getRecommendedMovies = function(id){
            return $http.get('/getUserActivity/' + id)
            .then(function(response){
                var recommendedMovies = [];
                console.log(response.data);
                for(var i=0; i<response.data.length;i++){
                    if(response.data[i].recommends){
                        $http.get("/getMovieById/" + response.data[i].movie_id)
                        .then(function(response){
                            console.log(baseUrl + response.data.poster_path)
                            recommendedMovies.push(baseUrl + response.data.poster_path)
                        })
                    }
                }
                console.log(recommendedMovies);
                
            
            })
        }

       
});