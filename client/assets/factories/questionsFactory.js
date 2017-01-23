//  *****************************************   //
//  *                                       *   //
//  *           QUESTIONS FACTORY           *   //
//  *                                       *   //
//  *****************************************   //

app.factory('questionsFactory', ['$http', '$routeParams', function($http, $routeParams) {
    var factory = {};

// CREATE NEW Q METHOD TO SERVER ====================================================================
    factory.new_question= function(questionObjectFromForm, callback){
        $http.post('/question/create', questionObjectFromForm).then(function(returnedDataFromServer){
            if(typeof(callback) == 'function'){
                callback(returnedDataFromServer.data);
            }
        })
    },

// CREATE NEW ANSWER METHOD TO SERVER ====================================================================
    factory.new_answer= function(answerObjectFromForm, message_id, callback){
        $http.post('/answer/create/'+message_id, answerObjectFromForm).then(function(returnedDataFromServer){
            if(typeof(callback) == 'function'){
                callback(returnedDataFromServer.data);
            }
        })
    },

// INCREASE ANSWER LIKES METHOD TO SERVER ====================================================================
    factory.increaseLikes= function(answer_id, callback){
        $http.post('/answer/likes/'+answer_id).then(function(returnedDataFromServer){
            if(typeof(callback) == 'function'){
                callback(returnedDataFromServer.data);
            }
        })
    },

// GET ALL QUESTIONS METHOD TO SERVER ====================================================================
    factory.getAllQuestions= function(callback){
        $http.get('/show/all').then(function(returnedDataFromServer){
            if(typeof(callback) == 'function'){
                callback(returnedDataFromServer.data);
            }
        })
    },

// GET CURRENT Q METHOD TO SERVER ====================================================================
    factory.getCurrentQuestion= function(question_id, callback){
        $http.get('/show/'+question_id).then(function(returnedDataFromServer){
            if(typeof(callback) == 'function'){
                callback(returnedDataFromServer.data);
            }
        })
    }

    return factory;

}]);
