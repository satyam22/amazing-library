
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
Genre.findById({_id:id},(err,result)=>{
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

exports.create_genre_post=(req,res)=>{

}

exports.update_genre_get=(req,res)=>{

}
exports.update_genre_post=(req,res)=>{

}

exports.delete_genre_get=(req,res)=>{

}
exports.delete_genre_post=(req,res)=>{

}