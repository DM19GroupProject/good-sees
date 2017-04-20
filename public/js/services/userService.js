angular.module('goodSees')
  .service('userService', function ($http) {

    let userId = null;

    this.userId = userId; 
    this.getUserId = getUserId;
    
    function getUserId() {
      return $http.get(`/auth/me`).then(res => {

        // console.log('I ran',res.status, res.data, res)

        // if(res.status !== 200) {$state.go('login')}
        userId = res.data
        return res.data
      })
    }
    

   /*--------------------------------------------------------------------*
                             Friends page Endpoints
        *--------------------------------------------------------------------*/


        this.getFriends = id => {
            return $http.get(`/getFriends/${id}`)
            
        }

  });
// make sure that you inject userService, and then wrap all call relating to the user id in this function >>
// userService.getUserId().then(function (userId) { 
//   $http.get('/whatever/' + userId + '/' + 'whatever').then(res => {
//     do stuff here
//   })
// })
