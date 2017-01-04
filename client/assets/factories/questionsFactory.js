//  *****************************************   //
//  *                                       *   //
//  *           QUESTIONS FACTORY           *   //
//  *                                       *   //
//  *****************************************   //

// console.log('Client>Assets>Controllers>usersFactory.js is running!!');

app.factory('questionsFactory', ['$http', '$routeParams', function($http, $routeParams) {
    var factory = {};

// CREATE NEW Q METHOD TO SERVER ====================================================================
    factory.new_question= function(questionObjectFromForm, callback){
        // console.log("***************** Got to CLIENT bookmarkFactory.js FACTORY.NEW BOOKMARK");
        $http.post('/question/create', questionObjectFromForm).then(function(returnedDataFromServer){
            // console.log("Response from server is: ", returnedDataFromServer.data);
            if(typeof(callback) == 'function'){
                callback(returnedDataFromServer.data);
            }
        })
    },

// CREATE NEW ANSWER METHOD TO SERVER ====================================================================
    factory.new_answer= function(answerObjectFromForm, message_id, callback){
        // console.log("***************** Got to CLIENT bookmarkFactory.js FACTORY.NEW BOOKMARK");
        $http.post('/answer/create/'+message_id, answerObjectFromForm).then(function(returnedDataFromServer){
            console.log("Response from server is: ", returnedDataFromServer.data);
            if(typeof(callback) == 'function'){
                callback(returnedDataFromServer.data);
            }
        })
    },

// INCREASE ANSWER LIKES METHOD TO SERVER ====================================================================
    factory.increaseLikes= function(answer_id, callback){
        // console.log("***************** Got to CLIENT bookmarkFactory.js FACTORY.NEW BOOKMARK");
        $http.post('/answer/likes/'+answer_id).then(function(returnedDataFromServer){
            // console.log("Response from server is: ", returnedDataFromServer);
            if(typeof(callback) == 'function'){
                callback(returnedDataFromServer.data);
            }
        })
    },

// GET ALL QUESTIONS METHOD TO SERVER ====================================================================
    factory.getAllQuestions= function(callback){
        // console.log("***************** Got to CLIENT bookmarkFactory.js FACTORY.ALL QUESTIONS");
        $http.get('/show/all').then(function(returnedDataFromServer){
            // console.log("Response from server is: ", returnedDataFromServer.data);
            if(typeof(callback) == 'function'){
                callback(returnedDataFromServer.data);
            }
        })
    },

// GET CURRENT Q METHOD TO SERVER ====================================================================
    factory.getCurrentQuestion= function(question_id, callback){
        // console.log(question_id);
        // console.log("***************** Got to CLIENT bookmarkFactory.js FACTORY.CURRENT QUESTIONS");
        $http.get('/show/'+question_id).then(function(returnedDataFromServer){
            // console.log("Response from server is: ", returnedDataFromServer.data);
            if(typeof(callback) == 'function'){
                callback(returnedDataFromServer.data);
            }
        })
    }

    return factory;

}]);
