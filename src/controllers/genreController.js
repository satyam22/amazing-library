
import Genre from '../models/Genre';
const { body, validationResult } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');
import logger from 'winston';

exports.genres = (req, res) => {
    Genre.find({}, (err, result) => {
        if (err) {
            logger.info('error occured while fethcing genres from database');
            logger.debug('error occured::' + err.toString());
            res.render('error', {message:err.toString(),user:req.auth_user_details});
        }
        else {
            logger.info('successfully fetched genres from database');
            res.render('genres', { genres: result,user:req.auth_user_details});
        }
    });
}

exports.genre_details = (req, res) => {

    if (req.params.id) {
        Genre.findById({ _id: req.params.id }, (err, result) => {
            if (err) {
                logger.info('error occured while fethcing genre from database');
                logger.debug('error occured::' + err.toString());
                res.render('error', {message: err.toString(),user:req.auth_user_details});
            }
            else {
                logger.info('successfully fetched genre from database');
                res.render('genre', {genre:result,user:req.auth_user_details});
            }
        })
    }
}

exports.create_genre_get = (req, res) => {
    res.render('createGenre',{user:req.auth_user_details});
}

exports.create_genre_post = [
    body('name', 'Genre name is required').isLength({ min: 1 }).trim(),
    sanitizeBody('name').trim().escape(),
    (req, res, result) => {
        logger.info('create genre post method entry point');
        let errors = validationResult(req);
        let genre = new Genre({
            name: req.body.name
        });
        if (!errors.isEmpty()) {
            logger.info('error occured while validating create genre request body');
            let errorMsgs = [];
            let tempErr = errors.mapped();
            logger.debug("express validator validation error:: " + JSON.stringify(tempErr));
            for (let prop in tempErr)
                errorMsgs.push(tempErr[prop].msg);
            res.render('createGenre', { errors: errorMsgs,user:req.auth_user_details});
        }
        else {
            Genre.findOne({ name: req.body.name }).
                exec((err, result) => {
                    if (err) {
                        logger.info('error occured while fethcing genre from database');
                        logger.debug('error occured::' + err.toString());
                        res.render('error', { "message": err.toString(),user:req.auth_user_details});
                    }
                    if (result) {
                        logger.info('specifed genre already exists.it can not be created again');
                        res.redirect(result.url);
                    }
                    else {
                        genre.save((err, result) => {
                            if (err) {
                                logger.info('error occured while saving genre in database');
                                logger.debug('error occured::' + err.toString());
                                res.render('error', { "message": err.toString(),user:req.auth_user_details});
                            }
                            logger.info('genre created successfully in database');
                            res.render('createSuccessFeedback',{message:'Added Genre',user:req.auth_user_details});
                        });
                    }
                })
        }
    }
]

exports.update_genre_get = (req, res) => {
    res.send('yet to implement');
}
exports.update_genre_post = (req, res) => {
    res.send('yet to implement');
}

exports.delete_genre_get = (req, res) => {
    res.send('yet to implement');
}
exports.delete_genre_post = (req, res) => {
    res.send('yet to implement');
}