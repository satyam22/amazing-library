let express=require('express');
let router=express.Router();

router.get('/about',(req,res)=>{
    res.send("Javascript Developer");
})
router.get('/contacts',(req,res)=>{
    res.send('Mail:satyamsgsits1994@gmail.com');
})
router.get('/interest',(req,res)=>{
    res.send('Adventure');
});
module.exports=router;