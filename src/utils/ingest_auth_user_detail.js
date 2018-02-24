import jwt from 'jsonwebtoken';
import logger from 'Winston';
import Admin from '../models/Admin';
import path from 'path';
let jwtsecret = process.env.JWT_SECRET || 'locallibraryjwtsecret';

module.exports = (req, res, next) => {
    logger.info('ingest auth user details entry point');
    req.app.locals.layout='../../src/views/layouts/homelayout';
    if (req.session.locallibrarytoken) {
        jwt.verify(req.session.locallibrarytoken, jwtsecret, (err, decoded) => {
            if (err) {
                logger.info('error occured while verifying token from received request');
                next();
            }
            let admin_id = decoded.id;
            Admin.findOne({ _id: admin_id }, (err, result) => {
                if (err) {
                    logger.info('error occured while fetching admin record from database');
                    next();
                }
                logger.info('passing authenticated user detail to next middleware');
                logger.debug('auth user details:: ' + JSON.stringify(result));
                req.auth_user_details = result;
               req.app.locals.layout='../../src/views/layouts/authenticateduserlayout';
                next();
            })
        })
    }
    else{
        next();
    }

}