/**
 * Created by deepak
 */

var model = require("./model"),
    logger = require("../../System/log");

module.exports = {

    addComment: function(request, response){
        // Checking parameters
        request.checkBody('comment', 'Should not be empty').notEmpty();
        if(!request.validationErrors()){
            // Storing comment
            var newComment = new model.Comment();
            newComment.user_email = request.session.email;
            newComment.comment = request.body.comment;

            newComment.save(function(err) {
                if (err){
                    logger.error('Error in Saving comment: '+err);
                    response.error(500).end();
                }
                return response.status(201).end();
            });
        }
        else{
            // Parameters are not valid
            response.status(400).json({ error: 'invalid parameters' });
        }
    },


    getComments : function(request, response){
        // Sorting comments in reverse order
        model.Comment.find({}).sort('-date').exec(function(err,docs) {
            if(err){
                logger.error(err);
                response.error(500).end();
            }
            else{
                response.status(200).json(docs);
            }
        });

    }
};