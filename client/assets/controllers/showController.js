//  *****************************************  //
//  *                                       *  //
//  *           SHOW CONTROLLER             *  //
//  *                                       *  //
//  *****************************************  //

app.controller('showController', ['$scope', '$location', '$routeParams', 'usersFactory', 'questionsFactory', function($scope, $location, $routeParams, usersFactory, questionsFactory) {

// GET CURRENT USER =======================================================================
    var getCurrentUser = function(){
        usersFactory.getCurrentUser(function(user){
            $scope.current_user = user;
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
            } else {
                getCurrentQuestion();
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
