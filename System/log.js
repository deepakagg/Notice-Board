/**
 * Created by deepak on 27/09/14.
 */

var winston = require('winston');
var logger = new winston.Logger({
    transports: [
        new winston.transports.Console({
            level: 'debug',
            handleExceptions: true,
            json: false,
            colorize: true,
            timestamp: true,
            prettyPrint: true
        })
    ],
    exitOnError: false
});

module.exports = logger;