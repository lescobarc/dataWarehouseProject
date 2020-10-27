const express = require('express');
const JWT = require('jsonwebtoken');
const app = express();
app.use(express.json());
const User = require('./models/users.js')
const signature = 'dwfs'


app.listen(3000, () => {
  console.log("Server running on port 3000");
});

//AUTH

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
  if(payload.isAdmin === true){
    console.log('Authorized: Admin');
    next();
}else{
    res.status(403).json('Forbidden: No Permission To Access')
}
}

//USERS

//1. Login User
async function validateCredentials(req, res) {
  let username = req.body.username;
  console.log(username)
  let password = req.body.password;
  if (username) {
    const registeredUser = await User.findOne({ username }).then((result) => {
      let isAdmin = result.isAdmin;
      console.log(isAdmin)
      if (password === result.password) {
        const token = JWT.sign({ username, isAdmin}, signature, { expiresIn: "120m" });
        req.jwtToken = token;
        console.log(JWT.verify(token, signature));
        const { jwtToken } = req;
        res.status(200).json({ token: jwtToken });
      } else {
        res.status(401).json("Invalid Username");
      }
    })

  } else {
    res.status(400).json("Bad Request: Missing Arguments");
  }
}

app.post('/loginUser', validateCredentials);

//2.  get users

function indexUser(req,res){
  User.find({})
      .then(users => {
          if(users.length) return res.status(200).send({users});
          return res.status(204).send({message: 'NO CONTENT'});
      }).catch(error => res.status(500).send({error}));
}

app.get('/users', validateToken, indexUser);

//3. get user info 

function findUser(req,res,next){
  const token = req.headers.authorization.split(' ')[1];
  const payload = JWT.decode(token);
  const username =payload.username;
  User.find( {username} ).then(user => {
    if(!user.length) return next();
    req.body.user = user;
    return next();
}).catch(error =>{
    console.log(error)
    next();
})
}

function showUser(req,res){
  if(req.body.error) return res.status(500).send({error});
  if(!req.body.user) return res.status(404).send({message: 'NOT FOUND'});
  let user = req.body.user;
  return res.status(200).send({user});
}

app.get('/userInfo', findUser, showUser) 

//4. post user
function createUser(req,res){
  new User(req.body).save().then(user => res.status(201).send({user})).catch(error => res.status(500).send({error}));
}

app.post('/newUser', validateAdmin, createUser);

//5. update user

function updateUser(req,res){
  if(req.body.error) return res.status(500).send({error});
  if(!req.body.user) return res.status(404).send({message: 'NOT FOUND'});
  let user = req.body.user[0];
  user = Object.assign(user,req.body);
  user.save().then(user => res.status(200).send({message: 'UPDATED', user})).catch(error => res.status(500).send({error}));
}

app.put('/updateUser',  findUser, updateUser);

//6. delete user

function removeUser(req,res){
  if(req.body.error) return res.status(500).send({error});
  if(!req.body.user) return res.status(404).send({message: 'NOT FOUND'});
  req.body.user[0].remove().then(user => res.status(200).send({message: 'REMOVED', user})).catch(error => res.status(500).send({error}));
}

app.delete('/deleteUser', findUser, removeUser);














