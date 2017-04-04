angular.module('goodSees')
    .controller('searchCtrl', function ($scope, tmdbService) {
   /*--------------------------------------------------------------------*
                     Event Handlers 
    *--------------------------------------------------------------------*/ 
        $scope.searchMovieByTitle = function (keyEvent) {
            if (keyEvent.which === 13) {
                tmdbService.searchMovieByTitle($scope.searchStuff)
                .then(function (movieInfo) {
                    $scope.search = movieInfo.data
                })
            }
        }

    });