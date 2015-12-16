/** This module defines the routes for videos using the store.js as db memory
 *
 * @author Johannes Konert, Denny Hörtz, Toni Kluth, Benjamin Lopez
 * @licence CC BY-SA 4.0
 *
 * @module routes/videos
 * @type {Router}
 */

// remember: in modules you have 3 variables given by CommonJS
// 1.) require() function
// 2.) module.exports
// 3.) exports (which is module.exports)

// modules
var express = require('express');
var logger = require('debug')('me2u4:videos');
var store = require('../blackbox/store'); // TODO: remove store
var utils = require('../utils/utils');

// mongoose                                 TODO: added
var mongoose = require('mongoose');
var db = mongoose.connect('mongodb://localhost:27017/mul2');
var VideoModel = require('../models/videos');

// router
var videos = express.Router();

// if you like, you can use this for task 1.b:
var requiredKeys = {title: 'string', src: 'string', length: 'number'};
var optionalKeys = {description: 'string', playcount: 'number', ranking: 'number'};
var internalKeys = {id: 'number', timestamp: 'number'};
var validFilters = ['title', 'src', 'length', 'description', 'playcount', 'ranking', 'id', 'timestamp'];
var otherValidPars = ['filter', 'offset', 'limit'];


// helper functions
var validateVideoRequest = function (req, res) {
    if (req.body.title === undefined || req.body.title === "") {
        utils.checkErrorMessageLength("title");
    }

    if (req.body.src === undefined || req.body.src === "") {
        utils.checkErrorMessageLength("src");
    }

    if (req.body.length === undefined || req.body.length === "" || req.body.length < 0) {
        utils.checkErrorMessageLength("length");
    }

    if (utils.noError()) {
        if (!req.body.playcount || parseInt(req.body.playcount) < 0) {
            req.body.playcount = 0;
        }
        if (!req.body.ranking || parseInt(req.body.ranking) < 0) {
            req.body.ranking = 0;
        }
        if (req.body.description === undefined) {
            req.body.description = "";
        }
        callback();
    } else {

        utils.sendErrorMessage(400, res, "Bad request. Missing parameters: ");

    }
};

// routes **********************
videos.route('/')
    .get(function (req, res, next) {
        // var tmpList = store.select('videos'); // TODO: remove store
        VideoModel.find({}, function (err, items) { // TODO: added
            res.json(items);
        });
        /*Object.keys(req.query).forEach(function (key) {
         if (otherValidPars.indexOf(key) < 0) {
         if (validFilters.indexOf(key) > -1) {
         tmpList = tmpList.filter(function (element) {
         if (typeof element[key] === "number") {
         return element[key] === parseInt(req.query[key]);
         }
         return element[key].indexOf(req.query[key]) > -1;
         });
         } else {
         utils.sendErrorMessage(400, res, "Invalid filter " + key);
         }
         }
         });

         if (req.query.filter !== undefined) {
         var filters = req.query.filter.split(",");
         filters.forEach(function (filter) {
         if (validFilters.indexOf(filter) === -1) {
         utils.sendErrorMessage(400, res, "Invalid filter: '" + filter + "'");
         }
         tmpList = utils.videoListFiltered(tmpList, filters);
         }

         if (req.query.offset !== undefined || req.query.limit !== undefined) {

         if (req.query.limit !== undefined && !utils.validLimit(req.query.limit)) {
         utils.sendErrorMessage(400, res, "You have to set 'limit' as a number");
         }

         if (req.query.offset !== undefined && !utils.validOffset(req.query.offset, tmpList.length)) {
         utils.sendErrorMessage(400, res, "You have to set 'offset' as a number");
         }

         tmpList = utils.videoListOffset(tmpList, req.query.offset, req.query.limit);

         }

         res.json(tmpList);
         });*/

    })
    .post(function (req, res, next) {

        var video = new VideoModel({
            title: req.body.title,
            description: req.body.decription,
            src: req.body.src,
            length: req.body.length,
            playcount: req.body.playcount,
            ranking: req.body.ranking
        });
        video.save(function (err, item) { // TODO: added
            if (!err) {
                res.status(201).json(item)
            }
            next(err);
        });

    })
    .put(function (req, res, next) {
        utils.sendErrorMessage(405, res, "Forbidden method: PUT");
    })
    .delete(function (req, res, next) {
        utils.sendErrorMessage(405, res, "Forbidden method: DELETE");
    });

videos.route('/:id')
    .get(function (req, res, next) {
        var tmpVideo = store.select('videos', req.params.id);
        if (req.query.filter !== undefined) {
            var filters = req.query.filter.split(",");
            filters.forEach(function (filter) {
                if (validFilters.indexOf(filter) === -1) {
                    utils.sendErrorMessage(400, res, "Invalid filter: '" + filter + "'");
                }
            });
            tmpVideo = utils.videoFiltered(tmpVideo, filters);
        }
        res.status(200).json(tmpVideo);
        next();
    })
    .patch(function (req, res, next) { // TODO old version
        if (req.body.playcount === "+1") {
            var video = store.select('videos', req.params.id);
            video.playcount++;
            store.replace('videos', video.id, video);
            res.json(video);
        } else {
            utils.sendErrorMessage(400, res, "Bad Formating in body");
        }
    })
    .post(function (req, res, next) {
        utils.sendErrorMessage(405, res, "Forbidden method: POST");
    })
    .put(function (req, res, next) {
        VideoModel.findByIdAndUpdate(req.params.id, req.body, // TODO: added
            {new: true},
            function(err, item){
                if (err) return next(err);

                res.status(200).json(item);
            });
    })
    .delete(function (req, res, next) {
            VideoModel.findByIdAndRemove(req.params.id, // TODO: added
                function (err, item) {
                    if (err) return next(err);

                    res.status(204).end();
                });
    });
// this middleware function can be used, if you like or remove it
videos.use(function (req, res, next) {
    // if anything to send has been added to res.locals.items
    if (res.locals.items) {
        // then we send it as json and remove it
        res.json(res.locals.items);
        delete res.locals.items;
    } else {
        // otherwise we set status to no-content
        res.set('Content-Type', 'application/json');
        res.status(201).end(); // no content;
    }
});

module.exports = videos;