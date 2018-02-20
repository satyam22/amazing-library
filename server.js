import express from 'express';
import mongoose from'mongoose';
let app=express();
// let routes=require('./server/routes/route');
// let exhbs=require('express-handlebars');
import routes from './server/routes/route';
import exhbs from 'express-handlebars';
import AuthorModel from './models/Author';

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

/*set view engine to handlebar*/
app.engine('handlebars',exhbs({defaultLayout:'main'}));
app.set('view engine','handlebars');
app.use('/satyam',routes);
app.get('/',(req,res)=>{
    res.render('home');
});

app.listen(8080,()=>{
    console.log("Server is running on port: 8080");
})
