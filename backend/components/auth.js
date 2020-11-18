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

async function validateAdmin(req, res, next) {
    const token = req.headers.authorization.split(' ')[1];
    const payload = JWT.decode(token);
    if(payload.isAdmin === 1){
      console.log('Authorized: Admin');
      req.isAdmin = payload.isAdmin;
      next();
  }else{
    req.isAdmin = payload.isAdmin;
      next();
  }
  }
  
  
  module.exports = { JWT, signature, validateToken, validateAdmin }; 