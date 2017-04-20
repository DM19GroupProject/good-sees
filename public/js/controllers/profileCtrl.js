angular.module('goodSees')
    .controller('profileCtrl', function($scope, mainService, userService){
        $scope.link = 'default'
        $scope.test = mainService.test;

        userService.getUserId().then( response => {
           return response
           $scope.currentUserData = response
        }).then( response =>  {

            
        mainService.getUserData(response)
        .then(function(response){
            $scope.userData = response[0];
            $scope.userId = response[0]['fb_id'];
            console.log('userId: ', $scope.userId)
        })
        mainService.getTopFriends(response)
        .then(function(response){
            $scope.friends = response;
        })

        mainService.getRecommendedMovies(response)
        .then(function(response){
            $scope.recMovies = response;
           
        })


        mainService.getFriends(response)
        .then(function(response){
            $scope.friendList = response;
        })

        $scope.getSeenMovies = function(){
            mainService.getSeenMovies(response)
            .then(function(response){
            $scope.seenMovies = response;
             })
        }
        $scope.getSeenMovies();

        $scope.getWantToSee = function(){
            mainService.getWantToSee(response)
            .then(function(response){
                $scope.wantToSee = response;
            })
        }
        $scope.getWantToSee();

        $scope.getFavMovies = function(){
            mainService.getFavMovies(response)
            .then(function(response){
            $scope.favMovies = response;
            
            })
        }
        $scope.getFavMovies();
    })
    
    $scope.addToFavs = (userId, movieId) =>{
        mainService.addToFavs(userId, movieId)
        .then(function(response){
        $scope.getFavMovies();        
        })
    }
    $scope.deleteSeen = (userId, movieId) => {
        mainService.deleteSeen(userId, movieId)
        $scope.getSeenMovies();
    }
    $scope.deleteFav = (userId, movieId) => {
        mainService.deleteFav(userId, movieId)
        .then(function(response){
        $scope.getFavMovies();
        })

    }
    $scope.deleteToSee = (userId, movieId) => {
        mainService.deleteToSee(userId, movieId)
        .then(function(response){
        $scope.getWantToSee();
        })
        
    }
    $scope.addToSeen = (userId, movieId) =>{
        mainService.addToSeen(userId, movieId);
        $scope.deleteToSee(userId, movieId);
    }

});