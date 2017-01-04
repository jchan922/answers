
//  *********************************   //
//  *                               *   //
//  *          USER MODELS          *   //
//  *                               *   //
//  *********************************   //

console.log('Server>Models>user.js is running!!'.blue);
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// BUILD USER SCHEMA ====================================================================
var UserSchema = new mongoose.Schema({
    name: {type:String, required:true},
    email: {type:String, required:true},
    password: {type:String, required:true, minlength:8},
    questions: [{type:Schema.Types.ObjectId, ref:'Question'}],
    answers: [{type:Schema.Types.ObjectId, ref:'Answer'}],
}, {timestamps:true});

// register the schema as a model
var user = mongoose.model('User', UserSchema);
