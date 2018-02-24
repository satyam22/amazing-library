let express=require('express');
let router=express.Router();
import {create_admin_get,create_admin_post} from '../controllers/adminController';
import {login_admin_get,login_admin_post,logout_admin} from '../controllers/adminController';


router.get('/signup',create_admin_get);
router.post('/signup',create_admin_post);

router.get('/login',login_admin_get);
router.post('/login',login_admin_post);

router.get('/logout',logout_admin);
module.exports=router;