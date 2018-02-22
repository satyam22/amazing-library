let express=require('express');
let router=express.Router();
import {create_admin_get} from '../controllers/adminController';
import {create_admin_post} from '../controllers/adminController';
router.get('/signup',create_admin_get);
router.post('/signup',create_admin_post)

module.exports=router;