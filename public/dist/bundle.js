'use strict';

angular.module('goodSees', ['ui.router']).config(function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/');
    $stateProvider.state('login', {
        url: '/',
        templateUrl: './views/login.html',
        controller: 'loginCtrl'
    }).state('feed', {
        url: '/feed',
        templateUrl: './views/feed.html',
        controller: 'feedCtrl'
    }).state('user-profile', {
        url: '/profile/:id',
        templateUrl: './views/profile.html',
        controller: 'profileCtrl'
    }).state('movie-profile', {
        url: '/movie/:id',
        templateUrl: './views/movie.html',
        controller: 'movieCtrl'
    }).state('search-results', {
        url: '/results',
        templateUrl: './views/searchResults.html',
        controller: 'searchCtrl'
    });
});
'use strict';

angular.module('goodSees').controller('feedCtrl', function ($scope, mainService) {

    $scope.test = mainService.test;
});
'use strict';

angular.module('goodSees').controller('loginCtrl', function ($scope, mainService) {

    $scope.test = mainService.test;
});
'use strict';

angular.module('goodSees').controller('movieCtrl', function ($scope, mainService) {

    $scope.test = mainService.test;
});
'use strict';

angular.module('goodSees').controller('profileCtrl', function ($scope, mainService) {

    $scope.test = mainService.test;
});
'use strict';

angular.module('goodSees').controller('searchCtrl', function ($scope, mainService) {

    $scope.test = mainService.test;
});
'use strict';

angular.module('goodSees').service('mainService', function ($http) {

    this.test = 'Service is working';
});
'use strict';

angular.module('goodSees').service('tmdbService', function ($http) {

    this.test = 'Service is working';
});