require('dotenv').config();
let express = require('express');
let mongoose = require('mongoose');
let path = require('path');
let bodyParser = require('body-parser');
let exhbs = require('express-handlebars');
let logger = require('winston');
let session = require('express-session');
let MongoStore = require('connect-mongo')(session);

/* dotenv is used to get variables from .config file and set these variables in process.env object.
this file should not commited to github repository as it might contain your personal credentials.
always add entry of this file to .gitignore file.
*/


/* catalog route file contains all routes related to Book,BookInstance,Author and Genre Model*/
/*Admin route file contains all routes related to Admin model*/
import catalog from './src/routes/catalog';
import admin from './src/routes/adminroute';

/*you can use your remote mongo URL (for example you can try mlab) to connect with remote database*/ 
const MONGODB_URI = process.env.MONGODB_URI||'mongodb://localhost:27017/LocalLibrary';


let app = express();
let PORT = process.env.PORT || 8080;

/*
You need to use bodyParser() if you want the form data to be available in req.body .
bodyParser.urlencoded({extended: ...}) basically tells the system whether you want 
to use a simple algorithm for shallow parsing (i.e. false) or complex algorithm for 
deep parsing that can deal with nested objects (i.e. true).
*/
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


/*mongodb database connection.*/

logger.info('trying to connect with mongodb database');
mongoose.connect(MONGODB_URI,{useMongoClient:true});
mongoose.Promise = global.Promise;
let db = mongoose.connection;
db.on('error', console.error.bind('console', 'MongoDB Connection Error'));


app.use(session({
    secret:process.env.SESSION_SECRET||'local-library',
    resave: false,
    saveUninitialized: true,
    store: new MongoStore({ mongooseConnection: db })
}));

app.set('views', __dirname + '/src/views');
//app.engine('handlebars',exhbs({}));
app.engine('handlebars', exhbs({ defaultLayout: __dirname + '/src/views/layouts/homelayout' }));
app.set('view engine', 'handlebars');
app.get('/', (req, res) => {
    res.redirect('/catalog/books');
});

app.use('/catalog', catalog);
app.use('/admin', admin)

app.use(express.static('public'));
app.listen(PORT, () => {
    console.log("Server is running on port: %d", PORT);
});
