/** This module defines the routes for videos using the store.js as db memory
 *
 * @author Johannes Konert
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

var videos = express.Router();

// if you like, you can use this for task 1.b:
var requiredKeys = {title: 'string', src: 'string', length: 'number'};
var optionalKeys = {description: 'string', playcount: 'number', ranking: 'number'};
var internalKeys = {id: 'number', timestamp: 'number'};


// routes **********************
videos.route('/')
    .get(function(req, res, next) {
        res.json(store.select('videos'));
        next();
    })
    .post(function(req,res,next) {
        if (req.body.title === undefined || req.body.title === "" || req.body.src === undefined || req.body.src === "" ||
            req.body.length === undefined || req.body.length === "" || req.body.length < 0) {
            res.status(400).json("Bad request");
        }/*
        if (req.body.playcount === undefined || req.body.playcount === "" || req.body.playcount < 0) {
            TODO set playcount default to 0
        }
        if (req.body.ranking === undefined || req.body.ranking === "" || req.body.ranking < 0) {
            TODO set ranking default to 0
        }*/ else {
            var id = store.insert('videos', req.body);
            // set code 201 "created" and send the item back
            res.status(201).json(store.select('videos', id));
        }
        next();
    });


// this middleware function can be used, if you like or remove it
videos.use(function(req, res, next){
    // if anything to send has been added to res.locals.items
    if (res.locals.items) {
        // then we send it as json and remove it
        res.json(res.locals.items);
        delete res.locals.items;
    } else {
        // otherwise we set status to no-content
        res.set('Content-Type', 'application/json');
        res.status(204).end(); // no content;
    }
});

module.exports = videos;
