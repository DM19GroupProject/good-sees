angular.module('goodSees')
    .controller('profileCtrl', function ($scope, mainService, userService) {
        $scope.link = 'default'
        $scope.test = mainService.test;

        userService.getUserId().then(response => {
            return response
            $scope.currentUserData = response
        }).then(response => {


            mainService.getUserData(response)
                .then(function (response) {
                    $scope.userData = response[0];
                    $scope.userId = response[0]['fb_id'];
                    console.log('userId: ', $scope.userId)
                })
            mainService.getTopFriends(response)
                .then(function (response) {
                    console.log("friends", response)
                    $scope.friends = response;
                })

            mainService.getRecommendedMovies(response)
                .then(function (response) {
                    $scope.recMovies = response;
                    console.log('recMovies: ', response)

                })


            // mainService.getFriends(response)
            //     .then(function (response) {
            //         $scope.friendList = response;
            //     })


            $scope.getFavMovies = function(){
                mainService.getFavMovies(response)
                .then(function(response){
                $scope.favMovies = response;
            
                })
            }
            $scope.getFavMovies();
    
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
            $scope.getSeenMovies = function () {
                mainService.getSeenMovies(response)
                    .then(function (response) {
                        console.log("get seen", response)
                        $scope.seenMovies = response;
                    })
            }

            $scope.getSeenMovies();


            $scope.getWantToSee = function () {
                mainService.getWantToSee(response)
                    .then(function (response) {
                        console.log("want to see", response)
                        $scope.wantToSee = response;
                    })
                }
            $scope.getWantToSee();
            // $scope.test = "YAY"

            // $scope.getFavMovies = function () {
            //     mainService.getFavMovies(response)
            //         .then(function (response) {
            //             $scope.favMovies = response;

            //         })
            // }
            // $scope.getFavMovies();


            $scope.addToFavs = (userId, movieId) => {
                mainService.addToFavs(userId, movieId)
                    .then(function (response) {
                        $scope.getFavMovies();
                    })
            }
            $scope.deleteSeen = (userId, movieId) => {
                mainService.deleteSeen(userId, movieId)
                $scope.getSeenMovies();
            }
            $scope.deleteFav = (userId, movieId) => {
                mainService.deleteFav(userId, movieId)
                    .then(function (response) {
                        $scope.getFavMovies();
                    })

            }
            $scope.deleteToSee = (userId, movieId) => {
                mainService.deleteToSee(userId, movieId)
                    .then(function (response) {
                        $scope.getWantToSee();
                    })

            }
            $scope.addToSeen = (userId, movieId) => {
                mainService.addToSeen(userId, movieId);
                $scope.deleteToSee(userId, movieId);
            }

        //      var seenPage = 1;

        //     $scope.getSeenMovies = function(){
        //         mainService.getSeenMovies($state.params.id, seenPage)
        //         .then(response => {
        //         console.log('get seen', response.data)
        //         $scope.seenMovies = response.data.results;
        //         })
        //     };

        // $scope.getSeenMovies();

        // $scope.nextPage = function() {
        //     seenPage++;
        //     $scope.getSeenMovies();
        // }
        // $scope.prevPage = function (){
        //     if(seenPage > 1){
        //         seenPage--;
        //     $scope.getSeenMovies();    
        //     }
        
        // }
        })
    });

