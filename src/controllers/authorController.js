import Author from '../models/Author';
import { body, validationResult } from 'express-validator/check';
import { sanitizeBody, matchedData } from 'express-validator/filter';
import logger from 'winston';

logger.level='debug';
exports.author_list = (req, res) => {
    Author.find({}, (err, result) => {
        if (err){
            logger.info('Error occured while fetching records from database');
            logger.debug('error::'+err.toString());
            res.render('error',{message:err.toString(), user: req.auth_user_details});
        }
        else{
            logger.info('successfully feched author records from database');
            res.render('authors', { authors: result, user: req.auth_user_details});
        }
    })
}

exports.author_detail = (req, res, next) => {
    Author.findById({ _id: req.params.id }, (err, result) => {
        if (err){
            logger.info('Error occured while fetching author record from database');
            logger.debug('error::'+err.toString());
            res.render('error',{message:err.toString(), user: req.auth_user_details});
        }
        else {
            logger.info('successfully fetched author record from database');
            res.render('author', { author: result, user: req.auth_user_details});
        }
    })
}

exports.create_author_get = (req, res) => {
    res.render('createAuthor',{ user: req.auth_user_details});
}

exports.create_author_post = [
    body('first_name', 'Author first name is required').isLength({ min: 1 }).trim(),
    sanitizeBody('first_name').trim().escape(),
    sanitizeBody('last_name').trim().escape(),
    (req, res, next) => {
        logger.info('create author post method entry point');
        let authorData = {};
        for(let prop in req.body){
            if(req.body[prop]!='')
            authorData[prop]=req.body[prop];
        }
        logger.debug('create author data::'+JSON.stringify(authorData));
        let errors = validationResult(req);
        if (!errors.isEmpty()) {
            logger.info('error occured while validating create author request body');
            let errorMsgs = [];
            let tempErr = errors.mapped();
            logger.debug("express validator validation error:: " + JSON.stringify(tempErr));
            for (let prop in tempErr)
                errorMsgs.push(tempErr[prop].msg);
                res.render('createAuthor',{errors:errorMsgs, user: req.auth_user_details});
        }
        else{
        Author.findOne(authorData,(err,result)=>{
            if(err){
                logger.info('Error occured while performing database operation');
                logger.debug('error::'+err.toString());
                res.render('error',{message:err.toString(), user: req.auth_user_details});    
            }
            else if(result){
                res.redirect('/catalog/author/'+result._id);
            }            
            else{
            Author.create(authorData,(err,result)=>{
                if(err){
                    logger.info('Error occured while performing database operation');
                    logger.debug('error::'+err.toString());
                    res.render('error',{message:err.toString(), user: req.auth_user_details});                            
                }
                else{
                    res.render('createSuccessFeedback',{message:'Added Author',user: req.auth_user_details});
                }
            })
            }
        })
        }
    }
]

exports.update_author_get = (req, res) => {
res.send('yet to implement');
}

exports.update_author_post = (req, res) => {
    res.send('yet to implement');
}

exports.delete_author_get = (req, res) => {
    res.send('yet to implement');
}

exports.delete_author_post = (req, res) => {
    res.send('yet to implement');
}