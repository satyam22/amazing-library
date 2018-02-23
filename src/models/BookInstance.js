let mongoose=require('mongoose');
let Schema=mongoose.Schema;
require('./Book');
let BookInstanceSchema=Schema({
    book:{type:Schema.Types.ObjectId,ref:'Book',required:true},
    status:{type:String,enum:['Available','Maintenance','Loaned','Reserved'],default:'Maintenance'},
    due_back:{type:Date,default:Date.now()},
    imprint:{type:String,required:true}
});
BookInstanceSchema.virtual('url').get(function(){
    return '/catalog/bookInstance/'+this._id;
});
module.exports=mongoose.model('BookInstance',BookInstanceSchema);