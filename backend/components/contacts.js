const { models } = require('../models/contacts');
const mongoose = require('../config');
const { JWT, signature } = require("./auth");
const Contact = require('../models/contacts.js')

async function infoUser(req, res, next) {
    const token = req.headers.authorization.split(' ')[1];
    const payload = JWT.decode(token);
    Contact.find().then(function (resultado) {
        console.log(resultado);
        req.contact = resultado; 
    next();
    });

    /* const query = selectQuery("users", "userId, userName, firstName, lastName, address, email, phoneNumber", `userName = '${payload.userName}'`);
    const [dbUser] = await sequelize.query(query, { raw: true });
    const foundUser = dbUser[0];*/
    
  }

 

  module.exports = infoUser;