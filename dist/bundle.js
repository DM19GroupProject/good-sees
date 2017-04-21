'use strict';

angular.module('goodSees', ['ui.router']).config(function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/login');
    $urlRouterProvider.when('/', '/feed');
    $stateProvider.state('login', {
        url: '/login',
        templateUrl: './views/login.html',
        controller: 'loginCtrl'
    }).state('main', {
        url: '/',
        templateUrl: './views/main.html',
        controller: 'mainCtrl',
        resolve: {
            messages: function messages($http, userService, $state) {
                return $http.get('/auth/me').then(function (res) {
                    console.log('hoping for a 200...', res.status);
                    if (res.status !== 200) {
                        $state.go('login');
                    }
                });
            }
        }
    }).state('main.feed', {
        url: 'feed',
        templateUrl: './views/feed.html',
        controller: 'feedCtrl'
    }).state('main.user-profile', {
        url: 'profile/:id',
        templateUrl: './views/profile.html',
        controller: 'profileCtrl'
    }).state('main.movie-profile', {
        url: 'movie/:id',
        templateUrl: './views/movie.html',
        controller: 'movieCtrl'
    }).state('main.search-results', {
        url: 'results',
        templateUrl: './views/searchResults.html',
        controller: 'searchCtrl'
    }).state('main.categories', {
        url: 'categories/:id',
        templateUrl: './views/categories.html',
        controller: 'categoriesCtrl'
    }).state('main.friends', {
        url: 'friends/:id',
        templateUrl: './views/friends.html',
        controller: 'friendsCtrl'
    }).state('main.favorites', {
        url: 'favorites/:id',
        templateUrl: './views/favorites.html',
        controller: 'favoritesCtrl'
    }).state('main.seen', {
        url: 'seen/:id',
        templateUrl: './views/seen.html',
        controller: 'seenCtrl'
    }).state('main.toSee', {
        url: 'to-see/:id',
        templateUrl: './views/toSee.html',
        controller: 'toSeeCtrl'
    }).state('main.friendProfile', {
        url: 'friend-profile/:id',
        templateUrl: './views/friendsProfile.html',
        controller: "friendsProfileCtrl"
    });
}).filter('slice', function () {
    return function (arr, start, end) {
        return arr.slice(start, end);
    };
});
'use strict';

