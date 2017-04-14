angular.module('goodSees')
    .service('mainService', function($http){

        var baseUrl = "https://image.tmdb.org/t/p/w300_and_h450_bestv2"

        this.test = 'Service is working'

        this.getUserData = function(id){
            return $http.get('/getUser/'+ id).then(function(response){
                
                return response.data;
            })
        }
            
        this.getTopFriends = function(id){
            return $http.get('/getFriends/' + id).then(function(response){
             
                return response.data;
            })
        }

        this.getRecommendedMovies = function(id){
            return $http.get('/getUserActivity/' + id)
            .then(function(response){
                var recommendedMovies = [];
               
                for(var i=0; i<response.data.length;i++){
                    if(response.data[i].recommends){
                        $http.get("/getMovieById/" + response.data[i].movie_id)
                        .then(function(response){
                           
                        
                            recommendedMovies.push({imageUrl: baseUrl + response.data.poster_path, title: response.data.original_title})
                        })
                    }
                }
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
                           

                            seenMovies.push({imageUrl: baseUrl + response.data.poster_path, title: response.data.original_title})
                        })
                    }
                }
                
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
                           

                            wantToSee.push({imageUrl: baseUrl + response.data.poster_path, title: response.data.original_title})
                        })
                    }
                }
                
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

                            favMovies.push({imageUrl: baseUrl + response.data.poster_path, title: response.data.original_title, id: response.data.id})
                        })
                    }
                }
                console.log("favMovies:", favMovies);
                return favMovies;
            })
        }


        this.addToFavs = (userId, movieId) => {
            return $http.post(`/postFav/${userId}/${movieId}`)
        }
        this.addToSeen = (userId, movieId) => {
            return $http.post(`/postSeen/${userId}/${movieId}`)
        }
        this.addToSee = (userId, movieId) => {
            return $http.post(`/postToSee/${userId}/${movieId}`)
        }
        this.postRecommendation = (userId, movieId) => {
            return $http.post(`/postRecommendation/${userId}/${movieId}`)
        }
        this.thumbUp = (userId, movieId) => {
            return $http.post(`/thumbUp/${userId}/${movieId}`)
        }
        this.thumbSide = (userId, movieId) => {
            return $http.post(`/thumbSide/${userId}/${movieId}`)
        }
        this.thumbDown = (userId, movieId) => {
            return $http.post(`/thumbDown/${userId}/${movieId}`)
        }


        /*--------------------------------------------------------------------*
                              Feed Endpoints
        *--------------------------------------------------------------------*/ 

       this.getMovieForFeed = function(id){
           return $http.get('/getNewFeed/' + id)
           .then(function(response){
               var moviesForFeed = [];
               var feedData = response.data;
               for(var i=0; i < response.data.length; i++){
                    if(response.data[i].movie_id){
                        $http.get('/getMovieById/' + response.data[i].movie_id)
                        .then(function(response){
                         

                            moviesForFeed.push({feedData: feedData, imageUrl: baseUrl + response.data.poster_path, title: response.data.original_title, overview: response.data.overview})
                        })
                    }
                }
                console.log("movies:", moviesForFeed)
                return moviesForFeed;
           })
       }
});