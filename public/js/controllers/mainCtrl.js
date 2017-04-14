angular.module('goodSees')
    .controller('mainCtrl', function ($scope, $state, mainService, tmdbService, userService) {
        $scope.categories = [

            {
                "id": 28,
                "name": "Action"
            },
            {
                "id": 12,
                "name": "Adventure"
            },
            {
                "id": 16,
                "name": "Animation"
            },
            {
                "id": 35,
                "name": "Comedy"
            },
            {
                "id": 80,
                "name": "Crime"
            },
            {
                "id": 99,
                "name": "Documentary"
            },
            {
                "id": 18,
                "name": "Drama"
            },
            {
                "id": 10751,
                "name": "Family"
            },
            {
                "id": 14,
                "name": "Fantasy"
            },
            {
                "id": 36,
                "name": "History"
            },
            {
                "id": 27,
                "name": "Horror"
            },
            {
                "id": 9648,
                "name": "Mystery"
            },
            {
                "id": 10749,
                "name": "Romance"
            },
            {
                "id": 878,
                "name": "Science Fiction"
            },
            {
                "id": 10770,
                "name": "TV Movie"
            },
            {
                "id": 53,
                "name": "Thriller"
            },
            {
                "id": 10752,
                "name": "War"
            },
            {
                "id": 37,
                "name": "Western"
            }
        ]
        $scope.setCatHeading = category => {$scope.catHeading = category};

        /////variables///////
        $scope.resultFlag = true;
        $scope.hideFlag = false;
        $scope.searchCategory = 'title'
        
        /*--------------------------------------------------------------------*
                                    Event Handlers 
        *--------------------------------------------------------------------*/
        userService.getUserId().then(response => {
            console.log("mubuaba",response)
            return response
        }).then(response => {
            mainService.getUserData(response)
            .then( response => {
                $scope.currentUserData = response[0]
                console.log($scope.currentUserData)
            })
        })


        $scope.titleClicked = function(){
            $scope.searchCategory = 'title';
            $scope.resultFlag = true;
            $scope.hideFlag = false;
        }
        $scope.nameClicked = function(){
            $scope.searchCategory = 'name';
            $scope.resultFlag = false;
            $scope.hideFlag = true;
        }

        $scope.search = function (searchTerm) {

            if ($scope.searchCategory === 'title') {
                console.log($scope.searchCategory)
                tmdbService.searchMovieByTitle(searchTerm, 1)
                    .then(movieInfo => {
                        console.log(movieInfo.data)
                        $scope.movieInfo = movieInfo.data
                        $state.go('main.search-results')
                    })

            }
            if ($scope.searchCategory === 'name') {
                console.log($scope.searchCategory)
                tmdbService.searchMovieByCastMember(searchTerm)
                    .then(actorInfo => {

                        console.log(actorInfo.data)
                        $scope.actorInfo = actorInfo.data
                        $state.go('main.search-results')
                    })
            }
        }

    });
