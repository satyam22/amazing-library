
import Genre from '../models/Genre';
const {body,validationResult}=require('express-validator/check');
const {sanitizeBody}=require('express-validator/filter');
exports.genres=(req,res)=>{
Genre.find({},(err,result)=>{
    if(err){
        res.render('error',{"message":err.toString()});        
    }
    else{
    res.render('genres',{genres:result});
    }
})
}

exports.genre_details=(req,res)=>{

if(req.params.id){
Genre.findById({_id:req.params.id},(err,result)=>{
if(err){
    res.render('error',{"message":err.toString()});
}
else{
    console.log(result);
    
    res.render('genre',{genre:result});
}    
})
}
}

exports.create_genre_get=(req,res)=>{
res.render('createGenre');
}

exports.create_genre_post=[
    body('name','Genre name is required').isLength({min:1}).trim(),
    sanitizeBody('name').trim().escape(),
    (req,res,result)=>{
        console.log(req.body);
    let errors=validationResult(req);
    let genre=new Genre({
        name:req.body.name
    });
    if(!errors.isEmpty()){
        res.render('createGenre',{errors:errors});
    }
    else{
        Genre.findOne({name:req.body.name}).
        exec((err,result)=>{
            if(err){
                next(err);
            }
            if(result){
                res.redirect(result.url);
            }
            else{
                genre.save((err,result)=>{
                    if(err){
                        next(err);
                    }
                    res.redirect(result.url);
                })
            }
        })
    }
    }
]

exports.update_genre_get=(req,res)=>{

}
exports.update_genre_post=(req,res)=>{

}

exports.delete_genre_get=(req,res)=>{

}
exports.delete_genre_post=(req,res)=>{

}