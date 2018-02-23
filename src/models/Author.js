let mongoose=require('mongoose');
let Schema=mongoose.Schema;
let AuthorSchema=new Schema({
    first_name:{type:String,required:true},
    last_name:String,
    date_of_birth:{type:Date},
    date_of_death:{type:Date}
});
AuthorSchema.virtual('name').get(function(){
    return this.first_name+' '+this.last_name;
});
AuthorSchema.virtual('url').get(function(){
    return '/catalog/author/'+this._id;
});
module.exports=mongoose.model('Author',AuthorSchema);