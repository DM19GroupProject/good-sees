angular.module('goodSees')
.directive('profileControls', function(){
  return {
    restrict: 'AE',
    link: function(scope, element, attributes){
      $(document).ready(function(){
        $('#profileTab').click(function() {
          $('#profileTab').addClass('afterClick');
          $('#seenTab').removeClass('afterClick');
          $('#wantToSeeTab').removeClass('afterClick');
          $('#favoritesTab').removeClass('afterClick');
        });
        $('#seenTab').click(function() {
          $('#profileTab').addClass('beforeClick');
          $('#seenTab').addClass('afterClick');
          $('#wantToSeeTab').removeClass('afterClick');
          $('#favoritesTab').removeClass('afterClick');
        });
        $('#wantToSeeTab').click(function() {
          $('#profileTab').addClass('beforeClick');
          $('#seenTab').removeClass('afterClick');
          $('#wantToSeeTab').addClass('afterClick');
          $('#favoritesTab').removeClass('afterClick');
        });
        $('#favoritesTab').click(function() {
          $('#profileTab').addClass('beforeClick');
          $('#seenTab').removeClass('afterClick');
          $('#wantToSeeTab').removeClass('afterClick');
          $('#favoritesTab').addClass('afterClick');
        });

        
      })
    }
  }
})