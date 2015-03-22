/**
 * Created by deepak
 */

var model = require("./model"),
    bcrypt = require('bcryptjs'),
    logger = require("../../System/log");

module.exports = {

    signUp: function(request, response){
        // Checking parameters
        request.checkBody('email', 'Invalid Email').notEmpty().isEmail();
        request.checkBody('password', 'Invalid Password').notEmpty().len(6, 20);
        if(!request.validationErrors()){
            // Checking if the user with corresponding email address exists or not
            model.User.findOne({'email': request.body.email}, function(err, user){
                if(err){
                    logger.error(err);
                    response.status(500).end();
                }
                else{
                    if(user){
                        //user with corresponding email already exists
                        response.status(403).json({ error: 'User with correpsonding email already exists' });
                    }
                    else{
                        bcrypt.genSalt(10, function(err, salt){
                            bcrypt.hash(request.body.password, salt, function(err, hash){
                                if(err){
                                    logger.error("Unable to generate hash for the password");
                                    logger.error('Error is ' + err);
                                    response.status(500).end();
                                }
                                else{
                                    // Saving user
                                    var newUser = new model.User();
                                    newUser.email = request.body.email;
                                    newUser.password = hash;

                                    newUser.save(function(err) {
                                        if (err){
                                            logger.error('Error in Saving user: '+err);
                                            response.error(500).end();
                                        }
                                        return response.status(201).end();
                                    });
                                }
                            });
                        });
                    }
                }
            });
        }
        else{
            // Parameters are not valid
            response.status(400).json({ error: 'invalid parameters' });
        }
    },


    login : function(request, response){
        request.checkBody('email', 'Invalid Email').notEmpty().isEmail();
        request.checkBody('password', 'Invalid Password').notEmpty().len(6, 20);
        if(!request.validationErrors()){
            // Checking if the user with corresponding email address exists or not
            model.User.findOne({'email': request.body.email}, function(err, user){
                if(err){
                    logger.error(err);
                    response.status(500).end();
                }
                else{
                    if(!user){
                        //Unable to find a user with corresponding email
                        response.status(403).end();
                    }
                    else{
                        bcrypt.compare(request.body.password, user.password, function(err, res){
                            if(err){
                                console.error(err.stack);
                                response.status(500).end();
                            }
                            else{
                                if(res == true){
                                    // Correct password
                                    request.session.loggedIn = true;
                                    request.session.emal = request.body.email;
                                    response.status(204).end();
                                }
                                else{
                                    // Incorrect password
                                    response.status(401).end();
                                }
                            }
                        });
                    }
                }
            });
        }
        else{
            // Parameters are not valid
            response.status(400).json({ error: 'invalid parameters' });
        }
    },

    getUserCurrentStatus: function(request, response){
        if(request.session.loggedIn === true){
            response.status(204).end();
        }
        else{
            response.status(401).end();
        }
    }

};