angular.module('goodSees').directive('headerControls', function () {
    return {
        restrict: 'AE',
        link: function link(scope, element, attributes) {
            $(document).ready(function () {
                $('#mobile-menu-ham').click(function () {
                    $('.mobile-dropdown-menu').toggleClass('display-block');
                });
                $('#cat-link').click(function () {
                    $('.dropdown-category-links').toggleClass('display-flex');
                });
                $('.dropdown-profile-info').click(function () {
                    $('.dropdown-link-container').toggleClass('display-flex');
                });
                $('.list-link').click(function () {
                    $('.lists-links').toggleClass('display-flex');
                });
                $('.close-ham').click(function () {
                    $('.lists-links').removeClass('display-flex');
                });

                /////////adding overlay to movie thumbnails/////
                if ($(window).width() >= 750) {
                    $('.category-results-movie, .actor-results-movie, .profileMoviesSeen').mouseenter(function () {
                        $(this).children('.category-overlay').css('display', 'flex');
                    });
                    $('.category-results-movie, .actor-results-movie, .profileMoviesSeen').mouseleave(function () {
                        $(this).children('.category-overlay').css('display', 'none');
                    });
                    $('.overlayFav').click(function () {
                        $(this).children('i').css('color', '#F6BC2A');
                    });
                    $('.overlaySeen').click(function () {
                        $(this).children('i').css('color', '#4AC948');
                    });
                    $('.overlayList').click(function () {
                        $(this).children('i').css('color', '#008B8B');
                    });
                }
                ////////////////////////////////////////////////////////


                /*--------------------------------------------------------------------*
                              Desktop Dropdown Controls
                *--------------------------------------------------------------------*/
                $('#wide-menu-ham').click(function () {
                    // $('.dropdown-link-container').addClass('display-flex')
                    $('.desktop-profile-dropdown').addClass('display-block');
                });
                $('#cat-btn, #search-btn, .feedContainer, .mobile-search-btn, .categories-wrapper, .profilePicContainer, .results-search-container, .close-ham, .movie-flex-box').click(function () {

                    $(".desktop-profile-dropdown").removeClass('display-block');
                    // $('.dropdown-link-container').removeClass('display-flex')
                });
                //////////////Search///////////////                
                $('#search-btn').click(function () {
                    $('.desktop-search-dropdown').addClass('display-block');
                });
                $('#cat-btn, #wide-menu-ham, .feedContainer, .mobile-search-btn, .categories-wrapper, .profilePicContainer, .results-search-container, .movie-flex-box').click(function () {
                    $('.desktop-search-dropdown').removeClass('display-block');
                });

                //////////////Categories///////////////
                $('#cat-btn').click(function () {
                    $('.desktop-categories-dropdown').addClass('display-flex');
                });
                $(document).click(function (e) {
                    if (e.target.id != 'cat-btn') {
                        $(".desktop-categories-dropdown").removeClass('display-flex');
                    }
                });

                /*--------------------------------------------------------------------*
                              Search By Toggle
                *--------------------------------------------------------------------*/

                var byName = $('.search-by-name');
                var byTitle = $('.search-by-title');
                var byFriend = $('.search-by-friend');

                byName.click(function () {
                    byName.addClass('selected');
                    byTitle.removeClass('selected');
                    byFriend.removeClass('selected');
                });
                byTitle.click(function () {
                    byTitle.addClass('selected');
                    byName.removeClass('selected');
                    byFriend.removeClass('selected');
                });
                byFriend.click(function () {
                    byFriend.addClass('selected');
                    byName.removeClass('selected');
                    byTitle.removeClass('selected');
                });

                /////////////scroll up//////////
                $('.scroll-up').click(function () {
                    $('body').scrollTop(0);
                });

                /*--------------------------------------------------------------------*
                             Feed
                *--------------------------------------------------------------------*/
                $('.feedSearchSelection').click(function () {
                    console.log('selected movie');
                    $('.postData').hide();
                    $('.recCard').show();
                    $('.feedSearchResults').hide();
                });
                $('#feed-search-btn').click(function () {
                    $('.feedSearchResultsContainer').css('display', 'flex');
                });
            });
        }
    };
});
'use strict';

$(document).ready(function () {

  $('.topFriendCarousel').flickity({
    cellAlign: 'left',
    contain: true,
    groupCells: 3
  });
});
'use strict';

angular.module('goodSees').controller('categoriesCtrl', function ($scope, $state, mainService, tmdbService, userService) {

    userService.getUserId().then(function (response) {
        return response;
    }).then(function (response) {
        mainService.getUserData(response).then(function (response) {
            $scope.userData = response[0];
        });
    });

    var categoryPage = 1;

    $scope.getMoviesByGenre = function () {
        tmdbService.getMoviesByGenre($state.params.id, categoryPage).then(function (response) {
            console.log(response.data);
            $scope.moviesByGenre = response.data.results;
        });
    };

    $scope.getMoviesByGenre();

    $scope.nextPage = function () {
        categoryPage++;
        $scope.getMoviesByGenre();
    };
    $scope.prevPage = function () {
        if (categoryPage > 1) {
            categoryPage--;
            $scope.getMoviesByGenre();
        }
    };

    $scope.addToFavs = function (userId, movieId) {
        mainService.addToFavs(userId, movieId);
    };
    $scope.addToSeen = function (userId, movieId) {
        mainService.addToSeen(userId, movieId);
    };
    $scope.addToSee = function (userId, movieId) {
        mainService.addToSee(userId, movieId);
    };
});
'use strict';

angular.module('goodSees').controller('favoritesCtrl', function ($scope, $state, mainService, tmdbService, userService) {

    userService.getUserId().then(function (response) {
        $scope.userId = response;
        return response;
    }).then(function (response) {
        $scope.getFavMovies = function () {
            mainService.getFavMovies(response).then(function (response) {
                $scope.favMovies = response;
            });
        };
        $scope.getFavMovies();
    });

    $scope.addToFavs = function (userId, movieId) {
        mainService.addToFavs(userId, movieId);
    };
    $scope.deleteFav = function (userId, movieId) {
        mainService.deleteFav(userId, movieId);
        $scope.getFavMovies();
    };
});
'use strict';

