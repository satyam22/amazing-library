import Author from '../models/Author';
import { body, validationResult } from 'express-validator/check';
import { sanitizeBody, matchedData } from 'express-validator/filter';
import logger from 'Winston';

logger.level='debug';
exports.author_list = (req, res) => {
    Author.find({}, (err, result) => {
        if (err)
            next(err);
        else
            res.render('authors', { authors: result });
    })
}

exports.author_detail = (req, res, next) => {
    Author.findById({ _id: req.params.id }, (err, result) => {
        if (err)
            next(err);
        else {
            res.render('author', { author: result });
        }
    })
}

exports.create_author_get = (req, res) => {
    res.render('createAuthor');
}

exports.create_author_post = [
    body('first_name', 'Author first name is required').isLength({ min: 1 }).trim(),
    sanitizeBody('first_name').trim().escape(),
    sanitizeBody('last_name').trim().escape(),
    (req, res, next) => {
        let authorData = {};
        for(let prop in req.body){
            if(req.body[prop]!='')
            authorData[prop]=req.body[prop];
        }
        logger.info('create author data::'+JSON.stringify(authorData));
        let errors = validationResult(req);
        if (!errors.isEmpty()) {
            let errorMsgs = [];
            let tempErr = errors.mapped();
            logger.debug("express validator validation error:: " + JSON.stringify(tempErr));
            for (let prop in tempErr)
                errorMsgs.push(tempErr[prop].msg);
                res.render('createAuthor',{errors:errorMsgs});
        }
        else{
        Author.findOne(authorData,(err,result)=>{
            if(err)
            return next(err);
            else if(result){
                res.redirect('/catalog/author/'+result._id);
            }            
            else{
            Author.create(authorData,(err,result)=>{
                if(err)
                return next(err);
                else
                return res.render('createSuccessFeedback');
            })
            }
        })
        }
    }
]

exports.update_author_get = (req, res) => {

}

exports.update_author_post = (req, res) => {

}

exports.delete_author_get = (req, res) => {

}

exports.delete_author_post = (req, res) => {

}