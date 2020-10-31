const express = require('express');
const JWT = require('jsonwebtoken');
const app = express();
app.use(express.json());
const User = require('./models/users.js');
const Company = require('./models/companies');
const Contact = require('./models/contacts');
const signature = 'dwfs'

//cors: permite solicitar recursos restringidos
const cors = require('cors');
app.use(cors({ origin: 'http://127.0.0.1:5500' }));
const helmet = require('helmet');
app.use(helmet.permittedCrossDomainPolicies({ permittedPolicies: "by-content-type" }));
app.use(function (req, res, next) {
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
  if (payload.isAdmin === true) {
    console.log('Authorized: Admin');
    next();
  } else {
    res.status(403).json('Forbidden: No Permission To Access')
  }
}

//USERS

//1. Login User
async function validateCredentials(req, res) {
  let username = req.body.username;
  console.log(username)
  let password = req.body.password;
  console.log(password);
  if (username) {
    const registeredUser = await User.findOne({ username }).then((result) => {
      if (result) {
        let isAdmin = result.isAdmin;
        console.log(isAdmin)
        console.log(result.password)
        if (password === result.password) {
          const token = JWT.sign({ username, isAdmin }, signature, { expiresIn: "120m" });
          req.jwtToken = token;
          console.log(JWT.verify(token, signature));
          const { jwtToken } = req;
          res.status(200).json({ token: jwtToken });
        } else {
          res.status(401).json("Invalid Password");
        }
      } else {
        res.status(401).json("Invalid Username");
      }

    })

  } else {
    res.status(400).json("Bad Request: Missing Arguments");
  }
}

app.post('/user/login', validateCredentials);

//2.  get users

function indexUsers(req, res) {
  User.find({})
    .then(users => {
      if (users.length) return res.status(200).send({ users });
      return res.status(204).send({ message: 'NO CONTENT' });
    }).catch(error => res.status(500).send({ error }));
}

app.get('/users', validateToken, indexUsers);

//3. get user info 

function findUserPayload(req, res, next) {
  const token = req.headers.authorization.split(' ')[1];
  const payload = JWT.decode(token);
  const username = payload.username;
  User.find({ username }).then(user => {
    if (!user.length) return next();
    req.body.user = user;
    return next();
  }).catch(error => {
    console.log(error)
    next();
  })
}

function showUser(req, res) {
  if (req.body.error) return res.status(500).send({ error });
  if (!req.body.user) return res.status(404).send({ message: 'NOT FOUND' });
  let user = req.body.user;
  return res.status(200).send({ user });
}

app.get('/userInfo', validateToken, findUserPayload, showUser)

//4. post user
function findUserBodyUsername(req, res, next) {
  if (req.body.name && req.body.lastname && req.body.email && req.body.username && req.body.password && req.body.repass) {
    if (req.body.password == req.body.repass) {
      let username = req.body.username;
      console.log(username)
      User.find({ username }).then(user => {
        console.log(user)
        if (!user.length) {
          return next();
        } else {
          console.log('Username Exist');
          res.status(405).send({ message: 'Username Exist' });
        }
      })
    } else {
      console.log('Verify Password');
      res.status(406).send({ message: 'Verify Password' });
    }
  } else {
    console.log('Missing Arguments');
    res.status(400).send({ message: 'Missing Arguments' });
  }
}

function createUser(req, res) {
  console.log(req.body)
  new User(req.body).save().then(user => res.status(201).send({ message: 'Created' })).catch(error => res.status(500).send({ error }));
}

app.post('/user', validateToken, validateAdmin, findUserBodyUsername, createUser);

//5. update user

function updateUser(req, res, next) {
  console.log(req.body)
  if (req.body.name && req.body.lastname && req.body.email ) {
    

  const identif = {};
  identif._id = req.params.value;
  let id = identif._id;
  console.log(identif)


  User.findOne(identif).then(rest => {
    console.log(rest)
    let user = req.body;
    console.log(user.name)
    rest.name = `${user.name}`;
    rest.lastname = `${user.lastname}`;
    rest.email = `${user.email}`;
    console.log(rest);
    rest.save()
    return res.status(200).send({ message: 'Updated' });
    
  }) .catch(error => {
    return res.status(404).send({ message: 'User Not Found' });
  })
}else {
  console.log('Missing Arguments');
  res.status(400).send({ message: 'Missing Arguments' });
}

}

app.put('/user/:value', validateToken, updateUser);

//6. delete user

function removeUser(req, res) {
  const identif = {};
  identif._id = req.params.value;
  let id = identif._id;
  console.log(identif)
 /*  User.deleteOne(identif).then(function (error, res) {
    console.log('Deleted');
  })
 return res.status(200).send({message: 'DELETED'}) */

 User.deleteOne(identif).then(function(){ 
  console.log("Data deleted"); // Success 
  res.status(200).send({message: 'DELETED'})
}).catch(function(error){ 
  console.log(error); // Failure 
  res.status(401).send({message: 'User Not Found'})
}); 



}


app.delete('/user/:value', validateToken, removeUser);


//COMPANIES

//1 get companies 

function indexCompanies(req, res) {
  Company.find({})
    .then(companies => {
      if (companies.length) return res.status(200).send({ companies });
      return res.status(204).send({ message: 'NO CONTENT' });
    }).catch(error => res.status(500).send({ error }));
}

app.get('/companies', validateToken, indexCompanies);

//2. get company info 

function findCompany(req, res, next) {
  const company = {};
  company.name = req.params.value;
  console.log(company)
  Company.find(company).then(company => {
    if (!company.length) return next();
    req.body.company = company;
    return next();
  }).catch(error => {
    console.log(error)
    next();
  })
}

function showCompany(req, res) {
  if (req.body.error) return res.status(500).send({ error });
  if (!req.body.company) return res.status(404).send({ message: 'NOT FOUND' });
  let company = req.body.company;
  return res.status(200).send({ company });
}

app.get('/companyInfo/:value', findCompany, showCompany)

//3. post company
function createCompany(req, res) {
  new Company(req.body).save().then(company => res.status(201).send({ company })).catch(error => res.status(500).send({ error }));
}

app.post('/company/', validateToken, createCompany);

//4. Update company

function updateCompany(req, res) {
  if (req.body.error) return res.status(500).send({ error });
  if (!req.body.company) return res.status(404).send({ message: 'NOT FOUND' });
  let company = req.body.company[0];
  company = Object.assign(company, req.body);
  company.save().then(company => res.status(200).send({ message: 'UPDATED', company })).catch(error => res.status(500).send({ error }));
}

app.put('/company/:value', findCompany, updateCompany);

//5. Delete company
function removeCompany(req, res) {
  if (req.body.error) return res.status(500).send({ error });
  if (!req.body.company) return res.status(404).send({ message: 'NOT FOUND' });
  req.body.company[0].remove().then(company => res.status(200).send({ message: 'REMOVED', company })).catch(error => res.status(500).send({ error }));
}

app.delete('/company/:value', findCompany, removeCompany);

//CONTACTS

//1 get contacts

function indexContacts(req, res) {
  Contact.find({})
    .then(contacts => {
      if (contacts.length) return res.status(200).send({ contacts });
      return res.status(204).send({ message: 'NO CONTENT' });
    }).catch(error => res.status(500).send({ error }));
}


app.get('/contacts', validateToken, indexContacts);

//2. get contact info 

function findContact(req, res, next) {
  const contact = {};
  contact.firstname = req.params.value;
  console.log(contact)
  Contact.find(contact).then(contact => {
    if (!contact.length) return next();
    req.body.contact = contact;
    return next();
  }).catch(error => {
    console.log(error)
    next();
  })
}

function showContact(req, res) {
  if (req.body.error) return res.status(500).send({ error });
  if (!req.body.contact) return res.status(404).send({ message: 'NOT FOUND' });
  let contact = req.body.contact;
  return res.status(200).send({ contact });
}

app.get('/contactInfo/:value', findContact, showContact)


//3. post contact
function createContact(req, res) {
  new Contact(req.body).save().then(contact => res.status(201).send({ contact })).catch(error => res.status(500).send({ error }));
}

app.post('/contact', validateToken, createContact);


//4. Update contact

function updateContact(req, res) {
  if (req.body.error) return res.status(500).send({ error });
  if (!req.body.contact) return res.status(404).send({ message: 'NOT FOUND' });
  let contact = req.body.contact[0];
  contact = Object.assign(contact, req.body);
  contact.save().then(contact => res.status(200).send({ message: 'UPDATED', contact })).catch(error => res.status(500).send({ error }));
}

app.put('/contact/:value', findContact, updateContact);


//5. Delete contact
function removeContact(req, res) {
  if (req.body.error) return res.status(500).send({ error });
  if (!req.body.contact) return res.status(404).send({ message: 'NOT FOUND' });
  req.body.contact[0].remove().then(contact => res.status(200).send({ message: 'REMOVED', contact })).catch(error => res.status(500).send({ error }));
}

app.delete('/contact/:value', findContact, removeContact);