angular.module('goodSees').controller('feedCtrl', function ($scope, mainService, tmdbService, userService) {

    $scope.baseUrl = mainService.baseUrl;
    // var id = 2197287247035846;
    $scope.pageNum = 0;
    console.log('page: ');

    /*--------------------------------------------------------------------*
                  Event Handlers 
     *--------------------------------------------------------------------*/
    //movie title search
    userService.getUserId().then(function (response) {
        return response;
    }).then(function (response) {
        mainService.getUserData(response).then(function (response) {
            return response[0];
        }).then(function (userData) {

            var id = userData.fb_id;
            console.log('id: ', id);

            $scope.getMovieForFeed = function () {
                mainService.getMovieForFeed(id, $scope.pageNum).then(function (response) {
                    console.log(response);
                    $scope.activities = response;
                });
            };

            $scope.getMovieForFeed();
        });
    });

    $scope.newRecommendation;

    $scope.thumbUp = function (userId, movieId) {
        mainService.thumbUp(userId, movieId);
    };
    $scope.thumbSide = function (userId, movieId) {
        mainService.thumbSide(userId, movieId);
    };
    $scope.thumbDown = function (userId, movieId) {
        mainService.thumbDown(userId, movieId);
    };

    $scope.postRec = function (userId, movieId) {
        mainService.postRec(userId, movieId);
    };

    $scope.postReview = function (movieId, commentTitle, comment, userId) {
        mainService.postReview(movieId, commentTitle, comment, userId).then(function () {
            $scope.getMovieForFeed();
        });
    };

    $scope.searchMovieByTitle = function (movieTitle) {
        tmdbService.searchMovieByTitle(movieTitle).then(function (movieInfo) {
            $scope.feedMovieInfo = movieInfo.data;
            console.log('feedSearch: ', $scope.feedMovieInfo);
        });
    };
    $scope.selectMovie = function (movie) {
        $scope.recSelection = movie;
    };
});
'use strict';

angular.module('goodSees').controller('friendsCtrl', function ($scope, $state, mainService, userService) {
    var id = $scope.currentUserData.fb_id;

    //    var id = 1197287247035846
    console.log(id);

    userService.getFriends(id).then(function (response) {
        $scope.userFriends = response.data;
        console.log($scope.userFriends);
    });
});
'use strict';

angular.module('goodSees').controller('friendsProfileCtrl', function ($scope, mainService, $stateParams) {

    $scope.friendId = $stateParams.id;

    //   mainService.getFriends()
    //   .then(function(response){
    //     $scope.friendList = response;
    //   })

    mainService.getUserData($scope.friendId).then(function (response) {
        $scope.userData = response[0];
        console.log("userData", $scope.userData);
    });

    mainService.getTopFriends($scope.friendId).then(function (response) {
        $scope.friends = response;
    });

    mainService.getRecommendedMovies($scope.friendId).then(function (response) {
        $scope.recMovies = response;
    });

    mainService.getSeenMovies($scope.friendId).then(function (response) {
        $scope.seenMovies = response;
    });

    mainService.getWantToSee($scope.friendId).then(function (response) {
        $scope.wantToSee = response;
    });

    mainService.getFavMovies($scope.friendId).then(function (response) {
        $scope.favMovies = response;
    });
});
'use strict';

angular.module('goodSees').controller('headerCtrl', function ($scope, mainService, tmdbService) {

    $scope.test = mainService.test;
});
'use strict';

angular.module('goodSees').controller('loginCtrl', function ($scope, mainService, $http, $state) {

    $scope.test = mainService.test;

    //       
});
'use strict';

