/**
 * Created by deepak
 */

var log = require("../System/log");

module.exports = {
    /*
        Middleware for checking whether user is logged in or not
     */
    checkAuthorization: function(req, res, next){
        //Check if the user is logged in or not
        if (res.session && req.session.loggedIn != true) {
            res.status(401).end();
        }
        else{
            next();
        }
    }
};