
//  *************************************   //
//  *                                   *   //
//  *          ANSWERS MODELS           *   //
//  *                                   *   //
//  *************************************   //

console.log('Server>Models>answer.js is running!!'.blue);
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// BUILD USER SCHEMA ====================================================================
var AnswerSchema = new mongoose.Schema({
    answer: {type:String, required:true, minlength: 5},
    details: {type:String},
    likes: {type:Number, default:0},
    _creator: {type:Schema.Types.ObjectId, ref:'Creator'},
    _message: {type:Schema.Types.ObjectId, ref:'Message'},
}, {timestamps:true});

// register the schema as a model
var answer = mongoose.model('Answer', AnswerSchema);
