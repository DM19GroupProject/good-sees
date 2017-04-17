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
                $('.close-ham').click(function(){
                    $('.lists-links').removeClass('display-flex');
                })


                /////////adding overlay to movie thumbnails/////
                if($(window).width() >= 750) {
                    $('.category-results-movie, .actor-results-movie').mouseenter(function(){
                        $(this).children('.category-overlay').css('display', 'flex');
                    })
                    $('.category-results-movie, .actor-results-movie').mouseleave(function(){
                        $(this).children('.category-overlay').css('display', 'none');
                    })
                    $('.overlayFav').click(function(){
                        $(this).children('i').css('color', '#F6BC2A')
                    })
                    $('.overlaySeen').click(function(){
                        $(this).children('i').css('color', '#4AC948')
                    })
                    $('.overlayList').click(function(){
                        $(this).children('i').css('color', '#008B8B')
                    })
                }
                ////////////////////////////////////////////////////////


                /*--------------------------------------------------------------------*
                              Desktop Dropdown Controls
                *--------------------------------------------------------------------*/ 
                $('#wide-menu-ham').click(function(){ 
                    // $('.dropdown-link-container').addClass('display-flex')
                    $('.desktop-profile-dropdown').addClass('display-block');
                })
                $('#cat-btn, #search-btn, .feedContainer, .mobile-search-btn, .categories-wrapper, .profilePicContainer, .results-search-container, .close-ham').click(function() {
                    
                        $(".desktop-profile-dropdown").removeClass('display-block');
                        // $('.dropdown-link-container').removeClass('display-flex')
                });
                //////////////Search///////////////                
                $('#search-btn').click(function(){
                    $('.desktop-search-dropdown').addClass('display-block')
                })
                $('#cat-btn, #wide-menu-ham, .feedContainer, .mobile-search-btn, .categories-wrapper, .profilePicContainer, .results-search-container').click(function(){
                    $('.desktop-search-dropdown').removeClass('display-block');
                })
                
                //////////////Categories///////////////
                $('#cat-btn').click(function(){
                    $('.desktop-categories-dropdown').addClass('display-flex');
                })
                $(document).click(function(e) {
                    if( e.target.id != 'cat-btn') {
                        $(".desktop-categories-dropdown").removeClass('display-flex');
                    }
                });
                
                /*--------------------------------------------------------------------*
                              Search By Toggle
                *--------------------------------------------------------------------*/

                let byName = $('.search-by-name');
                let byTitle = $('.search-by-title');
                let byFriend = $('.search-by-friend');

                byName.click(function(){
                    byName.addClass('selected');
                    byTitle.removeClass('selected');
                    byFriend.removeClass('selected');
                })
                byTitle.click(function(){
                    byTitle.addClass('selected');
                    byName.removeClass('selected');
                    byFriend.removeClass('selected');
                })
                byFriend.click(function(){
                    byFriend.addClass('selected');
                    byName.removeClass('selected');
                    byTitle.removeClass('selected');
                })

                /////////////scroll up//////////
                $('.scroll-up').click(function(){
                    $('body').scrollTop(0);
                })

                 /*--------------------------------------------------------------------*
                              Feed
                *--------------------------------------------------------------------*/
                $('.feedSearchSelection').click(function(){
                    console.log('selected movie')
                    $('.postData').hide();
                    $('.recCard').show();
                    $('.feedSearchResults').hide();
                })
                $('#feed-search-btn').click(function(){
                    $('.feedSearchResultsContainer').css('display', 'flex');
                })
            });
        }
    }
});

                