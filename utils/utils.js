/** module for providing utilities
 * @author Denny Hörtz, Toni Kluth, Benjamin Lopez
 */

"use strict";

var message = undefined;

var utils = {


    checkErrorMessageLength: function (newMessage) {
        if (message === undefined) {
            message = newMessage;
        } else {
            message += ", " + newMessage;
        }
    },
    noError: function () {
        return message === undefined;
    },
    sendErrorMessage: function (code, res, description) {

        var errorMessage;

        if (description !== undefined) {
            errorMessage = description;
            if (message !== undefined) {
                errorMessage += message;
            }
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
    },
    getTimeStamp: function () {
        return Date.now();
    },
    getCopyOfObject: function (original) {
        return JSON.parse(JSON.stringify(original));
    },
    videoListFiltered: function (list, filters) {
        var tmpList = [];
        var count = -1;

        list.forEach(function (obj) {
            tmpList[count++] = this.videoFiltered(obj, filters);
        });

        return tmpList;
    },
    videoFiltered: function(video, filters){
        var newObject = {};
        Object.keys(video).forEach(function (key) {
            if (filters.indexOf(key) !== -1) {
                newObject[key] = video[key];
            }
        });
        return newObject;
    },
    videoListOffset: function (list, offset, limit) {
        var tmpList = [];

        if (limit === undefined || isNaN(parseInt(limit)) || limit < 0) {
            limit = 0;
        }

        if (offset === undefined || isNaN(parseInt(offset)) || offset < 0) {
            offset = 0;
        }

        if (list !== undefined) {

            for (var i = 0; i < list.length; i++) {

                if (tmpList.length < limit || limit == 0) {

                    if (offset > 0) {
                        if (i + 1 > offset) {
                            tmpList[tmpList.length] = list[i];
                        }
                    } else{
                        tmpList[tmpList.length] = list[i];
                    }

                }

            }
        }

        return tmpList;
    },
    validOffset: function(offset, listSize){
      return this.regExPNumber(offset) && (parseInt(offset) > -1) && parseInt(offset) < listSize;
    },
    validLimit: function(limit){
        return this.regExPNumber(limit) && (parseInt(limit) > 0);
    },
    regExPNumber: function(number){
        var reg = new RegExp("^[0-9]*$");
        return reg.test(number);
    }

};

module.exports = utils; // let require use the store object
