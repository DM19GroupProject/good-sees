angular.module('goodSees')
    .controller('friendsCtrl', function($scope, $state, mainService, userService){
//    var id = $scope.currentUserData.fb_id
   var id = 1197287247035846
   
        userService.getFriends(id)
            .then( response => {
                $scope.userFriends = response.data
                console.log($scope.userFriends)
            })
});