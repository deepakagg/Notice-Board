/**
 * Created by deepak
 */
var mongoose = require ("../../System/database").databaseConnection;

//Defining comment schema
var commentSchema = new mongoose.Schema({
    comment : { type: String, trim: true },
    user_email : { type: String, trim: true },
    date : {type:Date, default: Date.now}
});

module.exports = {
    // Instantiating comment model
    Comment : mongoose.model('Comment', commentSchema)
};