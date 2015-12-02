/** This module defines the routes for videos using the store.js as db memory
 *
 * @author Denny Hörtz, Toni Kluth, Benjamin Lopez
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
var store = require('../blackbox/store');
var utils = require('../utils/utils');

var videos = express.Router();

// if you like, you can use this for task 1.b:
var requiredKeys = {title: 'string', src: 'string', length: 'number'};
var optionalKeys = {description: 'string', playcount: 'number', ranking: 'number'};
var internalKeys = {id: 'number', timestamp: 'number'};
var validFilters = ['title', 'src', 'length', 'description', 'playcount', 'ranking', 'id', 'timestamp'];

// helper functions
var validateVideoRequest = function (req, res, callback) {
    var playcount = parseInt(req.body.playcount);
    var ranking = parseInt(req.body.ranking);

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
        if (!(playcount instanceof Number) || playcount < 0) {
            req.body.playcount = 0;
        }
        if (!(ranking instanceof Number) || ranking < 0) {
            req.body.ranking = 0;
        }
        if (req.body.description === undefined) {
            req.body.description = "";
        }
        callback();
    } else {

        utils.sendErrorMessage(400, res, "missing parameters: ");

    }
}

// routes **********************
videos.route('/')
    .get(function (req, res, next) {

        if (req.query.filter !== undefined) {
            var filters = req.query.filter.split(",");
            filters.forEach(function (filter) {
                if (validFilters.indexOf(filter) === -1) {
                    utils.sendErrorMessage(400, res, "Invalid filter: '" + filter + "'");
                }
            });
            res.json(store.select('videos', undefined, filters));
        }else{
            res.json(store.select('videos'));
        }

        //TODO Aufgabe 3a
        //Object.keys(req.query).forEach(function(key) {
        //        console.log(key + ": " + req.query[key] + "(" + validFilters.indexOf(key) + ")");
        //});

    })
    .post(function (req, res, next) {

        validateVideoRequest(req, res, function () {
            req.body.timestamp = utils.getTimeStamp();
            var id = store.insert('videos', req.body);
            // set code 201 "created" and send the item back
            res.status(201).json(store.select('videos', id));
        });

    })
    .put(function (req, res, next) {
        validateVideoRequest(req, res, function () {
            req.body.timestamp = utils.getTimeStamp();
            store.replace('videos', req.body.id, req.body);
            res.status(201).json(store.select('videos', req.body.id));
        });
    })
    .delete(function (req, res, next) {
        store.remove('videos', req.body.id);
        res.status(204).end();
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