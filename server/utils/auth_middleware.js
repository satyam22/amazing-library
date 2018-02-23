import jwt from 'jsonwebtoken';
import logger from 'Winston';
let jwtsecret = process.env.JWT_SECRET||'locallibraryjwtsecret';

module.exports=(req,res,next)=>{
    logger.info('inside auth middleware');
    logger.info('request session information::'+JSON.stringify(req.ression));
    if(!req.session.locallibrarytoken)
    res.redirect('/admin/login');
    else{
        jwt.verify(req.session.locallibrarytoken,jwtsecret,(err,decoded)=>{
            logger.info('inside auth middleware:: juwt verify method');
            if(err)
            res.redirect('/admin/login');
            else{
                logger.info('decoded JWT data::'+JSON.stringify(decoded));
                res.locals.userId=decoded.id;
                next();
            } 
        })
    }
}