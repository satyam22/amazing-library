/*import required npm modules*/
require('dotenv').config();
let express=require('express');
let mongoose=require('mongoose');
let path=require('path');
let bodyParser=require('body-parser');
let exhbs=require('express-handlebars');
let logger=require('winston');
let session=require('express-session');
let MongoStore=require('connect-mongo')(session);

/*import route handlers*/
import catalog from './src/routes/catalog';
import admin from './src/routes/adminroute';

const MONGODB_URI='mongodb://localhost:27017/LocalLibrary';



let app=express();
let PORT=process.env.PORT||8080;
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());


/*mongodb database connection*/

logger.info('trying to connect with mongodb database');
mongoose.connect(MONGODB_URI);
mongoose.Promise=global.Promise;
let db=mongoose.connection;
db.on('error',console.error.bind('console','MongoDB Connection Error'));


app.use(session({
    secret:'local-library',
    resave:false,
    saveUninitialized:true,
    store:new MongoStore({mongooseConnection:db})
}));

app.set('views',__dirname+'/src/views');
//app.engine('handlebars',exhbs({}));
app.engine('handlebars',exhbs({defaultLayout:__dirname+'/src/views/layouts/homelayout'}));
app.set('view engine','handlebars');
app.get('/',(req,res)=>{
res.redirect('/catalog/books');
});

app.use('/catalog',catalog);
app.use('/admin',admin)

app.use(express.static('public'));
app.listen(PORT,()=>{
    console.log("Server is running on port: %d",PORT);
})
