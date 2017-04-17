angular.module('goodSees', ['ui.router'])
    .config(function ($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/login');
        $urlRouterProvider.when('/', '/feed');
        $stateProvider
            .state('login', {
                url: '/login',
                templateUrl: './views/login.html',
                controller: 'loginCtrl'
            })
            .state('main', {
                url: '/',
                templateUrl: './views/main.html',
                controller: 'mainCtrl',
                resolve: {
                    messages: function ($http, userService, $state) {
                        return $http.get(`/auth/me`).then(res => {
                            console.log('hoping for a 200...', res.status)
                            if (res.status !== 200) {
                                $state.go('login')
                            }
                        })
                    }
                }
            })
            .state('main.feed', {
                url: 'feed',
                templateUrl: './views/feed.html',
                controller: 'feedCtrl'
            })
            .state('main.user-profile', {
                url: 'profile/:id',
                templateUrl: './views/profile.html',
                controller: 'profileCtrl'
            })
            .state('main.movie-profile', {
                url: 'movie/:id',
                templateUrl: './views/movie.html',
                controller: 'movieCtrl'
            })
            .state('main.search-results', {
                url: 'results',
                templateUrl: './views/searchResults.html',
                controller: 'searchCtrl'
            })
            .state('main.categories', {
                url: 'categories/:id',
                templateUrl: './views/categories.html',
                controller: 'categoriesCtrl'
            })
            .state('main.friends', {
                url: 'friends/:id',
                templateUrl: './views/friends.html',
                controller: 'friendsCtrl'
            })
            .state('main.favorites', {
                url: 'favorites/:id',
                templateUrl: './views/favorites.html',
                controller: 'favoritesCtrl'
            })
            .state('main.seen', {
                url: 'seen/:id',
                templateUrl: './views/seen.html',
                controller: 'seenCtrl'
            })
            .state('main.toSee', {
                url: 'to-see/:id',
                templateUrl: './views/toSee.html',
                controller: 'toSeeCtrl'
            })
    })
    .filter('slice', function () {
        return function (arr, start, end) {
            return arr.slice(start, end);
        };
    });