angular.module('goodSees').controller('mainCtrl', function ($scope, $state, mainService, tmdbService, userService) {
    $scope.categories = [{
        "id": 28,
        "name": "Action"
    }, {
        "id": 12,
        "name": "Adventure"
    }, {
        "id": 16,
        "name": "Animation"
    }, {
        "id": 35,
        "name": "Comedy"
    }, {
        "id": 80,
        "name": "Crime"
    }, {
        "id": 99,
        "name": "Documentary"
    }, {
        "id": 18,
        "name": "Drama"
    }, {
        "id": 10751,
        "name": "Family"
    }, {
        "id": 14,
        "name": "Fantasy"
    }, {
        "id": 36,
        "name": "History"
    }, {
        "id": 27,
        "name": "Horror"
    }, {
        "id": 9648,
        "name": "Mystery"
    }, {
        "id": 10749,
        "name": "Romance"
    }, {
        "id": 878,
        "name": "Science Fiction"
    }, {
        "id": 10770,
        "name": "TV Movie"
    }, {
        "id": 53,
        "name": "Thriller"
    }, {
        "id": 10752,
        "name": "War"
    }, {
        "id": 37,
        "name": "Western"
    }];
    $scope.setCatHeading = function (category) {
        $scope.catHeading = category;
    };

    /////variables///////
    $scope.resultFlag = true;
    $scope.hideFlag = false;
    $scope.searchCategory = 'title';

    /*--------------------------------------------------------------------*
                                Event Handlers
    *--------------------------------------------------------------------*/
    userService.getUserId().then(function (response) {
        return response;
    }).then(function (response) {
        mainService.getUserData(response).then(function (response) {
            $scope.currentUserData = response[0];
        });
    });

    $scope.logout = userService.logout;

    $scope.titleClicked = function () {
        $scope.searchCategory = 'title';
        $scope.resultFlag = true;
        $scope.hideFlag = false;
    };
    $scope.nameClicked = function () {
        $scope.searchCategory = 'name';
        $scope.resultFlag = false;
        $scope.hideFlag = true;
    };

    $scope.search = function (searchTerm) {

        if ($scope.searchCategory === 'title') {
            console.log($scope.searchCategory);
            tmdbService.searchMovieByTitle(searchTerm, 1).then(function (movieInfo) {
                console.log(movieInfo.data);
                $scope.movieInfo = movieInfo.data;
                $state.go('main.search-results');
            });
        }
        if ($scope.searchCategory === 'name') {
            console.log($scope.searchCategory);
            tmdbService.searchMovieByCastMember(searchTerm).then(function (actorInfo) {

                console.log(actorInfo.data);
                $scope.actorInfo = actorInfo.data;
                $state.go('main.search-results');
            });
        }
    };
});
'use strict';

angular.module('goodSees').controller('movieCtrl', function ($scope, mainService, tmdbService, userService, $state) {

    userService.getUserId().then(function (response) {
        return response;
    }).then(function (response) {
        mainService.getUserData(response).then(function (response) {
            $scope.userData = response[0];
        });
    });
    console.log($scope.userData);
    var id = $state.params.id;
    tmdbService.getMovieById(id).then(function (response) {
        $scope.movieData = response.data;
    });

    $scope.addToFavs = function (userId, movieId) {
        mainService.addToFavs(userId, movieId);
    };

    $scope.addToSeen = function (userId, movieId) {
        mainService.addToSeen(userId, movieId);
    };

    $scope.addToSee = function (userId, movieId) {
        mainService.addToSee(userId, movieId);
    };
    $scope.postRecommendation = function (userId, movieId) {
        mainService.postRecommendation(userId, movieId);
    };
    $scope.thumbUp = function (userId, movieId) {
        mainService.thumbUp(userId, movieId);
    };
    $scope.thumbSide = function (userId, movieId) {
        mainService.thumbSide(userId, movieId);
    };
    $scope.thumbDown = function (userId, movieId) {
        mainService.thumbDown(userId, movieId);
    };
});
'use strict';

