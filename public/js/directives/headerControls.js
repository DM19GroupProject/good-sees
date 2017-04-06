angular.module('goodSees')
.directive('headerControls', function(){
    return {
        restrict: 'AE',
        link: function(scope, element, attributes) {
            $(document).ready(function () {
                $('#mobile-menu-ham').click(function(){
                    $('.mobile-dropdown-menu').toggleClass('display-block');
                })
                $('#cat-link').click(function(){
                    $('.dropdown-category-links').toggleClass('display-flex');
                })
                $('.dropdown-profile-info').click(function(){
                    $('.dropdown-link-container').toggleClass('display-flex');
                })
                $('.list-link').click(function(){
                    $('.lists-links').toggleClass('display-flex');
                })
                $('#wide-menu-ham').click(function(){
                    $('.dropdown-link-container').toggleClass('display-flex')
                    $('.desktop-profile-dropdown').toggleClass('display-block');
                })
                $('#search-btn').click(function(){
                    $('.desktop-search-dropdown').toggleClass('display-block')
                })
                $('#cat-btn').click(function(){
                    $('.desktop-categories-dropdown').toggleClass('display-flex');
                })
                
            });
        }
    }
});