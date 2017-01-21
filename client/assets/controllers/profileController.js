app.controller('profileController', ['$scope', '$location', '$routeParams', 'usersFactory', 'questionsFactory', function($scope, $location, $routeParams, usersFactory, questionsFactory) {

// TEST FOR ANGULAR =========================================================================
    // $scope.test = "This Angular Thing Working?";

// GET CURRENT USER =========================================================================
var getCurrentUser = function(){
    usersFactory.getCurrentUser(function(user){
        $scope.current_user = user;
    })
};
getCurrentUser();

var getUserQA = function(){
    usersFactory.getUserQA($routeParams.id, function(userQA){
        $scope.userQ= userQA.questions;
        console.log($scope.userQ);
        $scope.userA= userQA.answers;
    })
};
getUserQA();

// LOG OUT A USER ==========================================================================
    $scope.logout = function() {
        // console.log("***************** Got to CLIENT dashboardController.js logoutUser");
        usersFactory.logout(function(){
            $location.url('/login')
        });
    };
}]);
