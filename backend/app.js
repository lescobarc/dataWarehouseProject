const express = require('express');
const JWT = require('jsonwebtoken');
const app = express();
app.use(express.json());
const User = require('./models/users.js')
const signature = 'dwfs'

const {  validateToken } = require('./components/auth');
/* const = require('./components/users');
 */const {infoUser } = require('./components/contacts');
app.listen(3000, () => {
  console.log("Server running on port 3000");
});

//USERS

//1. Login User
async function validateCredentials(req, res) {
  let username = req.body.username;
  console.log(username)
  let password = req.body.password;
  if (username) {
    const registeredUser = await User.findOne({username}).then((result)=>{
      if (password === result.password) {
        const token = JWT.sign({ username }, signature, { expiresIn: "120m" });
        req.jwtToken = token;
        console.log(JWT.verify(token, signature));
        const { jwtToken } = req;
        res.status(200).json({token: jwtToken});
    } else {
      res.status(401).json("Invalid Username");
    }

  })

  } else {
    res.status(400).json("Bad Request: Missing Arguments");
  }
}

app.post('/l', validateCredentials);



