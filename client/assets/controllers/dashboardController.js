//  *****************************************  //
//  *                                       *  //
//  *           DASHBOARD CONTROLLER        *  //
//  *                                       *  //
//  *****************************************  //

app.controller('dashboardController', ['$scope', '$location', 'usersFactory', 'questionsFactory', function($scope, $location, usersFactory, questionsFactory) {

// GET CURRENT USER =======================================================================
    var getCurrentUser = function(){
        usersFactory.getCurrentUser(function(user){
            $scope.current_user = user;
        })
    };
    getCurrentUser();

// GET ALL QUESTIONS =======================================================================
    var getAllQuestions = function(){
        questionsFactory.getAllQuestions(function(questions){
            $scope.allQuestions = questions;
        })
    }
    getAllQuestions();

// LOG OUT A USER ==========================================================================
    $scope.logout = function() {
        usersFactory.logout(function(){
            $location.url('/login')
        });
    };
    
}]);
