const { sequelize } = require("../database/sequelize/config");
const { JWT, signature } = require("./auth");
const { deleteQuery, insertQuery, joinQuery, selectQuery, updateQuery, useQuery } = require("../database/sequelize/commons");


//1. get contacts
async function listContacts(req, res, next) {
  const query = `SELECT contacts.contact_id, contacts.name, contacts.email, regions.nameRegion, countries.nameCountry, cities.nameCity, companies.nameCompany, contacts.position, contacts.channel, contacts.interest FROM contacts INNER JOIN regions ON contacts.region_id = regions.region_id INNER JOIN countries ON contacts.country_id= countries.country_id INNER JOIN cities ON contacts.city_id = cities.city_id INNER JOIN companies ON contacts.company_id = companies.company_id `
  const [contacts] = await sequelize.query(query, { raw: true });
  req.contactsList = [contacts];
  next();
}

 //2. post contact
async function existenceContact(req, res, next) {
    const { name } = req.body;
    console.log(req.body)
    const dbContacts = await findContactName(name);
    if (!dbContacts) {
      next();
    } else {
      res.status(405).json("Contact exist");
    }
  }
  
  async function findContactName(name) {
    const query = selectQuery("contacts", "name, email, region_id, country_id, city_id, company_id, position, channel, interest", `name = '${name}'`);
    const [dbContacts] = await sequelize.query(query, { raw: true });
    const foundContact = dbContacts[0];
    return foundContact;
  }

 
  
  async function addContact(req, res, next) {
 const { name,  email, region_id, country_id, city_id, company_id, position, channel, interest  } = req.body;  
    if (name  && email  && region_id && country_id && city_id && company_id && position && channel && interest ) {
      const query = insertQuery("contacts", "name, email, region_id, country_id, city_id, company_id, position, channel, interest",
        [name, email, region_id, country_id, city_id, company_id, position, channel, interest]);
      [contactId] = await sequelize.query(query, { raw: true });
      req.createdContactId = contactId;
      next();
    } else {
      res.status(400).json("Bad Request: Missing Arguments");
    }
  }

  
//3. Update contact
async function putContact(req, res, next) {
  const {name,  email, region_id, country_id, city_id, company_id, position, channel, interest} = req.body;

  let id = req.params.value;
  console.log(id)
 
  if (id) {
      const contactToUpdate = await findContactById(id);
      console.log(contactToUpdate)
      if( name !== "" && email !== "" && region_id !== "" && country_id !== "" && city_id !== "" && company_id !== "" && position !== "" && channel !== "" && interest !== "" ) {
        const query = updateQuery("contacts", `name = '${name}', email = '${email}',  region_id= '${region_id}', country_id = '${country_id}', city_id = '${city_id}', company_id = '${company_id}', position = '${position}', channel = '${channel}', interest = '${interest}'`, `contact_id = '${id}'`);
        console.log(name)
        const [contactPut] = await sequelize.query(query, { raw: true });
        console.log(contactPut)
        req.updatedContact = { name, email, region_id, country_id, city_id, company_id, position, channel, interest };
      } else {
        res.status(400).json("Bad Request: Missing Arguments");
      }
      next();
    } else {
      res.status(404).json("User Not Found");
    }
  } 

  async function findContactById(id) {
    const query = selectQuery("contacts", "*", `contact_id = '${id}'`);
    const [dbContacts] = await sequelize.query(query, { raw: true });
    const foundContact = dbContacts[0];
    console.log(foundContact)
    return foundContact;
  }

  
//4. delete company
  async function deleteContact(req, res, next) {
    let id = req.params.value;
    console.log(id)
    const findContact = await findContactById(id);
    if (findContact) {
      const query = deleteQuery("contacts", `contact_id = ${id}`);
      await sequelize.query(query, { raw: true });
      req.isDeleted = true;
      next();
    } else {
      res.status(404).json("User Not Found");
    }
  } 

module.exports = {  listContacts, existenceContact,  addContact, putContact, deleteContact};