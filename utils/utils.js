/** module for providing utilities
 * @author Denny Hörtz, Toni Kluth, Benjamin Lopez
 */

"use strict";

var message = undefined;

var utils = {


    checkErrorMessageLenght: function (newMessage) {
        if (message === undefined) {
            message = newMessage;
        } else {
            message += ", " + newMessage;
        }
    },
    noError: function(){
        return message === undefined;
    },
    sendErrorMessage: function (code, res, description) {

        var errorMessage;

        if (description !== undefined) {
            errorMessage = description + message;
        } else {
            errorMessage = message;
        }

        res.status(code).json(
            {
                error: {
                    message: errorMessage,
                    code: code
                }
            });

        message = undefined;
    }
};

module.exports = utils; // let require use the store object
