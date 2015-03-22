/**
 * Created by deepak
 */
var router_v1 = require("express").Router();
var middleware = require("../middleware.js");
var controller = require("./controller");

// Router for version one
router_v1.get('/',middleware.checkAuthorization, function(req,res){
    return controller.getComments(req, res);
});

router_v1.post('/',middleware.checkAuthorization, function(req, res){
    return controller.addComment(req,res);
});

module.exports = {
    v1 : router_v1
};