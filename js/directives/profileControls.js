angular.module('goodSees')
.directive('profileControls', function(){
  return {
    restrict: 'AE',
    link: function(scope, element, attributes){
      $(document).ready(function(){
        $('#profileTab').click(function() {
          $('#profileTab').addClass('afterClick');
          $('#seenTab').removeClass('afterClick');
          $('#friendsTab').removeClass('afterClick');
          $('#wantToSeeTab').removeClass('afterClick');
          $('#favoritesTab').removeClass('afterClick');
        });
        $('#seenTab').click(function() {
          $('#profileTab').removeClass('afterClick');
          $('#profileTab').addClass('beforeClick');
          $('#seenTab').addClass('afterClick');
          $('#friendsTab').removeClass('afterClick');
          $('#wantToSeeTab').removeClass('afterClick');
          $('#favoritesTab').removeClass('afterClick');
        });
        $("#friendsTab").click(function(){
          $('#profileTab').removeClass('afterClick');
          $('#profileTab').addClass('beforeClick');
          $('#seenTab').removeClass('afterClick');
          $('#friendsTab').addClass('afterClick');
          $('#wantToSeeTab').removeClass('afterClick');
          $('#favoritesTab').removeClass('afterClick');
        })
        $('#wantToSeeTab').click(function() {
          $('#profileTab').removeClass('afterClick');
          $('#seenTab').removeClass('afterClick');
          $('#friendsTab').removeClass('afterClick');
          $('#wantToSeeTab').addClass('afterClick');
          $('#favoritesTab').removeClass('afterClick');
        });
        $('#favoritesTab').click(function() {
          $('#profileTab').removeClass('afterClick');
          $('#seenTab').removeClass('afterClick');
          $('#friendsTab').removeClass('afterClick');
          $('#wantToSeeTab').removeClass('afterClick');
          $('#favoritesTab').addClass('afterClick');
        });

        
      })
    }
  }
})