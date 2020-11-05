const express = require('express');
const JWT = require('jsonwebtoken');
const app = express();
app.use(express.json());

const { validateAdmin, validateToken, } = require('./components/auth');
const { addUser, infoUser, validateCredentials, existenceUser, listUsers, putUser, deleteUser } = require('./components/users');
const { addCompany, existenceCompany, listCompanies, putCompany, deleteCompany } = require('./components/companies');
const { listContacts, existenceContact,  addContact, putContact, deleteContact} = require('./components/contacts');
const { listRegions, existenceRegion,  addRegion, listCountriesByRegion, existenceCountry,  addCountry, putCountry, listCitiesByCountry, deleteCountry, existenceCity, addCity, putCity, deleteCity} = require('./components/regions');

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



//USERS
//1.  post user login: token
app.post("/user/login", validateCredentials, (req, res) => {
  try {
    const { jwtToken } = req;
    const loginResponse = { token: jwtToken };
    res.status(200).json(loginResponse);
  } catch (err) {
    res.status(500).json("Internal Server Error");
  }
});

//2. post New user
app.post("/user", validateToken, validateAdmin, existenceUser, addUser, (req, res) => {
  try {
    const { createdUserId } = req;
    res.status(200).json(`Created userId: ${createdUserId}` );
  } catch (err) {
    res.status(500).json("Internal Server Error");
  }
});

//3. get info of user
app.get("/user", validateToken, infoUser, (req, res) => {
  try {
    const { user } = req;
    res.status(200).json(user);
  } catch (err) {
    res.status(404).json("Not Found");
  }
});

//4. get users
app.get("/users", validateToken, validateAdmin, listUsers, (req, res) => {
  try {
    const { usersList } = req;
    res.status(200).json(usersList);
  } catch (err) {
    res.status(404).json("Not Found");
  }
});

//5. update user
app.put('/user/:value', validateToken,  putUser, (req, res) => {
  try {
    const { updatedUser } = req;
    res.status(200).json('Created');
  } catch (err) {
    res.status(500).json("Internal Server Error");
  }
})

//6. delete user
app.delete('/user/:value', validateToken,  deleteUser,  (req,res)=>{
  try{
    const { isDeleted } = req;
    isDeleted && res.status(200).json("Deleted");
  }catch (err) {
    res.status(500).json("Internal Server Error");
  }
}); 



//COMPANIES

//1. get companies
app.get("/companies", validateToken, listCompanies, (req, res) => {
  try {
    const { companiesList } = req;
    res.status(200).json(companiesList);
  } catch (err) {
    res.status(404).json("Not Found");
  }
});

//2 post company
app.post("/company", validateToken, existenceCompany,  addCompany, (req, res) => {
  try {
    const { createdCompanyId } = req;
    res.status(200).json({ companyId: createdCompanyId });
  } catch (err) {
    res.status(500).json("Internal Server Error");
  }
});

//3. update company
app.put('/company/:value', validateToken,  putCompany, (req, res) => {
  try {
    const { updatedCompany } = req;
    res.status(200).json(updatedCompany);
  } catch (err) {
    res.status(500).json("Internal Server Error");
  }
})

//4. delete company
app.delete('/company/:value', validateToken,  deleteCompany,  (req,res)=>{
  try{
    const { isDeleted } = req;
    isDeleted && res.status(200).json("Deleted");
  }catch (err) {
    res.status(500).json("Internal Server Error");
  }
}); 

//CONTACTS

//1. get contacts
app.get("/contacts", validateToken, listContacts, (req, res) => {
  try {
    const { contactsList } = req;
    res.status(200).json(contactsList);
  } catch (err) {
    res.status(404).json("Not Found");
  }
});

//2 post contact
app.post("/contact", validateToken, existenceContact,  addContact, (req, res) => {
  try {
    const { createdContactId } = req;
    res.status(200).json({ contactId: createdContactId });
  } catch (err) {
    res.status(500).json("Internal Server Error");
  }
});

//3. update contact
app.put('/contact/:value', validateToken,  putContact, (req, res) => {
  try {
    const { updatedContact} = req;
    res.status(200).json(updatedContact);
  } catch (err) {
    res.status(500).json("Internal Server Error");
  }
})

//4. delete contact
app.delete('/contact/:value', validateToken,  deleteContact,  (req,res)=>{
  try{
    const { isDeleted } = req;
    isDeleted && res.status(200).json("Deleted");
  }catch (err) {
    res.status(500).json("Internal Server Error");
  }
}); 



//REGIONS

//1. get regions
app.get("/regions", validateToken, listRegions, (req, res) => {
  try {
    const { regionsList } = req;
    res.status(200).json(regionsList);
  } catch (err) {
    res.status(404).json("Not Found");
  }
});

//2 post company
app.post("/region", validateToken, existenceRegion,  addRegion, (req, res) => {
  try {
    const { createdRegionId } = req;
    res.status(200).json("Created");
  } catch (err) {
    res.status(500).json("Internal Server Error");
  }
});

//COUNTRIES

//1. get countries
app.get("/countries/:region_id", validateToken, listCountriesByRegion, (req, res) => {
  try {
    const { countriesList } = req;
    res.status(200).json(countriesList);
  } catch (err) {
    res.status(404).json("Not Found");
  }
});

//2 post country
app.post("/country/:region_id", validateToken, existenceCountry,  addCountry, (req, res) => {
  try {
    const { createdCountryId } = req;
    res.status(200).json("Created");
  } catch (err) {
    res.status(500).json("Internal Server Error");
  }
});
//3. update country
app.put("/country/:country_id", validateToken,  putCountry, (req, res) => {
  try {
    const { updatedCountry } = req;
    res.status(200).json('Created');
  } catch (err) {
    res.status(500).json("Internal Server Error");
  }
})
//4. delete country
app.delete('/country/:country_id', validateToken,  deleteCountry,  (req,res)=>{
  try{
    const { isDeleted } = req;
    isDeleted && res.status(200).json("Deleted");
  }catch (err) {
    res.status(500).json("Internal Server Error");
  }
}); 

//CITIES

//1. get cities
app.get("/cities/:country_id", validateToken, listCitiesByCountry, (req, res) => {
  try {
    const { citiesList } = req;
    res.status(200).json(citiesList);
  } catch (err) {
    res.status(404).json("Not Found");
  }
});

//2 post city
app.post("/city/:country_id", validateToken, existenceCity,  addCity, (req, res) => {
  try {
    const { createdCityId } = req;
    res.status(200).json("Created");
  } catch (err) {
    res.status(500).json("Internal Server Error");
  }
});

//3. update city
app.put("/city/:city_id", validateToken,  putCity, (req, res) => {
  try {
    const { updatedCity } = req;
    res.status(200).json('Created');
  } catch (err) {
    res.status(500).json("Internal Server Error");
  }
})

//4. delete city
app.delete('/city/:city_id', validateToken,  deleteCity,  (req,res)=>{
  try{
    const { isDeleted } = req;
    isDeleted && res.status(200).json("Deleted");
  }catch (err) {
    res.status(500).json("Internal Server Error");
  }
}); 