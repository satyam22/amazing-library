import Admin from '../models/Admin';
import { body, validationResult } from 'express-validator/check';
import { sanitizeBody } from 'express-validator/filter';
import logger from 'winston';

logger.level = 'debug';
exports.create_admin_get = (req, res) => {
    res.render('createAdmin');
}
exports.create_admin_post = [
    body('first_name', 'Admin name is required').isLength({ min: 1 }).trim(),
    body('email', 'Invalid Email Address').isEmail().trim().normalizeEmail(),
    body('password', 'Password must be at least 6 characters long and must contain numeric digit').isLength({ min: 6 }).matches(/\d/),

    (req, res, next) => {
        logger.debug("create admin request body::" + JSON.stringify(req.body));
        let adminData = {};
        for (let prop in req.body) {
            if (req.body[prop] != '')
                adminData[prop] = req.body[prop];
        }
        let admin = new Admin(adminData);

        logger.debug("create admin data:: " + JSON.stringify(admin));
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            let errorMsgs = [];
            let tempErr = errors.mapped();
            logger.debug("express validator validation error:: " + JSON.stringify(tempErr));
            for (let prop in tempErr)
                errorMsgs.push(tempErr[prop].msg);
            res.render('createAdmin', { errors: errorMsgs });
            return;
        }
        else {
            Admin.findOne({ email: req.body.email }, (err, result) => {
                if (err) {
                    logger.debug("finding record in admin database error::" + JSON.stringify(err));
                    return next(err);
                }
                else if (result) {
                    logger.info("email id already in use");
                    return res.render('createAdmin', { errors: ["Email Id already in use"] });
                }
                else {
                    admin.save((err, result) => {
                        if (err) {
                            return next(err);
                        }
                        return res.render('createSuccessFeedback');
                    });
                }
            });
        }

    }
]