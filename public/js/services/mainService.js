angular.module('goodSees')
    .service('mainService', function($http){

        this.test = 'Service is working'

        this.getUserData = function(id){
            return $http.get('/getUser/'+ id).then(function(response){
                console.log(response.data);
                return response.data;
            })
        }
});