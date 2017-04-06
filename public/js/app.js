angular.module('goodSees', ['ui.router'])
    .config(function($stateProvider, $urlRouterProvider) {
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
                controller: 'mainCtrl'
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
    });
