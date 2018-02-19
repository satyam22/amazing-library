let express=require('express');let app=express();
let routes=require('./server/routes/route');
let exhbs=require('express-handlebars');

app.engine('handlebars',exhbs({defaultLayout:'main'}));
app.set('view engine','handlebars');
app.use('/satyam',routes);
app.get('/',(req,res)=>{
    res.render('home');
});
app.listen(8080,()=>{
    console.log("Server is running on port: 8080");
})
