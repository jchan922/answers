//  *****************************************  //
//  *                                       *  //
//  *           SHOW CONTROLLER             *  //
//  *                                       *  //
//  *****************************************  //

app.controller('showController', ['$scope', '$location', '$routeParams', 'usersFactory', 'questionsFactory', function($scope, $location, $routeParams, usersFactory, questionsFactory) {

// TEST FOR ANGULAR =========================================================================
    $scope.test = "This Angular Thing Working?";

// GET CURRENT USER =======================================================================
    var getCurrentUser = function(){
        usersFactory.getCurrentUser(function(user){
            $scope.current_user = user;
            // console.log("**** Now useable as $scope variable", user);
        })
    };
    getCurrentUser();

// GET QUESTION_ID =======================================================================
    var getCurrentQuestion = function(){
    questionsFactory.getCurrentQuestion($routeParams.id, function(question){
        $scope.question = question
        $scope.answers = question.answers
        })
    };
    getCurrentQuestion();

// INCREASE LIKES ==========================================================================
    $scope.increaseLikes = function(answer_id) {
        questionsFactory.increaseLikes(answer_id, function(returnDataFromFactory){
            if(returnDataFromFactory.hasOwnProperty('errors')){
                console.log($scope.newQuestionErrors);
            } else {
                getCurrentQuestion();
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