angular.module('goodSees').controller('profileCtrl', function ($scope, mainService, userService) {
    $scope.link = 'default';
    $scope.test = mainService.test;

    userService.getUserId().then(function (response) {
        return response;
        $scope.currentUserData = response;
    }).then(function (response) {

        mainService.getUserData(response).then(function (response) {
            $scope.userData = response[0];
            $scope.userId = response[0]['fb_id'];
            console.log('userId: ', $scope.userId);
        });
        mainService.getTopFriends(response).then(function (response) {
            $scope.friends = response;
        });

        mainService.getRecommendedMovies(response).then(function (response) {
            $scope.recMovies = response;
        });

        mainService.getFriends(response).then(function (response) {
            $scope.friendList = response;
        });

        $scope.getFavMovies = function () {
            mainService.getFavMovies(response).then(function (response) {
                $scope.favMovies = response;
            });
        };
        $scope.getFavMovies();

        $scope.addToFavs = function (userId, movieId) {
            mainService.addToFavs(userId, movieId).then(function (response) {
                $scope.getFavMovies();
            });
        };

        $scope.deleteSeen = function (userId, movieId) {
            mainService.deleteSeen(userId, movieId);
            $scope.getSeenMovies();
        };

        $scope.deleteFav = function (userId, movieId) {
            mainService.deleteFav(userId, movieId).then(function (response) {
                $scope.getFavMovies();
            });
        };
        $scope.getSeenMovies = function () {
            mainService.getSeenMovies(response).then(function (response) {
                $scope.seenMovies = response;
            });
        };
        $scope.getSeenMovies();

        $scope.getWantToSee = function () {
            mainService.getWantToSee(response).then(function (response) {
                $scope.wantToSee = response;
            });
        };
        $scope.getWantToSee();

        $scope.getFavMovies = function () {
            mainService.getFavMovies(response).then(function (response) {
                $scope.favMovies = response;
            });
        };
        $scope.getFavMovies();

        $scope.addToFavs = function (userId, movieId) {
            mainService.addToFavs(userId, movieId).then(function (response) {
                $scope.getFavMovies();
            });
        };
        $scope.deleteSeen = function (userId, movieId) {
            mainService.deleteSeen(userId, movieId);
            $scope.getSeenMovies();
        };
        $scope.deleteFav = function (userId, movieId) {
            mainService.deleteFav(userId, movieId).then(function (response) {
                $scope.getFavMovies();
            });
        };
        $scope.deleteToSee = function (userId, movieId) {
            mainService.deleteToSee(userId, movieId).then(function (response) {
                $scope.getWantToSee();
            });
        };
        $scope.addToSeen = function (userId, movieId) {
            mainService.addToSeen(userId, movieId);
            $scope.deleteToSee(userId, movieId);
        };
    });
});
'use strict';

angular.module('goodSees').controller('searchCtrl', function ($scope, tmdbService, $state, userService, mainService) {

    var titlePage = 1;
    $scope.apiSearchTerm = $scope.searchTerm;

    userService.getUserId().then(function (response) {
        return response;
    }).then(function (response) {
        mainService.getUserData(response).then(function (response) {
            $scope.userData = response[0];
        });
    });

    /*--------------------------------------------------------------------*
                     Event Handlers
        *--------------------------------------------------------------------*/
    //movie title search
    $scope.searchMovieByTitle = function (keyEvent, movieTitle) {

        if (keyEvent.which === 13) {
            tmdbService.searchMovieByTitle(movieTitle).then(function (movieInfo) {
                console.log(movieInfo.data);
                $scope.movieInfo = movieInfo.data;
                $scope.resultFlag = true;
                $scope.hideFlag = false;
                $scope.apiSearchTerm = $scope.movieTitle;
            });
        }
    };

    //cast search
    $scope.searchMovieByCast = function (keyEvent, castMember) {
        if (keyEvent.which === 13) {

            tmdbService.searchMovieByCastMember(castMember).then(function (actorInfo) {
                console.log(actorInfo.data);
                console.log(actorInfo.data.known_for);
                $scope.actorInfo = actorInfo.data;
                $scope.resultFlag = false;
                $scope.hideFlag = true;
            });
        }
    };
    $scope.nextPage = function () {
        titlePage++;
        tmdbService.searchMovieByTitle($scope.apiSearchTerm, titlePage).then(function (movieInfo) {
            console.log(movieInfo.data);
            $scope.movieInfo = movieInfo.data;
        });
    };
    $scope.prevPage = function () {
        if (titlePage > 1) {
            titlePage--;
            tmdbService.searchMovieByTitle($scope.apiSearchTerm, titlePage).then(function (movieInfo) {
                console.log(movieInfo.data);
                $scope.movieInfo = movieInfo.data;
            });
        }
    };

    ///////////add to lists functions////////////
    $scope.addToFavs = function (userId, movieId) {
        mainService.addToFavs(userId, movieId);
    };
    $scope.addToSeen = function (userId, movieId) {
        mainService.addToSeen(userId, movieId);
    };
    $scope.addToSee = function (userId, movieId) {
        mainService.addToSee(userId, movieId);
    };
});
'use strict';

