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

//USERS

//1. Login User
async function validateCredentials(req, res) {
  let username = req.body.username;
  console.log(username)
  let password = req.body.password;
  if (username) {
    const registeredUser = await User.findOne({ username }).then((result) => {
      if (password === result.password) {
        const token = JWT.sign({ username }, signature, { expiresIn: "120m" });
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

function index(req,res){
  User.find({})
      .then(users => {
          if(users.length) return res.status(200).send({users});
          return res.status(204).send({message: 'NO CONTENT'});
      }).catch(error => res.status(500).send({error}));
}

app.get('/users', validateToken, index);

//3. get user info 

function find(req,res,next){
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

function show(req,res){
  if(req.body.error) return res.status(500).send({error});
  if(!req.body.user) return res.status(404).send({message: 'NOT FOUND'});
  let user = req.body.user;
  return res.status(200).send({user});
}

app.get('/userInfo', find, show) 

//4. post user
function create(req,res){
  new User(req.body).save().then(user => res.status(201).send({user})).catch(error => res.status(500).send({error}));
}

app.post('/newUser', create);

//5. update user

function update(req,res){
  if(req.body.error) return res.status(500).send({error});
  if(!req.body.user) return res.status(404).send({message: 'NOT FOUND'});
  let user = req.body.user[0];
  user = Object.assign(user,req.body);
  user.save().then(user => res.status(200).send({ user})).catch(error => res.status(500).send({error}));
}

app.put('/updateUser', find, update);

//6. delete user

function remove(req,res){
  if(req.body.error) return res.status(500).send({error});
  if(!req.body.user) return res.status(404).send({message: 'NOT FOUND'});
  req.body.user[0].remove().then(user => res.status(200).send({message: 'REMOVED', user})).catch(error => res.status(500).send({error}));
}

app.delete('/deleteUser', find, remove);














