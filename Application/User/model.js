/**
 * Created by deepak
 */
var mongoose = require ("../../System/database").databaseConnection;

//Defining user schema
var userSchema = new mongoose.Schema({
    email : { type: String, trim: true },
    password : { type: String, trim: true }
});

module.exports = {
    // Instantiating user model
    User : mongoose.model('Users', userSchema)
};