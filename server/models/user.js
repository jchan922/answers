
//  *********************************   //
//  *                               *   //
//  *          USER MODELS          *   //
//  *                               *   //
//  *********************************   //

var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
const saltRounds = 10;
var Schema = mongoose.Schema;

// BUILD USER SCHEMA ====================================================================
var UserSchema = new mongoose.Schema({
    name: {type:String, required:true},
    email: {type:String, required:true},
    password: {type:String, required:true, minlength:8},
    questions: [{type:Schema.Types.ObjectId, ref:'Question'}],
    answers: [{type:Schema.Types.ObjectId, ref:'Answer'}],
}, {timestamps:true});


// BCYRPT METHODS ====================================================================
UserSchema.methods.generateHash = function(password) {
    var salt = bcrypt.genSaltSync(saltRounds);
    var hash = bcrypt.hashSync(password, salt);
    return hash;
}

UserSchema.methods.validatePassword = function(password) {
    var test = bcrypt.compareSync(password, this.password);
    return test
}

// register the schema as a model
var user = mongoose.model('User', UserSchema);
