//  *****************************************   //
//  *                                       *   //
//  *           USERS FACTORY               *   //
//  *                                       *   //
//  *****************************************   //

// console.log('Client>Assets>Controllers>usersFactory.js is running!!');

app.factory('usersFactory', ['$http', '$routeParams', function($http, $routeParams) {
    var factory = {};

// REGISTER METHOD TO SERVER ====================================================================
    factory.register = function(userRegistrationObjectFromForm, callback){
        // console.log("***************** Got to CLIENT usersFactory.js FACTORY.REGISTER");
        // console.log(userRegistrationObjectFromForm);
        $http.post('/register', userRegistrationObjectFromForm).then(function(returnedDataFromServer){
            // console.log("Response from server is: ", returnedDataFromServer.data);
            if(typeof(callback) == 'function'){
                callback(returnedDataFromServer.data);
            }
        })
    };

// LOG IN METHOD TO SERVER =======================================================================
    factory.login = function(userLoginObjectFromForm, callback){
        // console.log("***************** Got to CLIENT usersFactory.js FACTORY.LOGIN");
        $http.post('/login', userLoginObjectFromForm).then(function(returnedDataFromServer){
            // console.log("Response from server is: ", returnedDataFromServer.data);
            if(typeof(callback) == 'function'){
                callback(returnedDataFromServer.data);
            }
        })
    };

// LOG OUT CURRENT USER METHOD TO SERVER =============================================================
    factory.logout = function(callback){
        // console.log("***************** Got to CLIENT usersFactory.js FACTORY.LOUGOUT");
        $http.post('/logout').then(function(returnedDataFromServer){
            // console.log("USER IS LOGGED OUT");
            if(typeof(callback) == 'function'){
                callback();
            }
        });
    };

// GET CURRENT USER METHOD TO SERVER =============================================================
    factory.getCurrentUser = function(callback){
        // console.log("**** Got to CLIENT usersFactory.js FACTORY.GET CURRENT USER");
        $http.get('/user').then(function(returnedDataFromServer){
            // console.log("**** Response from server is: ", returnedDataFromServer.data);
            if(typeof(callback) == 'function'){
                callback(returnedDataFromServer.data );
            }
        });
    };


// GET ALL USERS METHOD TO SERVER
    factory.get_all_users = function(callback){
        // console.log("***************** Got to CLIENT bookmarkFactory.js FACTORY.SESSION GET ALL USERS");
        $http.get('/user/show_all').then(function(returnedDataFromServer){
            // console.log("Response from server is: ", returnedDataFromServer.data);
            if(typeof(callback) == 'function'){
                callback(returnedDataFromServer.data);
            }
        })
    };

// GET PROFILE USER METHOD TO SERVER =============================================================
    factory.getProfileUser = function(message_id,callback){
        // console.log("***************** Got to CLIENT usersFactory.js FACTORY.GET PROFILE USER");
        $http.get('/profile/'+message_id).then(function(returnedDataFromServer){
            console.log("Response from server is: ", returnedDataFromServer.data);
            if(typeof(callback) == 'function'){
                callback(returnedDataFromServer.data );
            }
        });
    };

    return factory;

}]);
