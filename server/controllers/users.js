var mongoose = require("mongoose");
var User = mongoose.model("User")

module.exports = {

// REGISTER USER INTO BATABASE ===============================================================================
    register: function(req,res){
        User.findOne({email:req.body.email}).exec(function(err, user){
        if(user){
            var errors = {errors:{
                general:{message:"Email already exists."}
                }
            }
            res.json(errors);
        }
        else if(req.body.password != req.body.passwordConf){
            var errors = {errors:{
                general:{message:"Passwords must match."}
                }
            }
            res.json(errors);
            }else{
                var registerUser = new User(req.body);
                registerUser.password = registerUser.generateHash(registerUser.password);
                registerUser.save(function(err, user){
                    if (err) {
                        res.json(err);
                    } else {
                        req.session.user = {
                            _id: user._id,
                            name: user.name,
                            email: user.email,
                        }
                        res.sendStatus(200);
                    }
                });
            }
        })
    },

// LOGIN CHECK FROM DATABASE TO FRONT END ====================================================================
    login: function(req,res){
        var errors = {errors:{
            general:{message:"Invalid login information"}
            }
        }
        User.findOne({email:req.body.email}).exec(function(err, user){
            if(!req.body.email||!req.body.password||!user){
                res.json(errors);
            } else {
                if(!user.validatePassword(req.body.password)){
                    res.json(errors);
                }else{
                    req.session.user = {
                        _id: user._id,
                        name: user.name,
                        email: user.email,
                    }
                    res.send(user);
                }
            }
        })
    },

// LOGOUT FROM DATABASE TO FRONT END ====================================================================
    logout: function(req,res){
        req.session.destroy(function(err){
            if(err){
                res.sendStatus(401);
            } else {
                res.sendStatus(200);
            }
        })
    },

// GRAB SESSION USERS INFORMATION ===========================================================================
    show_user: function(req,res){
        User.findOne({_id:req.session.user._id}).populate('bookmarks').exec(function(err, user){
            if(err){
                res.sendStatus(401);
            } else {
                var session_user = {
                    _id: user._id,
                    name: user.name,
                    email: user.email,
                    createdAt: user.createdAt
                }
                res.json(session_user);
            }
        })
    },

// GRAB ALL USERS INFORMATION ===========================================================================
    show_all_users: function(req,res){
        User.find({"_id": { "$ne": req.session.user._id }}).exec(function(err,all_users){
            res.json(all_users);
        })
    },

// GRAB PROFILE USERS INFORMATION ===========================================================================
    userQA: function(req,res){
        User.findOne({_id:req.params._id}).populate('questions').populate('answers').exec(function(err,qa){
            if(err){
                res.json(err);
            } else {
                res.json(qa)
            }
        })
    },



}
