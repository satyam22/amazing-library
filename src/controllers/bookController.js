import Book from '../models/Book';
import Author from '../models/Author';
import Genre from '../models/Genre';
import logger from 'winston';
import async from 'async';
import { body, validationResult } from 'express-validator/check';
import { sanitizeBody } from 'express-validator/filter';

exports.index = (req, res) => {
    res.redirect('/catalog/books');
}

exports.books = (req, res) => {
    logger.info('authenticated user details inside book controller::' + JSON.stringify(req.auth_user_details));
    Book.find({}).
        populate('author').
        populate('genre').
        exec((err, result) => {
            if (err) {
                looger.info('Error occured while performing database operation');
                logger.debug('error::' + err.toString());
                res.render('error', { message: err.toString(), user: req.auth_user_details});
            }
            else {
                logger.info('books fetched from database successfully');
                res.render('books', { books: result, user: req.auth_user_details});
            }
        });
}
exports.book_details = (req, res) => {
    Book.findById({ _id: req.params.id }).populate('author').populate('genre').exec((err, book) => {
        if (err) {
            logger.info('Error occured while fetching book record by ID');
            res.render('error', { message: err.toString(), user: req.auth_user_details});
        }
        else {
            res.render('book', { book, user: req.auth_user_details});
        }
    })
}

exports.create_book_get = (req, res) => {

    if (req.query.errorMessage) {
        logger.info('request param error message::' + req.query.errorMessage);
    }
    async.parallel([function (callback) {
        Author.find({}, 'first_name _id', callback)
    }, function (callback) {
        Genre.find({}, callback)
    }], (err, results) => {
        logger.info("author and genre get results");
        logger.debug("author and genre get results" + JSON.stringify(results));
        if (req.query.errorMessage) {
            res.render('createBook', { authors: results[0], genres: results[1], errorMessage: req.query.errorMessage, user: req.auth_user_details});
        }
        else {
            res.render('createBook', { authors: results[0], genres: results[1], user: req.auth_user_details});
        }
    });
}

exports.create_book_post = [
    body('title', 'Book Title is required').exists(),
    body('summary', 'Book summary is required with minimum 20 characters').exists().isLength({ min: 20 }),
    body('isbn', 'Book ISBN number is required').exists(),
    body('author', 'Book author name is required').exists(),
    sanitizeBody('title').trim().escape(),
    sanitizeBody('summary').trim().escape(),
    (req, res, next) => {
        let errors = validationResult(req);
        let bookData = req.body;

        if (!errors.isEmpty()) {
            logger.info('error occured while validating create book request body');
            let errorMsgs = [];
            let tempErr = errors.mapped();
            logger.debug("express validator validation error:: " + JSON.stringify(tempErr));
            for (let prop in tempErr)
                errorMsgs.push(tempErr[prop].msg);
            let errorMessage = "";
            errorMsgs.forEach((msg) => { errorMessage += msg + ", " });
            errorMessage = encodeURIComponent(errorMessage);
            res.redirect('/catalog/book/create?errorMessage=' + errorMessage);
        }
        else {
            logger.debug('create book method request body::' + JSON.stringify(req.body));
            Book.findOne({ isbn: req.body.isbn }, (err, result) => {
                if (err) {
                    return next(err);
                }
                else if (result) {
                    let errorMessage = encodeURIComponent("Book with given ISBN already exists");
                    return res.redirect('/catalog/book/create?errorMessage=' + errorMessage);
                }
                else {
                    Book.create(req.body, (err, saveResult) => {
                        if (err) {
                            return next(err);
                        }
                        return res.render('createSuccessFeedback',{message:'Added Book',user: req.auth_user_details});
                    });
                }
            });
        }
    }
]

exports.update_book_get = (req, res) => {
    res.send("yet to implement");
}

exports.update_book_post = (req, res) => {
    res.send("yet to implement");
}

exports.delete_book_get = (req, res) => {
    res.send("yet to implement");
}

exports.delete_book_post = (req, res) => {
    res.send("yet to implement");
}
