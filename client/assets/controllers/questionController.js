app.controller('questionController', ['$scope', '$location', 'usersFactory', 'questionsFactory', function($scope, $location, usersFactory, questionsFactory) {

// TEST FOR ANGULAR =========================================================================
    $scope.test = "This Angular Thing Working?";

// GET CURRENT USER =======================================================================
    var getCurrentUser = function(){
        usersFactory.getCurrentUser(function(user){
            $scope.current_user = user;
            // console.log("**** Now useable as $scope variable", user);
        })
    };
    // getCurrentUser();

// CREATE NEW Q =====================================================================
    $scope.new_question = function(){
        console.log("***************** Got to CLIENT dashboardController.js new_question");
        questionsFactory.new_question($scope.newQuestion, function(returnDataFromFactory){
            if(returnDataFromFactory.hasOwnProperty('errors')){
                $scope.newQuestionErrors = returnDataFromFactory.errors;
                console.log($scope.newQuestionErrors);
            } else {
                $scope.newQuestion = {};
                $location.url('/dashboard')
            }
        })
    };

// LOG OUT A USER ==========================================================================
    $scope.logout = function() {
        // console.log("***************** Got to CLIENT dashboardController.js logoutUser");
        usersFactory.logout(function(){
            $location.url('/login')
        });
    };
}]);
