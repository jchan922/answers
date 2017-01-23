//  *****************************************  //
//  *                                       *  //
//  *           ANSWER CONTROLLER           *  //
//  *                                       *  //
//  *****************************************  //

app.controller('answerController', ['$scope', '$location', '$routeParams', 'usersFactory', 'questionsFactory', function($scope, $location, $routeParams, usersFactory, questionsFactory) {

// GET CURRENT USER =======================================================================
    var getCurrentUser = function(){
        usersFactory.getCurrentUser(function(user){
            $scope.current_user = user;
        })
    };

// GET QUESTION_ID =======================================================================
    var getCurrentQuestion = function(){
    questionsFactory.getCurrentQuestion($routeParams.id, function(question){
        $scope.question = question
        })
    };
    getCurrentQuestion();

// CREATE NEW ANSWER =====================================================================
    $scope.new_answer = function(){
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
        usersFactory.logout(function(){
            $location.url('/login')
        });
    };
    
}]);
