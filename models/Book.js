let mongoose=require('mongoose');
let Schema=mongoose.Schema;
let BookShema=new Schema({
    title:{type:String,required:true},
    author:{type:Schema.ObjectId,ref:'Author',required:true},
    genre:[{type:Schema.ObjectId,ref:'Genre',required:true}],
    isbn:{type:String,required:true},
    summary:{type:String,required:true}
});
BookShema.virtual('url').get(function(){
    return '/catalog/books/'+this._id;
});
module.exports=mongoose.model('BookModel',BookShema);