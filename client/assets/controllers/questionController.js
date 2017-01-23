//  *****************************************  //
//  *                                       *  //
//  *           Q CONTROLLER                *  //
//  *                                       *  //
//  *****************************************  //

app.controller('questionController', ['$scope', '$location', 'usersFactory', 'questionsFactory', function($scope, $location, usersFactory, questionsFactory) {

// GET CURRENT USER =======================================================================
    var getCurrentUser = function(){
        usersFactory.getCurrentUser(function(user){
            $scope.current_user = user;
        })
    };
    getCurrentUser();

// CREATE NEW Q =====================================================================
    $scope.new_question = function(){
        questionsFactory.new_question($scope.newQuestion, function(returnDataFromFactory){
            if(returnDataFromFactory.hasOwnProperty('errors')){
                $scope.newQuestionErrors = returnDataFromFactory.errors;
            } else {
                $scope.newQuestion = {};
                $location.url('/dashboard')
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
