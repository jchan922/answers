console.log('Server>Controllers>users.js is running!!'.blue);

var mongoose = require("mongoose");
var User = mongoose.model("User")

module.exports = {

// REGISTER USER INTO BATABASE ===============================================================================
    register: function(req,res){
        // console.log("***************** Got to SERVER users.js CREATE ".green);
        // console.log("***************** DATA TO CREATE".green, req.body);
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
                registerUser.save(function(err, user){
                    if (err) {
                        // console.log("There were validation errors:", err);
                        res.json(err);
                    } else {
                        req.session.user = {
                            _id: user._id,
                            name: user.name,
                            email: user.email,
                        }
                        // console.log("***************** Creating a user session. Going back to the front-end".green);
                        res.sendStatus(200);
                    }
                });
            }
        })
    },

// LOGIN CHECK FROM DATABASE TO FRONT END ====================================================================
    login: function(req,res){
        // console.log("***************** Got to SERVER users.js LOGIN ".green);
        // console.log("***************** DATA TO FIND".green, req.body);
        var errors = {errors:{
            general:{message:"Invalid login information"}
            }
        }
        User.findOne({email:req.body.email}).exec(function(err, user){
            if(!req.body.email||!req.body.password||!user){
                res.json(errors);
            }else{
                if(user.password != req.body.password){
                    res.json(errors);
                }else{
                    req.session.user = {
                        _id: user._id,
                        name: user.name,
                        email: user.email,
                    }
                    // console.log("***************** Found a match. Creating a user session. Going back to the front-end.".green);
                    // console.log(req.session.user);
                    res.send(user);
                }
            }
        })
    },

// LOGOUT FROM DATABASE TO FRONT END ====================================================================
    logout: function(req,res){
        // console.log("***************** Got to SERVER users.js LOGOUT ".red);
        req.session.destroy(function(err){
            if(err){
                res.sendStatus(401);
            } else {
                console.log("***************** LOGGED OUT! Session is now empty:".red, req.session);
                res.sendStatus(200);
            }
        })
    },

// GRAB SESSION USERS INFORMATION ===========================================================================
    show_user: function(req,res){
        // console.log("***************** Got to SERVER users.js DASHBOARD ".yellow);
        // console.log("***************** DATA TO FIND".yellow, req.session.user);
        User.findOne({_id:req.session.user._id}).populate('bookmarks').exec(function(err, user){
            if(err){
                res.sendStatus(401);
            } else {
                var session_user = {
                    _id: user._id,
                    name: user.name,
                    email: user.email,
                    bookmarks: user.bookmarks
                }
                // console.log("***************** Found a match. Gathering user info. Going back to the front-end.".yellow);
                // console.log("Session user:".green,session_user);
                // console.log("Going back to the front-end. *****************".yellow);
                res.json(session_user);
            }
        })
    },

// GRAB ALL USERS INFORMATION ===========================================================================
    show_all_users: function(req,res){
        // console.log("***************** Got to SERVER bookmarks.js SHOW ALL".green);
        User.find({"_id": { "$ne": req.session.user._id }}).exec(function(err,all_users){
            res.json(all_users);
        })
    },

// GRAB PROFILE USERS INFORMATION ===========================================================================
    profile_id: function(req,res){
        // console.log("***************** Got to SERVER users.js PROFILE ID ".yellow);
        // console.log("***************** DATA TO FIND".yellow, req.params._id);
        User.findOne({_id:req.params._id}).exec(function(err, user){
            if(err){
                res.sendStatus(401);
            } else {
                var session_user = {
                    _id: user._id,
                    name: user.name,
                    email: user.email,
                }
                // console.log("***************** Found a match. Gathering user info. Going back to the front-end.".yellow);
                // console.log(session_user);
                res.json(session_user);
            }
        })
    },



}