angular.module('goodSees').controller('seenCtrl', function ($scope, $state, mainService, tmdbService, userService) {

    userService.getUserId().then(function (response) {
        $scope.userId = response;
        return response;
    }).then(function (response) {
        $scope.getSeenMovies = function () {
            mainService.getSeenMovies(response).then(function (response) {
                $scope.seenMovies = response;
            });
        };
        $scope.getSeenMovies();
    });

    $scope.addToFavs = function (userId, movieId) {
        mainService.addToFavs(userId, movieId);
    };
    $scope.deleteSeen = function (userId, movieId) {
        mainService.deleteSeen(userId, movieId);
        $scope.getSeenMovies();
    };
});
'use strict';

angular.module('goodSees').controller('toSeeCtrl', function ($scope, $state, mainService, tmdbService, userService) {

    userService.getUserId().then(function (response) {
        $scope.userId = response;
        return response;
    }).then(function (response) {
        $scope.getWantToSee = function () {
            mainService.getWantToSee(response).then(function (response) {
                $scope.toSeeMovies = response;
            });
        };
        $scope.getWantToSee();
    });

    $scope.deleteToSee = function (userId, movieId) {
        mainService.deleteToSee(userId, movieId);
        $scope.getWantToSee();
    };
    $scope.addToSeen = function (userId, movieId) {
        mainService.addToSeen(userId, movieId);
        $scope.deleteToSee(userId, movieId);
    };
});
'use strict';

angular.module('goodSees').controller('wrapperCtrl', function ($scope, mainService) {

    $scope.test = mainService.test;
});
'use strict';

angular.module('goodSees').directive('headerDir', function () {
    return {
        restrict: 'AE',
        templateUrl: './views/directives/headerDir.html',
        controller: 'headerCtrl'
    };
});
'use strict';

angular.module('goodSees').directive('profileControls', function () {
  return {
    restrict: 'AE',
    link: function link(scope, element, attributes) {
      $(document).ready(function () {
        $('#profileTab').click(function () {
          $('#profileTab').addClass('afterClick');
          $('#seenTab').removeClass('afterClick');
          $('#friendsTab').removeClass('afterClick');
          $('#wantToSeeTab').removeClass('afterClick');
          $('#favoritesTab').removeClass('afterClick');
        });
        $('#seenTab').click(function () {
          $('#profileTab').removeClass('afterClick');
          $('#profileTab').addClass('beforeClick');
          $('#seenTab').addClass('afterClick');
          $('#friendsTab').removeClass('afterClick');
          $('#wantToSeeTab').removeClass('afterClick');
          $('#favoritesTab').removeClass('afterClick');
        });
        $("#friendsTab").click(function () {
          $('#profileTab').removeClass('afterClick');
          $('#profileTab').addClass('beforeClick');
          $('#seenTab').removeClass('afterClick');
          $('#friendsTab').addClass('afterClick');
          $('#wantToSeeTab').removeClass('afterClick');
          $('#favoritesTab').removeClass('afterClick');
        });
        $('#wantToSeeTab').click(function () {
          $('#profileTab').removeClass('afterClick');
          $('#seenTab').removeClass('afterClick');
          $('#friendsTab').removeClass('afterClick');
          $('#wantToSeeTab').addClass('afterClick');
          $('#favoritesTab').removeClass('afterClick');
        });
        $('#favoritesTab').click(function () {
          $('#profileTab').removeClass('afterClick');
          $('#seenTab').removeClass('afterClick');
          $('#friendsTab').removeClass('afterClick');
          $('#wantToSeeTab').removeClass('afterClick');
          $('#favoritesTab').addClass('afterClick');
        });
      });
    }
  };
});
'use strict';

