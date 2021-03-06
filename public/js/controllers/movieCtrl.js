angular.module('goodSees')
    .controller('movieCtrl', function ($scope, mainService, tmdbService, userService, $state) {

        userService.getUserId().then(response => {
            return response
        }).then(response => {
            mainService.getUserData(response)
                .then(function (response) {
                    $scope.userData = response[0];
                })
        })
        console.log($scope.userData)
        var id = $state.params.id
        tmdbService.getMovieById(id).then(response => {
            $scope.movieData = response.data
        })

        $scope.addToFavs = (userId, movieId) => {
            mainService.addToFavs(userId, movieId)
        }

        $scope.addToSeen = (userId, movieId) => {
            mainService.addToSeen(userId, movieId)
        }

        $scope.addToSee = (userId, movieId) => {
            mainService.addToSee(userId, movieId)
        }
        $scope.postRecommendation = (userId, movieId) => {
            mainService.postRecommendation(userId, movieId)
        }
        $scope.thumbUp = (userId, movieId) => {
            mainService.thumbUp(userId, movieId)
        }
        $scope.thumbSide = (userId, movieId) => {
            mainService.thumbSide(userId, movieId)
        }
        $scope.thumbDown = (userId, movieId) => {
            mainService.thumbDown(userId, movieId)
        }
    });