const jwt = require('jwt-simple');
const User = require('../models/user.js');
const config = require('../config/keys.js');

function tokenForUser(user) {
        const timestamp = new Date().getTime();
        return jwt.encode({
                sub: user.id,
                iat: timestamp
        }, config.secret)
}

exports.signin = function(req, res, next) {
     
        res.send({token: tokenForUser(req.user)})

}

exports.signup = function (req, res, next) {
        const email = req.body.email
        const password = req.body.password

        if(!email || !password) {
                return res.status(422).send({
                        error: `You must provide email and password`
                })
        }

        //check if email already exist
        User.findOne({email: email}, function(err, existingUser) {
                if(err) {
                        return next(err);
                }

                // Email already exist, return an error
                if(existingUser) {
                        return res.status(422).send({
                                error: `Email is in Use`
                        })
                }

                //Email doesn't exists, Create and save in user record
                const user = new User({
                        email: email,
                        password: password
                })
                
                user.save(function(err) {
                        if(err) {
                                return (
                                        next(err)
                                )
                        }
                        res.json({
                                token: tokenForUser(user)
                        })
                })

        })
}