/** This module defines the routes for comments using the store.js as db memory
 *
 * @authors Johannes Konert, Denny Hörtz, Toni Kluth, Benjamin Lopez
 * @licence CC BY-SA 4.0
 *
 * @module routes/comments
 * @type {Router}
 */

// remember: in modules you have 3 variables given by CommonJS
// 1.) require() function
// 2.) module.exports
// 3.) exports (which is module.exports)

// modules
var express = require('express');
var logger = require('debug')('me2u4:comments');
var store = require('../blackbox/store');
var utils = require('../utils/utils');

var comments = express.Router();

// if you like, you can use this for task 1.b:
var requiredKeys = {videoid: 'number', text: 'string'};
var optionalKeys = {likes: 'number', dislikes: 'number'};
var internalKeys = {id: 'number', timestamp: 'number'};

// helper functions
var validateCommentRequest = function (req, res, callback) {
    var likes = parseInt(req.body.likes);
    var dislikes = parseInt(req.body.dislikes);
    var video = undefined;

    if (req.body.text === undefined || req.body.text === "") {
        utils.checkErrorMessageLength("text");
    }

    if (req.body.videoid === undefined || req.body.videoid === "") {
        utils.checkErrorMessageLength("videoid");
    } else {
        video = store.select("videos", req.body.id);
    }

    if (utils.noError() && video !== undefined) {
        if (!(likes instanceof Number) || likes < 0) {
            req.body.likes = 0;
        }
        if (!(dislikes instanceof Number) || dislikes < 0) {
            req.body.dislikes = 0;
        }
        callback();
    } else {

        utils.sendErrorMessage(400, res, "missing parameters: ");

    }
};

// routes **********************
comments.route('/')
    .get(function (req, res, next) {
        res.json(store.select('comments'));
        next();
    })
    .post(function (req, res, next) {

        validateCommentRequest(req, res, function () {
            req.body.timestamp = utils.getTimeStamp();
            var id = store.insert('comments', req.body);
            // set code 201 "created" and send the item back
            res.status(201).json(store.select('comments', id));
        });
    })
    .put(function (req, res, next) {
        validateCommentRequest(req, res, function () {
            req.body.timestamp = utils.getTimeStamp();
            store.replace('comments', req.body.id, req.body);
            res.status(201).json(store.select('comments', req.body.id));
        });
    })
    .delete(function (req, res, next) {
        store.remove('comments', req.body.id);
        res.status(204).end();
    });


// this middleware function can be used, if you like or remove it
comments.use(function (req, res, next) {
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

module.exports = comments;