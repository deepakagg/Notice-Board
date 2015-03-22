/**
 * Created by deepak on 22/03/15.
 */
var mongoose = require ("mongoose");
var config = require('config');

mongoose.connect(config.dbConfig.url);

module.exports = {
    databaseConnection : mongoose
};
