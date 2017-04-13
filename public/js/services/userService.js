angular.module('goodSees')
  .service('userService', function ($http) {

    let userId = null;

    this.userId = userId; 
    this.getUserId = getUserId;
    
    function getUserId() {
      return $http.get(`/auth/me`).then(res => {
        userId = res.data
      })
    }
    
  });
