// console.log('Server>Controllers>bookmarks.js is running!!'.blue);

var mongoose = require("mongoose");
var User = mongoose.model("User");
var Question = mongoose.model("Question");
var Answer = mongoose.model("Answer");

module.exports = {

// CREATE Q  ==========================================================================================
    create: function(req,res){
        // console.log("**** Got to SERVER bookmarks.js CREATE ".green);
        // console.log("**** Data to create".yellow, req.body, req.session.user);
        var question = req.body.question
        if(question.length<10){
            var errors = {errors:{
                general:{message:"Question should be at least 10 characters"}
                }
            }
            console.log(errors);
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
                            console.log("**** There were validation errors in creator:".red, err);
                        } else{
                            res.sendStatus(200);
                        }
                    })
                })
            })
            // console.log(" Question created and user(s) saved ****".green);
        }
    },


// CREATE A  ==========================================================================================
    answer_create: function(req,res){
        // console.log("**** Got to SERVER bookmarks.js CREATE ".green);
        // console.log("**** Data to create".yellow, req.body, req.session.user);
        // console.log("Current Message ID:", req.params._id);
        var answer = req.body.answer
        if(answer.length<5){
            var errors = {errors:{
                general:{message:"Answer should be at least 5 characters"}
                }
            }
            res.json(errors)
        } else {
            var newAnswer = new Answer(req.body);
            newAnswer._creator = req.session.user._id;
            newAnswer._message = req.params._id;
            newAnswer.save(function(err){
                if (err) {
                    res.json(err);
                } else {
                    console.log("***************** Answer added to DB".green);
                    Question.findOne({_id: req.params._id}).exec(function(err, question){
                        question.answers.push(newAnswer._id);
                        question.save(function(err,results){
                            if (err) {
                                res.json(err);
                            } else {
                                console.log("***************** Question, Answer saved to DB".green);
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
        console.log("**** Got to SERVER bookmarks.js CREATE ".green);
        console.log("Current Message ID:".green, req.params._id);
        Answer.findOne({_id:req.params._id}).exec(function(err,answer){
            answer.likes += 1;
            console.log(answer);
            answer.save(function(err){
                if(err){
                    res.json(err);
                    console.log("**** There were validation errors in creator:".red, err);
                } else {
                    res.sendStatus(200);
                    console.log(" Question created and user(s) saved ****".green);
                }
            })
        })
    },

// SHOW ALL Q  ==========================================================================================
    show_all: function(req,res){
        // console.log("**** Got to SERVER questions.js SHOW ".yellow);
        Question.find().exec(function(err,questions){
            if(err){
                res.json(err);
            } else {
                res.json(questions)
                // console.log("Going back to the front-end. ****".yellow);
            }
        })
    },

// SHOW Q  ==========================================================================================
    show_current: function(req,res){
        // console.log("**** Got to SERVER questions.js SHOW PROFILE ".green);
        // console.log("**** Profile user ID is:".yellow, req.params._id);
        // User.findOne({_id:req.params.id}).populate({path:'bookmarks',model:'Bookmark', populate:{path:'_creator',model:'User'}}).exec(function(err,findings){
        Question.findOne({_id:req.params._id}).populate({path:'answers',model: 'Answer', populate:{path:'_creator',model:'User'}}).exec(function(err,question){
            if(err){
                res.json(err);
            } else {
                res.json(question)
                // console.log("Going back to the front-end. ****".yellow);
            }
        })
    },

}
