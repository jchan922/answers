app.controller('answerController', ['$scope', '$location', '$routeParams', 'usersFactory', 'questionsFactory', function($scope, $location, $routeParams, usersFactory, questionsFactory) {

// TEST FOR ANGULAR =========================================================================
    $scope.test = "This Angular Thing Working?";

// GET QUESTION_ID =======================================================================
    var getCurrentQuestion = function(){
    console.log($routeParams.id);
    questionsFactory.getCurrentQuestion($routeParams.id, function(question){
        $scope.question = question
        })
    };
    getCurrentQuestion();

// CREATE NEW ANSWER =====================================================================
    $scope.new_answer = function(){
        console.log("***************** Got to CLIENT dashboardController.js new_answer");
        questionsFactory.new_answer($scope.newAnswer, $routeParams.id, function(returnDataFromFactory){
            if(returnDataFromFactory.hasOwnProperty('errors')){
                $scope.newAnswerErrors = returnDataFromFactory.errors;
            } else {
                $scope.newAnswer = {};
                $location.url('/show/'+$routeParams.id)
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
