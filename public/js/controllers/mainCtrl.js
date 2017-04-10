angular.module('goodSees')
    .controller('mainCtrl', function($scope, mainService, tmdbService){
       
       $scope.categories = [  
            {  
                "id":28,
                "name":"Action"
            },
            {  
                "id":12,
                "name":"Adventure"
            },
            {  
                "id":16,
                "name":"Animation"
            },
            {  
                "id":35,
                "name":"Comedy"
            },
            {  
                "id":80,
                "name":"Crime"
            },
            {  
                "id":99,
                "name":"Documentary"
            },
            {  
                "id":18,
                "name":"Drama"
            },
            {  
                "id":10751,
                "name":"Family"
            },
            {  
                "id":14,
                "name":"Fantasy"
            },
            {  
                "id":36,
                "name":"History"
            },
            {  
                "id":27,
                "name":"Horror"
            },
            {  
                "id":9648,
                "name":"Mystery"
            },
            {  
                "id":10749,
                "name":"Romance"
            },
            {  
                "id":878,
                "name":"Science Fiction"
            },
            {  
                "id":10770,
                "name":"TV Movie"
            },
            {  
                "id":53,
                "name":"Thriller"
            },
            {  
                "id":10752,
                "name":"War"
            },
            {  
                "id":37,
                "name":"Western"
            }
        ]


        
        /*--------------------------------------------------------------------*
                     Event Handlers 
        *--------------------------------------------------------------------*/ 
        //movie title search
        $scope.navSearchMovieByTitle = function (keyEvent, navMovieTitle) {
            if (keyEvent.which === 13) {
                tmdbService.searchMovieByTitle(navMovieTitle)
                .then(movieInfo => {
                    console.log(movieInfo.data)
                    $scope.navMovieInfo = movieInfo.data
                })
            }
        }
        
       //cast search
        $scope.navSearchMovieByCast = function (keyEvent, navCastMember) {
            if(keyEvent.which === 13) {
            
                tmdbService.ssearchMovieByCastMember(navCastMember)
                .then(navActorInfo => {
                    
                    $scope.navActorInfo = navActorInfo.data
                })
            }
        }
    });