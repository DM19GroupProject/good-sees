angular.module('goodSees')
    .service('mainService', function($http){

        var baseUrl = "https://image.tmdb.org/t/p/w300_and_h450_bestv2"

        this.test = 'Service is working'

        this.getUserData = function(id){
            return $http.get('/getUser/'+ id).then(function(response){
                // console.log(response.data);
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
                            console.log(response.data)
                        
                            recommendedMovies.push({imageUrl: baseUrl + response.data.poster_path, title: response.data.original_title})
                        })
                    }
                }
                console.log("recMovies:" + recommendedMovies);
                return recommendedMovies;
            
            })
        }

        this.getSeenMovies = function(id){
            return $http.get('/getUserActivity/' + id)
            .then(function(response){
                var seenMovies = [];
                
                for(var i=0; i < response.data.length; i++){
                    if(response.data[i].seen){
                        $http.get('/getMovieById/' + response.data[i].movie_id)
                        .then(function(response){
                            console.log(response.data)

                            seenMovies.push({imageUrl: baseUrl + response.data.poster_path, title: response.data.original_title})
                        })
                    }
                }
                console.log("seenMovies:" + seenMovies);
                return seenMovies;
            })
        }
        this.getWantToSee = function(id){
            return $http.get('/getUserActivity/' + id)
            .then(function(response){
                var wantToSee = [];
                
                for(var i=0; i < response.data.length; i++){
                    if(response.data[i].to_see){
                        $http.get('/getMovieById/' + response.data[i].movie_id)
                        .then(function(response){
                            console.log(response.data)

                            wantToSee.push({imageUrl: baseUrl + response.data.poster_path, title: response.data.original_title})
                        })
                    }
                }
                console.log("want:" + wantToSee);
                return wantToSee;
            })
        }
        this.getFavMovies = function(id){
            return $http.get('/getUserActivity/' + id)
            .then(function(response){
                var favMovies = [];
                
                for(var i=0; i < response.data.length; i++){
                    if(response.data[i].fav){
                        $http.get('/getMovieById/' + response.data[i].movie_id)
                        .then(function(response){
                            console.log(response.data)

                            favMovies.push({imageUrl: baseUrl + response.data.poster_path, title: response.data.original_title})
                        })
                    }
                }
                console.log("favMovies:" + favMovies);
                return favMovies;
            })
        }
        this.addToFavs = (userId, movieID) => {
            return $http.post('/postFav/:id/:movieId')
        }

       
});