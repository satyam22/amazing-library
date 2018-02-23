import Book from '../models/Book';
import Author from '../models/Author';
import Genre from '../models/Genre';
import logger from 'Winston';
import async from 'async';
import { body, validationResult } from 'express-validator/check';
import { sanitizeBody } from 'express-validator/filter';
exports.index = (req, res) => {

}

exports.books = (req, res) => {
    Book.find({}).
        populate('author').
        populate('genre').
        exec((err, result) => {
            if (err) {
                res.send("Error occured while accessing data store");
            }
            else {
            logger.info('books fetched from database successfully');
                res.render('books', { books: result });
            }
        });
}
exports.book_details = (req, res) => {
    Book.findById({_id:req.params.id}).populate('author').populate('genre').exec((err,book)=>{
        if(err){
            logger.info('Error occured while fetching book record by ID');
            res.render('error',{message:err.toString()});            
        }
        else{
            res.render('book',{book});
        }
    })
}

exports.create_book_get = (req, res) => {
    let callback = function (err, result) {
        if (err)
            return err;
        return result;
    }
    if(req.query.errorMessage){
        logger.info('request param error message::'+req.query.errorMessage);
    }
    async.parallel([function (callback) {
        Author.find({}, 'first_name _id', callback)
    }, function (callback) {
        Genre.find({}, callback)
    }], (err, results) => {
        logger.info("author and genre get results");
        logger.info(JSON.stringify(results));
        if(req.query.errorMessage){
            res.render('createBook', { authors: results[0], genres: results[1],errorMessage:req.query.errorMessage});
        }
        else{
            res.render('createBook', { authors: results[0], genres: results[1]});

        }
    })
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
            let errorMsgs = [];
            let tempErr = errors.mapped();
            logger.debug("express validator validation error:: " + JSON.stringify(tempErr));
            for (let prop in tempErr)
                errorMsgs.push(tempErr[prop].msg);
                let errorMessage="";
                errorMsgs.forEach((msg)=>{errorMessage+=msg+", "});
                errorMessage=encodeURIComponent(errorMessage);            
            res.redirect('/catalog/book/create?errorMessage='+errorMessage);
        }
    else{
        logger.debug('create book method request body::'+JSON.stringify(req.body));
        Book.findOne({isbn:req.body.isbn},(err,result)=>{
            if(err){
                return next(err);
            }
            else if(result){
                let errorMessage=encodeURIComponent("Book with given ISBN already exists");

                return res.redirect('/catalog/book/create?errorMessage='+errorMessage);                
            }
            else{
            Book.create(req.body,(err,saveResult)=>{
                if(err){
                    return next(err);
                }
                return res.render('createSuccessFeedback');
            });
            }
        })
    }
    }
]

exports.update_book_get = (req, res) => {
    res.send("duummy");
}

exports.update_book_post = (req, res) => {
    res.send("duummy");
}

exports.delete_book_get = (req, res) => {
    res.send("duummy");
}

exports.delete_book_post = (req, res) => {
    res.send("duummy");
}
