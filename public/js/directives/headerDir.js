angular.module('goodSees').directive('headerDir', function(){
    return {
        restrict: 'AE',
        templateUrl: './views/directives/headerDir.html',
        controller: 'headerCtrl'
    }
})