//  *****************************************  //
//  *                                       *  //
//  *           PROFILE CONTROLLER          *  //
//  *                                       *  //
//  *****************************************  //

app.controller('profileController', ['$scope', '$location', '$routeParams', 'usersFactory', 'questionsFactory', function($scope, $location, $routeParams, usersFactory, questionsFactory) {

// GET CURRENT USER =========================================================================
    var getCurrentUser = function(){
        usersFactory.getCurrentUser(function(user){
            $scope.current_user = user;
        })
    };
    getCurrentUser();

// GET CURRENT Q & A's =========================================================================
    var getUserQA = function(){
        usersFactory.getUserQA($routeParams.id, function(userQA){
            $scope.userQ= userQA.questions;
            $scope.userA= userQA.answers;
        })
    };
    getUserQA();

// LOG OUT A USER ==========================================================================
    $scope.logout = function() {
        usersFactory.logout(function(){
            $location.url('/login')
        });
    };

}]);
