//  *********************************   //
//  *                               *   //
//  *         SERVER ROUTES         *   //
//  *                               *   //
//  *********************************   //

console.log('Server>Config>routes.js is running!!'.blue);

var users = require('../controllers/users.js');
var questions = require('../controllers/questions.js');
// var products = require('../controllers/products.js');
// var orders = require('../controllers/orders.js');

module.exports = function(app) {

    app.post('/register', users.register);
    app.post('/login', users.login);

    app.use(userAuth);
    app.post('/logout', users.logout);
    app.get('/user', users.show_user);
    app.get('/user/show_all', users.show_all_users);
    app.get('/profile/:_id', users.userQA);
    app.post('/question/create', questions.create);
    app.post('/answer/create/:_id', questions.answer_create);
    app.post('/answer/likes/:_id', questions.answer_likes);
    app.get('/show/all', questions.show_all);
    app.get('/show/:_id', questions.show_current);
};

// ESTABLISHING MIDDLEWARE FUNCTION
function userAuth(req,res,next){
    if(req.session.user){
        // console.log(req.session.user);
        next();
    } else {
        res.sendStatus(401);
    }
}
