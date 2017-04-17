angular.module('goodSees').controller('friendsProfileCtrl', function($scope, mainService){
  mainService.getFriends()
  .then(function(response){
    $scope.friendList = response;
  })

})