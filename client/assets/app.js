//  *************************************   //
//  *                                   *   //
//  *     FRONT END PARTIAL ROUTES      *   //
//  *                                   *   //
//  *************************************   //

var app = angular.module('app', ['ngRoute']);

app.factory('loginInterceptor', ['$q','$location',function($q, $location){
    return{
        'responseError': function(rejection){
            if (rejection.status == 401){
                $location.url('/login');
            }
            return $q.reject(rejection);
        }
    }
}]);

app.config(function ($routeProvider, $httpProvider) {
    $httpProvider.interceptors.push('loginInterceptor');
    $routeProvider
        .when('/login',{
            templateUrl: 'partials/login.html'
        })
        .when('/dashboard',{
            templateUrl: 'partials/dashboard.html'
        })
        .when('/show/:id',{
            templateUrl: 'partials/show.html'
        })
        .when('/question',{
            templateUrl: 'partials/question.html'
        })
        .when('/answer/:id',{
            templateUrl: 'partials/answer.html'
        })
        .otherwise({
            redirectTo: '/login'
        });
});
