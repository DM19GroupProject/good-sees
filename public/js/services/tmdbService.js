angular.module('goodSees')
    .service('tmdbService', function($http){
    var baseUrl = 'https://api.themoviedb.org/3/'
    var discoverPageNum = 1

    this.searchMovieByTitle = title => $http.get(`/searchMovieByTitle/${title}`)
    this.searchMovieByCast = cast => {
     
        return $http.get(`/searchMovieByCast/${cast}`)
    }
   

});