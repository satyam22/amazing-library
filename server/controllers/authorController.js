import Author from '../models/Author';
import {body,validationResult} from 'express-validator/check';
import {sanitizeBody, matchedData} from 'express-validator/filter';
exports.author_list=(req,res)=>{
Author.find({},(err,result)=>{
    if(err)
    next(err);
    else
    res.render('authors',{authors:result});
})
}

exports.author_detail=(req,res,next)=>{
Author.findById({_id:req.params.id},(err,result)=>{
    if(err)
    next(err);
    else{
        res.render('author',{author:result});
    }
})
}

exports.create_author_get=(req,res)=>{
res.render('createAuthor');
}

exports.create_author_post=[
    body('first_name','Author first name is required').isLength({min:1}).trim(),
    sanitizeBody('first_name').trim().escape(),
    sanitizeBody('last_name').trim().escape(),
    (req,res,next)=>{
        let authorData={};
        console.log(matchedData(req));
        res.send('dd');
    }
]

exports.update_author_get=(req,res)=>{

}

exports.update_author_post=(req,res)=>{

}

exports.delete_author_get=(req,res)=>{

}

exports.delete_author_post=(req,res)=>{

}