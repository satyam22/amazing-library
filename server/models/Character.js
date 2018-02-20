let mongoose=require('mongoose');
let Schema=mongoose.Schema;
let CharacterSchema=new Schema({
id:{type:Number,required:true},
name:{type:String,required:true},
description:String,
thumbnail:{data:Buffer,contentType:String},
comics:[{id:Number,name:String}],
series:[{id:Number,name:String}],
stories:[{id:Number,name:String}],
events:[{id:Number,name:String}],
urls:[{type:String,url:String}]
});
module.exports=mongoose.model('Character',CharacterSchema);