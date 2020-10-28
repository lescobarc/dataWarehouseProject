const express = require('express');
const JWT = require('jsonwebtoken');
const app = express();
app.use(express.json());
const User = require('./models/users.js');
const Company = require('./models/companies');
const Contact = require('./models/contacts');
const signature = 'dwfs'

const helmet = require('helmet');
app.use(helmet.permittedCrossDomainPolicies({permittedPolicies: "by-content-type"}));
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://127.0.0.1:5500");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "PUT");
    next();
});


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

function indexUsers(req,res){
  User.find({})
      .then(users => {
          if(users.length) return res.status(200).send({users});
          return res.status(204).send({message: 'NO CONTENT'});
      }).catch(error => res.status(500).send({error}));
}

app.get('/users', validateToken, indexUsers);

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

app.post('/user', validateAdmin, createUser);

//5. update user

function updateUser(req,res){
  if(req.body.error) return res.status(500).send({error});
  if(!req.body.user) return res.status(404).send({message: 'NOT FOUND'});
  let user = req.body.user[0];
  user = Object.assign(user,req.body);
  user.save().then(user => res.status(200).send({message: 'UPDATED', user})).catch(error => res.status(500).send({error}));
}

app.put('/user',  findUser, updateUser);

//6. delete user

function removeUser(req,res){
  if(req.body.error) return res.status(500).send({error});
  if(!req.body.user) return res.status(404).send({message: 'NOT FOUND'});
  req.body.user[0].remove().then(user => res.status(200).send({message: 'REMOVED', user})).catch(error => res.status(500).send({error}));
}

app.delete('/user', findUser, removeUser);


//COMPANIES

//1 get companies 

function indexCompanies(req,res){
  Company.find({})
      .then(companies => {
          if(companies.length) return res.status(200).send({companies});
          return res.status(204).send({message: 'NO CONTENT'});
      }).catch(error => res.status(500).send({error}));
}

app.get('/companies', validateToken, indexCompanies);

//2. get company info 

function findCompany(req,res,next){
  const company = {};
  company.name = req.params.value;
  console.log(company)
  Company.find( company ).then(company => {
    if(!company.length) return next();
    req.body.company = company;
    return next();
}).catch(error =>{
    console.log(error)
    next();
})
}

function showCompany(req,res){
  if(req.body.error) return res.status(500).send({error});
  if(!req.body.company) return res.status(404).send({message: 'NOT FOUND'});
  let company = req.body.company;
  return res.status(200).send({company});
}

app.get('/companyInfo/:value', findCompany, showCompany) 

//3. post company
function createCompany(req,res){
  new Company(req.body).save().then(company => res.status(201).send({company})).catch(error => res.status(500).send({error}));
}

app.post('/company/', validateToken, createCompany);

//4. Update company

function updateCompany(req,res){
  if(req.body.error) return res.status(500).send({error});
  if(!req.body.company) return res.status(404).send({message: 'NOT FOUND'});
  let company = req.body.company[0];
  company = Object.assign(company,req.body);
  company.save().then(company => res.status(200).send({message: 'UPDATED', company})).catch(error => res.status(500).send({error}));
}

app.put('/company/:value',  findCompany, updateCompany);

//5. Delete company
function removeCompany(req,res){
  if(req.body.error) return res.status(500).send({error});
  if(!req.body.company) return res.status(404).send({message: 'NOT FOUND'});
  req.body.company[0].remove().then(company => res.status(200).send({message: 'REMOVED', company})).catch(error => res.status(500).send({error}));
}

app.delete('/company/:value', findCompany, removeCompany);

//CONTACTS

//1 get contacts

function indexContacts(req,res){
  Contact.find({})
  .then(contacts => {
      if(contacts.length) return res.status(200).send({contacts});
      return res.status(204).send({message: 'NO CONTENT'});
  }).catch(error => res.status(500).send({error}));
}


app.get('/contacts', validateToken, indexContacts);

 //2. get contact info 

function findContact (req,res,next){
  const contact = {};
  contact.firstname = req.params.value;
  console.log(contact)
  Contact.find( contact ).then(contact => {
    if(!contact.length) return next();
    req.body.contact = contact;
    return next();
}).catch(error =>{
    console.log(error)
    next();
})
}

function showContact(req,res){
  if(req.body.error) return res.status(500).send({error});
  if(!req.body.contact) return res.status(404).send({message: 'NOT FOUND'});
  let contact = req.body.contact;
  return res.status(200).send({contact});
}

app.get('/contactInfo/:value', findContact, showContact) 


//3. post contact
function createContact(req,res){
  new Contact(req.body).save().then(contact => res.status(201).send({contact})).catch(error => res.status(500).send({error}));
}

app.post('/contact', validateToken, createContact);


//4. Update contact

function updateContact(req,res){
  if(req.body.error) return res.status(500).send({error});
  if(!req.body.contact) return res.status(404).send({message: 'NOT FOUND'});
  let contact = req.body.contact[0];
  contact = Object.assign(contact,req.body);
  contact.save().then(contact => res.status(200).send({message: 'UPDATED', contact})).catch(error => res.status(500).send({error}));
}

app.put('/contact/:value',  findContact, updateContact);


//5. Delete contact
function removeContact(req,res){
  if(req.body.error) return res.status(500).send({error});
  if(!req.body.contact) return res.status(404).send({message: 'NOT FOUND'});
  req.body.contact[0].remove().then(contact => res.status(200).send({message: 'REMOVED', contact})).catch(error => res.status(500).send({error}));
}

app.delete('/contact/:value', findContact, removeContact);








 

