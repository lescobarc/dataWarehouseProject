const JWT = require('jsonwebtoken');
require('dotenv').config();
const signature = process.env.dbName;

const validateToken = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        JWT.verify(token, signature);
        console.log('Correct Token')
        next();
    } catch (error) {
        res.status(401).json('Unauthorized: Wrong Token');
    }
}

module.exports = { JWT, signature, validateToken }; 