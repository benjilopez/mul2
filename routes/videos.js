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

// routes **********************
videos.route('/')
    .get(function (req, res, next) {
        VideoModel.find({}, function (err, items) {
            res.json(items);
        });

        // var tmpList = store.select('videos');

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
        video.save(function (err, item) {
            if (!err) {
                res.status(201).json(item);
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

        VideoModel.findById(req.params.id, function(err, item){
            if(err) return next(err);

            res.status(200).json(item);
        });
    })
    .patch(function (req, res, next) { // TODO eventuell geht das eleganter? Statt ein neues Object zu erstellen, kann da eventuell Mongoose?

        if(req.body.playcount !== undefined){
          req.body.playcount = undefined;
        };

        // increment playcount
        VideoModel.findByIdAndUpdate(req.params.id, {$inc : {playcount : 1}}, function(err){
            if(err) return next(err);
        });

        var obj = {};

        if(req.body.title !== undefined){
            obj.title = req.body.title;
        }

        if(req.body.src !== undefined){
            obj.src = req.body.src;
        }

        if(req.body.description !== undefined){
            obj.description = req.body.description;
        }

        if(req.body.length !== undefined){
            obj.length = req.body.length;
        }

        VideoModel.findByIdAndUpdate(req.params.id, obj, {new: true}, function(err, item){
            if(err) return next(err);

            res.status(203).json(item);
        });
    })
    .post(function (req, res, next) {
        utils.sendErrorMessage(405, res, "Forbidden method: POST");
    })
    .put(function (req, res, next) {
        VideoModel.findByIdAndUpdate(req.params.id, req.body,
            {new: true},
            function(err, item){
                if (err) return next(err);

                res.status(200).json(item);
            });
    })
    .delete(function (req, res, next) {
            VideoModel.findByIdAndRemove(req.params.id,
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