angular.module('goodSees').directive('profileLinksDir', function () {
    return {
        restrict: 'AE',
        templateUrl: './views/directives/profileLinksDir.html',
        controller: 'mainCtrl'
    };
});
'use strict';

angular.module('goodSees').directive('searchDir', function () {
    return {
        restrict: 'AE',
        templateUrl: './views/directives/searchDir.html',
        controller: 'mainCtrl'
    };
});
'use strict';

angular.module('goodSees').service('mainService', function ($http) {

    var baseUrl = "https://image.tmdb.org/t/p/w300_and_h450_bestv2";

    this.test = 'Service is working';

    this.logout = function () {
        return $http({ method: 'GET', url: '/auth/logout' }).then(function (res) {
            return res.data;
        }).catch(function (err) {
            console.log(err);
        });
    };

    this.getUserData = function (id) {
        return $http.get('/getUser/' + id).then(function (response) {

            return response.data;
        });
    };

    this.getTopFriends = function (id) {
        return $http.get('/getFriends/' + id).then(function (response) {

            return response.data;
        });
    };

    this.getRecommendedMovies = function (id) {
        return $http.get('/getUserActivity/' + id).then(function (response) {
            var recommendedMovies = [];

            for (var i = 0; i < response.data.length; i++) {
                if (response.data[i].recommends) {
                    $http.get("/getMovieById/" + response.data[i].movie_id).then(function (response) {

                        recommendedMovies.push({
                            imageUrl: baseUrl + response.data.poster_path,
                            title: response.data.original_title
                        });
                    });
                }
            }
            return recommendedMovies;
        });
    };

    this.getSeenMovies = function (id) {
        return $http.get('/getUserActivity/' + id).then(function (response) {
            var seenMovies = [];

            for (var i = 0; i < response.data.length; i++) {
                if (response.data[i].seen) {
                    $http.get('/getMovieById/' + response.data[i].movie_id).then(function (response) {

                        seenMovies.push({
                            imageUrl: baseUrl + response.data.poster_path,
                            title: response.data.original_title,
                            id: response.data.id,
                            year: response.data.release_date
                        });
                    });
                }
            }

            return seenMovies;
        });
    };
    this.getWantToSee = function (id) {
        return $http.get('/getUserActivity/' + id).then(function (response) {
            var wantToSee = [];

            for (var i = 0; i < response.data.length; i++) {
                if (response.data[i].to_see) {
                    $http.get('/getMovieById/' + response.data[i].movie_id).then(function (response) {

                        wantToSee.push({
                            imageUrl: baseUrl + response.data.poster_path,
                            title: response.data.original_title,
                            id: response.data.id,
                            year: response.data.release_date
                        });
                    });
                }
            }

            return wantToSee;
        });
    };
    this.getFavMovies = function (id) {
        return $http.get('/getUserActivity/' + id).then(function (response) {
            var favMovies = [];

            for (var i = 0; i < response.data.length; i++) {
                if (response.data[i].fav) {
                    $http.get('/getMovieById/' + response.data[i].movie_id).then(function (response) {
                        // console.log(response.data)

                        favMovies.push({
                            imageUrl: baseUrl + response.data.poster_path,
                            title: response.data.original_title,
                            id: response.data.id,
                            year: response.data.release_date
                        });
                    });
                }
            }
            // console.log("favMovies:", favMovies);
            return favMovies;
        });
    };

    // this.getFriends = function(id){
    //     return $http.get('/getFriends/' + id)
    //     .then(function(response){
    //         console.log("friends", response);
    //         return response.data;
    //     })
    // }

    this.addToFavs = function (userId, movieId) {
        return $http.post('/postFav/' + userId + '/' + movieId);
    };
    this.addToSeen = function (userId, movieId) {
        return $http.post('/postSeen/' + userId + '/' + movieId);
    };
    this.addToSee = function (userId, movieId) {
        return $http.post('/postToSee/' + userId + '/' + movieId);
    };
    this.postRecommendation = function (userId, movieId) {
        return $http.post('/postRecommendation/' + userId + '/' + movieId);
    };
    this.thumbUp = function (userId, movieId) {
        return $http.post('/thumbUp/' + userId + '/' + movieId);
    };
    this.thumbSide = function (userId, movieId) {
        return $http.post('/thumbSide/' + userId + '/' + movieId);
    };
    this.thumbDown = function (userId, movieId) {
        return $http.post('/thumbDown/' + userId + '/' + movieId);
    };
    this.deleteSeen = function (userId, movieId) {
        return $http.delete('/deleteSeen/' + userId + '/' + movieId);
    };
    this.deleteFav = function (userId, movieId) {
        return $http.delete('/deleteFav/' + userId + '/' + movieId);
    };
    this.deleteToSee = function (userId, movieId) {
        return $http.delete('/deleteToSee/' + userId + '/' + movieId);
    };

    /*--------------------------------------------------------------------*
                              Feed Endpoints
        *--------------------------------------------------------------------*/

    this.getMovieForFeed = function (id, pageNum) {
        return $http.get('/getNewFeed/' + id + '/' + pageNum).then(function (response) {
            var moviesForFeed = [];
            var feedData = response.data;
            console.log(feedData);

            var a = feedData.map(function (obj) {
                $http.get('/getMovieById/' + obj.movie_id).then(function (response) {
                    obj.imageUrl = baseUrl + response.data.poster_path;
                    obj.title = response.data.original_title;
                    obj.overview = response.data.overview;

                    return obj;
                });
            });
            return feedData;

            // for (var i = 0; i < feedData.length; i++) {
            //     if (feedData[i].movie_id) {
            //         console.log(i)
            //         $http.get('/getMovieById/' + feedData[i].movie_id)
            //             .then(function (response) {
            //                     console.log('halasdas',feedData[i])
            //                     console.log('this is here' ,feedData)
            //                 feedData[i].imageUrl = baseUrl + response.data.poster_path;
            //                 feedData[i].title = response.data.original_title;
            //                 feedData[i].overview =  response.data.overview;

            //             })
            //     }
            // }

            // console.log("movies:", moviesForFeed)
        });
    };

    this.postRec = function (userId, movieId) {
        return $http.post('/postRecommendation/' + userId + '/' + movieId);
    };
    this.postReview = function (movieId, commentTitle, comment, userId) {
        return $http.post('/postReview/' + userId + '/' + movieId + '/' + commentTitle + '/:' + comment);
    };
});
'use strict';

