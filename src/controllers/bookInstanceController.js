import BookInstance from '../models/BookInstance';
import Book from '../models/Book';
import logger from 'Winston';
import {body,validationResult} from 'express-validator/check';
import {santizeBody} from 'express-validator/filter';
logger.level='debug';

exports.book_instances=(req,res)=>{
BookInstance.find({}).populate('book').exec((err,result)=>{
    if(err){
        logger.info('error occured while while fetching books from database');
        logger.debug('error occured::'+err.toString());
    res.render('error',{message:err.toString(),user:req.auth_user_details});
    }
    logger.debug('book instances from database:: '+JSON.stringify(result));
    res.render('bookInstances',{bookInstances:result,user:req.auth_user_details});    
})
}

exports.book_instance_details=(req,res)=>{
BookInstance.findOne({_id:req.params.id}).populate('book').exec((err,result)=>{
    if(err){
        logger.info('error occured while while fetching books from database');
        logger.debug('error occured::'+err.toString());
        res.render('error',{message:err.toString(),user:req.auth_user_details});
    }
    else{
        logger.debug('book instance from database:: '+JSON.stringify(result));
        res.render('bookInstance',{bookInstance:result,user:req.auth_user_details});                
    }

})
}

exports.create_book_instance_get=(req,res)=>{
    Book.find({},'title _id',(err,books)=>{
    if(err){
        logger.info('error occured while while fetching book instance from database');
        logger.debug('error occured::'+err.toString());
        res.render('error',{message:err.toString(),user:req.auth_user_details});
    }
    else{
        res.render('createBookInstance',{books,errorMessage:req.query.errorMessage,user:req.auth_user_details});
    }
    });
}

exports.create_book_instance_post=(req,res,next)=>{
let bookInstanceData={};
for(let prop in req.body)
if(req.body[prop]!='')
bookInstanceData[prop]=req.body[prop];
BookInstance.findOne(bookInstanceData,(err,result)=>{
    if(err){
        logger.info('error occured while while fetching book instance from database');
        logger.debug('error occured::'+err.toString());
        res.render('error',{message:err.toString(),user:req.auth_user_details});        
    }
    else if(result){
        let errorMessage=encodeURIComponent('Book Instance already exists');
        res.redirect('/catalog/bookInstance/create?errorMessage='+errorMessage);
    }
    else{
        BookInstance.create(bookInstanceData,(err,result)=>{
            if(err)
            return next(err);
            else
            res.render('createSuccessFeedback',{user:req.auth_user_details});
        });
    }
});
}

exports.update_book_instance_get=(req,res)=>{
res.send('yet to implement');
}

exports.update_book_instance_post=(req,res)=>{
res.send('yet to implement');
}

exports.delete_book_instance_get=(req,res)=>{
res.send('yet to implement');
}

exports.delete_book_instance_post=(req,res)=>{
res.send('yet to implement');
}