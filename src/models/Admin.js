let mongoose=require('mongoose');

let Schema=mongoose.Schema;
let AdminSchema=new Schema({
first_name:{type:String,required:true},
last_name:String,
email:{type:String,required:true},
contact_no:{type:String},
profile_image:{data:Buffer,contentType:String},
password:{type:String,required:true}
});
AdminSchema.virtual('name').get(function(){
    return this.first_name+' '+this.last_name;
});

module.exports=mongoose.model('Admin',AdminSchema);