angular.module('goodSees').service('tmdbService', function ($http) {
    var baseUrl = 'https://api.themoviedb.org/3/';
    var discoverPageNum = 1;

    this.searchMovieByTitle = function (movieTitle, page) {
        return $http.get('/searchMovieByTitle/' + movieTitle + '/' + page);
    };

    this.searchMovieByCastMember = function (castMember) {

        return $http.get('/searchMovieByCastMember/' + castMember);
    };

    this.getMoviesByGenre = function (id, page) {
        return $http.get('/getMoviesByGenre/' + id + '/' + page);
    };

    this.getMovieById = function (movieId) {
        return $http.get('/getMovieById/' + movieId);
    };
});
'use strict';

angular.module('goodSees').service('userService', function ($http) {

  var userId = null;

  this.userId = userId;
  this.getUserId = getUserId;

  function getUserId() {
    return $http.get('/auth/me').then(function (res) {

      // console.log('I ran',res.status, res.data, res)

      // if(res.status !== 200) {$state.go('login')}
      userId = res.data;
      return res.data;
    });
  }

  /*--------------------------------------------------------------------*
                            Friends page Endpoints
       *--------------------------------------------------------------------*/

  this.getFriends = function (id) {
    return $http.get('/getFriends/' + id);
  };
});
// make sure that you inject userService, and then wrap all call relating to the user id in this function >>
// userService.getUserId().then(function (userId) { 
//   $http.get('/whatever/' + userId + '/' + 'whatever').then(res => {
//     do stuff here
//   })
// })