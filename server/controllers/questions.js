var mongoose = require("mongoose");
var User = mongoose.model("User");
var Question = mongoose.model("Question");
var Answer = mongoose.model("Answer");

module.exports = {

// CREATE Q  ==========================================================================================
    create: function(req,res){
        var question = req.body.question;
        if(question == undefined){
            var errors = {errors:{
                general:{message:"Question form can't be empty!"}
                }
            }
            res.json(errors);
        }
        else if(question.length < 10){
            var errors = {errors:{
                general:{message:"Question asked should be at least 10 characters"}
                }
            }
            res.json(errors)
        } else {
            var newQuestion = new Question(req.body);
            User.findOne({_id:req.session.user._id}).sort('-createdAt').exec(function(err,creator){
                newQuestion._creator = creator._id;
                newQuestion.save(function(err){
                    creator.questions.push(newQuestion);
                    creator.save(function(err){
                        if(err){
                            res.json(err);
                        } else{
                            res.sendStatus(200);
                        }
                    })
                })
            })
        }
    },


// CREATE A  ==========================================================================================
    answer_create: function(req,res){
        var answer = req.body.answer;
        if(answer == undefined){
            var errors = {errors:{
                general:{message:"Answer form can't be empty!"}
                }
            }
            res.json(errors);
        }
        else if(answer.length < 5){
            var errors = {errors:{
                general:{message:"Answer submitted should be at least 5 characters"}
                }
            }
            res.json(errors);
        } else {
            var newAnswer = new Answer(req.body);
            newAnswer._creator = req.session.user._id;
            newAnswer._message = req.params._id;
            newAnswer.save(function(err){
                if (err) {
                    res.json(err);
                } else {
                    Question.findOne({_id: req.params._id}).exec(function(err, question){
                        question.answers.push(newAnswer._id);
                        question.save(function(err,results){
                            if (err) {
                                res.json(err);
                            } else {
                                User.findOne({_id: req.session.user._id}).exec(function(err,user){
                                    user.answers.push(newAnswer._id);
                                    user.save(function(err,results){
                                        if(err){
                                            res.json(err);
                                        } else {
                                            res.sendStatus(200);
                                        }
                                    })
                                })
                            }
                        })
                    })
                }
            })
        }
    },

// INCREASE ANSWER LIKES ================================================================================
    answer_likes:  function(req,res){
        Answer.findOne({_id:req.params._id}).exec(function(err,answer){
            answer.likes += 1;
            answer.save(function(err){
                if(err){
                    res.json(err);
                } else {
                    res.sendStatus(200);
                }
            })
        })
    },

// SHOW ALL Q  ==========================================================================================
    show_all: function(req,res){
        Question.find().sort('createdAt').exec(function(err,questions){
            if(err){
                res.json(err);
            } else {
                var array = [];
                res.json(questions)
            }
        })
    },

// SHOW Q  ==========================================================================================
    show_current: function(req,res){
        Question.findOne({_id:req.params._id}).populate({path:'answers',model: 'Answer', populate:{path:'_creator',model:'User'}}).exec(function(err,question){
            if(err){
                res.json(err);
            } else {
                res.json(question)
            }
        })
    },

}
