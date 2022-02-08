const { decodeToken } = require('../utils/decodeToken');

// import { decodeToken } from '../utils/decodeToken'

require('dotenv').config();

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const userId = decodeToken(token);
        if(req.body.userId && req.body.userId !== userId) res.status(403).json({error: 'Unauthorized request.'});
        else {
            next();
        }
    } catch (err) {
        res.status(401).json({error: err });
    }
}