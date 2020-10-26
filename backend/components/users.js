/* const { models } = require('../config.js');
const mongoose = require('../config.js');
const { JWT, signature } = require("./auth");
const User = require('../models/users.js')


//1. Login User
async function validateCredentials(req, res) {
    let username = req.body.username;
    let password = req.body.password;
    if (username) {
      const registeredUser = await User.findOne({username}).then((result)=> console.log(result));
      if (registeredUser) {
        const { password: dbPassword, isAdmin } = registeredUser;
        if (password === dbPassword) {
          const token = JWT.sign({ userName, isAdmin }, signature, { expiresIn: "120m" });
          req.jwtToken = token;
          console.log(JWT.verify(token, signature));

          const { jwtToken } = req;
          const loginResponse = { token: jwtToken };
          res.status(200).json({loginResponse});
       
          res.status(500).json("Internal Server Error");
          
        } else {
          res.status(401).json("Wrong Password");
        }
      } else {
        res.status(401).json("Invalid Username");
      }
    } else {
      res.status(400).json("Bad Request: Missing Arguments");
    }

 
        
      
}

//2. 
function index(req,res){
  Product.find({})
      .then(products => {
          if(products.length) return res.status(200).send({products});
          return res.status(204).send({message: 'NO CONTENT'});
      }).catch(error => res.status(500).send({error}));
}

*/

 
function so (req, res) {
  User.find({}).then(function (resultado) {
  console.log(resultado);
  return res.status(204).send({message: 'NO CONTENT'});
});}

module.exports = { so };