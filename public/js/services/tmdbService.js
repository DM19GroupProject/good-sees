angular.module('goodSees')
    .service('tmdbService', function($http){
    var baseUrl = 'https://api.themoviedb.org/3/'
    var discoverPageNum = 1

    this.searchMovieByTitle = movieTitle => $http.get(`/searchMovieByTitle/${movieTitle}`)
    
    
    this.searchMovieByCastMember = castMember => {
        
        return $http.get(`/searchMovieByCastMember/${castMember}`)
    }











    this.getMoviesByGenre = id => {
        return $http.get(`/getMoviesByGenre/${id}`)
    }
   
   this.getMovieById = movieId => {
       console.log(movieId)
       return $http.get(`/getMovieById/${movieId}`)
   }

});