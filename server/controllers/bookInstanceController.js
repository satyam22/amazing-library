import BookInstance from '../models/BookInstance';
import Book from '../models/Book';
import logger from 'Winston';
import {body,validationResult} from 'express-validator/check';
import {santizeBody} from 'express-validator/filter';
logger.level='debug';
exports.book_instances=(req,res)=>{
BookInstance.find({}).populate('book').exec((err,result)=>{
    if(err){
        return res.render('error',{message:err.toString()});
    }
    logger.debug('book instances from database:: '+JSON.stringify(result));
    return res.render('bookInstances',{bookInstances:result});    
})
}

exports.book_instance_details=(req,res)=>{

}

exports.create_book_instance_get=(req,res)=>{
    Book.find({},'title _id',(err,books)=>{
    if(err)
    return next(err);
    else
    res.render('createBookInstance',{books,errorMessage:req.query.errorMessage});
    });
}

exports.create_book_instance_post=(req,res,next)=>{
let bookInstanceData={};
for(let prop in req.body)
if(req.body[prop]!='')
bookInstanceData[prop]=req.body[prop];
BookInstance.findOne(bookInstanceData,(err,result)=>{
    if(err)
    return next(err);
    else if(result){
        let errorMessage=encodeURIComponent('Book Instance already exists');
        res.redirect('/catalog/bookInstance/create?errorMessage='+errorMessage);
    }
    else{
        BookInstance.create(bookInstanceData,(err,result)=>{
            if(err)
            return next(err);
            else
            res.render('createSuccessFeedback');
        });
    }
})
}

exports.update_book_instance_get=(req,res)=>{

}

exports.update_book_instance_post=(req,res)=>{

}

exports.delete_book_instance_get=(req,res)=>{

}

exports.delete_book_instance_post=(req,res)=>{

}