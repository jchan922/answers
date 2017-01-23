
//  *************************************   //
//  *                                   *   //
//  *          BOOKMARK MODELS          *   //
//  *                                   *   //
//  *************************************   //

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// BUILD USER SCHEMA ====================================================================
var QuestionSchema = new mongoose.Schema({
    question: {type:String, required:true, minlength: 10},
    description: {type:String},
    _creator: {type:Schema.Types.ObjectId, ref:'Creator'},
    answers: [{type: Schema.Types.ObjectId, ref: 'Answer'}]
}, {timestamps:true});

// register the schema as a model
var question = mongoose.model('Question', QuestionSchema);
