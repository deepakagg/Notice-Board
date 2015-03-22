/**
 * Created by deepak
 */


var router_v1 = require("express").Router();
var controller = require("./controller");

// Router for version one
router_v1.get('/', function(req,res){
    return controller.getUserCurrentStatus(req, res);
});

router_v1.post('/login', function(req, res){
    return controller.login(req,res);
});

router_v1.post('/signup', function(req, res){
    return controller.signUp(req,res);
});

module.exports = {
    v1 : router_v1
};