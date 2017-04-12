angular.module('goodSees')
    .service('tmdbService', function($http){
    var baseUrl = 'https://api.themoviedb.org/3/'
    var discoverPageNum = 1

    this.searchMovieByTitle = (movieTitle, page) => $http.get(`/searchMovieByTitle/${movieTitle}/${page}`)
    
    
    this.searchMovieByCastMember = castMember => {
        
        return $http.get(`/searchMovieByCastMember/${castMember}`)
    }











    this.getMoviesByGenre = (id, page) => {
        return $http.get(`/getMoviesByGenre/${id}/${page}`)
    }
   
   this.getMovieById = movieId => {
       console.log(movieId)
       return $http.get(`/getMovieById/${movieId}`)
   }

});