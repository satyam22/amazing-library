import express from 'express';
import mongoose from'mongoose';
var path=require('path');
let app=express();
// let routes=require('./server/routes/route');
// let exhbs=require('express-handlebars');
import catalog from './server/routes/catalog';
import exhbs from 'express-handlebars';
// import AuthorModel from './server/models/Author';
// import GenreModel from './server/models/Genre';
// import BookModel from './server/models/Book';
// import BookInstanceModel from './server/models/BookInstance';


/*mongodb database connection*/

const MONGODB_URI='mongodb://localhost:27017/LocalLibrary';
mongoose.connect(MONGODB_URI);
mongoose.Promise=global.Promise;
let db=mongoose.connection;
db.on('error',console.error.bind('console','MongoDB Connection Error'));

// let authorInstance={
//     first_name:'Satyam',
//     last_name:'Bansal',
//     date_of_birth:new Date('03-22-1994')
// };
// AuthorModel.create(authorInstance,function(err,result){
//     if(err){
//         console.log(err);
//     }
//     else{
//         console.log(result);
//     }
// })
app.use(express.static('public'));
/*set view engine to handlebar*/
app.set('views',__dirname+'/server/views');
app.engine('handlebars',exhbs({defaultLayout:__dirname+'/server/views/layouts/main'}));
app.set('view engine','handlebars');
app.use('/catalog',catalog);
app.get('/',(req,res)=>{
    res.render('home');
});

app.listen(8080,()=>{
    console.log("Server is running on port: 8080");
})
