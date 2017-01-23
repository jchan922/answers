//  *****************************************   //
//  *                                       *   //
//  *           USERS FACTORY               *   //
//  *                                       *   //
//  *****************************************   //

app.factory('usersFactory', ['$http', '$routeParams', function($http, $routeParams) {
    var factory = {};

// REGISTER METHOD TO SERVER ====================================================================
    factory.register = function(userRegistrationObjectFromForm, callback){
        $http.post('/register', userRegistrationObjectFromForm).then(function(returnedDataFromServer){
            if(typeof(callback) == 'function'){
                callback(returnedDataFromServer.data);
            }
        })
    };

// LOG IN METHOD TO SERVER =======================================================================
    factory.login = function(userLoginObjectFromForm, callback){
        $http.post('/login', userLoginObjectFromForm).then(function(returnedDataFromServer){
            if(typeof(callback) == 'function'){
                callback(returnedDataFromServer.data);
            }
        })
    };

// LOG OUT CURRENT USER METHOD TO SERVER =============================================================
    factory.logout = function(callback){
        $http.post('/logout').then(function(returnedDataFromServer){
            if(typeof(callback) == 'function'){
                callback();
            }
        });
    };

// GET CURRENT USER METHOD TO SERVER =============================================================
    factory.getCurrentUser = function(callback){
        $http.get('/user').then(function(returnedDataFromServer){
            if(typeof(callback) == 'function'){
                callback(returnedDataFromServer.data );
            }
        });
    };

// GET PROFILE USERS Q AND A's =============================================================
    factory.getUserQA = function(profile_id, callback){
        $http.get('/profile/'+profile_id).then(function(returnedDataFromServer){
            if(typeof(callback) == 'function'){
                callback(returnedDataFromServer.data );
            }
        });
    }


// GET ALL USERS METHOD TO SERVER =============================================================
    factory.get_all_users = function(callback){
        $http.get('/user/show_all').then(function(returnedDataFromServer){
            if(typeof(callback) == 'function'){
                callback(returnedDataFromServer.data);
            }
        })
    };

// GET PROFILE USER METHOD TO SERVER =============================================================
    factory.getProfileUser = function(message_id, callback){
        $http.get('/profile/'+message_id).then(function(returnedDataFromServer){
            if(typeof(callback) == 'function'){
                callback(returnedDataFromServer.data );
            }
        });
    };

    return factory;

}]);
