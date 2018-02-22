require('dotenv').config();
let express=require('express');
let mongoose=require('mongoose');
let path=require('path');
let bodyParser=require('body-parser');
let exhbs=require('express-handlebars');
let logger=require('winston');

let app=express();
let PORT=process.env.PORT||8080;
import catalog from './server/routes/catalog';
import admin from './server/routes/adminroute';

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());


/*mongodb database connection*/

const MONGODB_URI='mongodb://localhost:27017/LocalLibrary';
logger.info('trying to connect with mongodb database');
mongoose.connect(MONGODB_URI);
mongoose.Promise=global.Promise;
let db=mongoose.connection;
db.on('error',console.error.bind('console','MongoDB Connection Error'));

/*set view engine to handlebar*/
app.set('views',__dirname+'/server/views');
app.engine('handlebars',exhbs({defaultLayout:__dirname+'/server/views/layouts/main'}));
app.set('view engine','handlebars');
app.get('/',(req,res)=>{
    res.render('home');
});

app.use('/catalog',catalog);
app.use('/admin',admin)

app.use(express.static('public'));
app.listen(PORT,()=>{
    console.log("Server is running on port: %d",PORT);
})
