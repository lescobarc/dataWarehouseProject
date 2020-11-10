const { sequelize } = require("../database/sequelize/config");
const { JWT, signature } = require("./auth");
const { deleteQuery, insertQuery, joinQuery, selectQuery, updateQuery, useQuery } = require("../database/sequelize/commons");


//1. get contacts
async function listContacts(req, res, next) {
  const query = `SELECT contacts.contact_id, contacts.name, contacts.lastname, contacts.email, regions.nameRegion, countries.nameCountry, cities.nameCity, companies.nameCompany, contacts.position,  contacts.interest FROM contacts INNER JOIN regions ON contacts.region_id = regions.region_id INNER JOIN countries ON contacts.country_id= countries.country_id INNER JOIN cities ON contacts.city_id = cities.city_id INNER JOIN companies ON contacts.company_id = companies.company_id `
  const [contacts] = await sequelize.query(query, { raw: true });
  req.contactsList = [contacts];
  next();
}

//2. post contact
async function existenceContact(req, res, next) {
  const { email } = req.body;
  console.log(req.body)
  const dbContacts = await findContactName(email);
  if (!dbContacts) {
    next();
  } else {
    res.status(405).json("Contact Email exist");
  }
}

async function findContactName(email) {
  const query = selectQuery("contacts", "name, lastname, email, region_id, country_id, city_id, company_id, position,  interest", `email = '${email}'`);
  const [dbContacts] = await sequelize.query(query, { raw: true });
  const foundContact = dbContacts[0];
  return foundContact;
}



async function addContact(req, res, next) {
  const { name, lastname, email, region_id, country_id, city_id, company_id, position, interest, channel_id2, account2, preferences2 } = req.body;

  if (name && lastname && email && region_id && country_id && city_id && company_id && position && interest) {
    const query = insertQuery("contacts", "name, lastname, email, region_id, country_id, city_id, company_id, position,  interest",
    [name, lastname, email, region_id, country_id, city_id, company_id, position, interest]);
    [contactId] = await sequelize.query(query, { raw: true });
    let contact_id = [contactId];
    console.log(contactId);
    console.log(contact_id)

    const { channel_id, account, preferences } = req.body;
    if (contact_id & channel_id && account && preferences) {
      const query = insertQuery("contacts_channels", "contact_id, channel_id, account, preferences",
      [contact_id, channel_id, account, preferences]);
      [contact_channel_id] = await sequelize.query(query, { raw: true });
      req.createdContactId = contactId;
      
    } 

    if (contact_id & channel_id2 && account2 && preferences2) {
      const query = insertQuery("contacts_channels", "contact_id, channel_id, account, preferences",
      [contact_id2, channel_id2, account2, preferences2]);
      [contact_channel_id] = await sequelize.query(query, { raw: true });
      
    } else {
      req.createdContactId = contactId;
      next();
    }

    req.createdContactId = contactId;
    next();
  }else {
    res.status(400).json("Bad Request: Missing Arguments");
  }
}



//3. Update contact
async function putContact(req, res, next) {
  const { name, email, region_id, country_id, city_id, company_id, position, channel, interest } = req.body;

  let id = req.params.value;
  console.log(id)

  if (id) {
    const contactToUpdate = await findContactById(id);
    console.log(contactToUpdate)
    if (name !== "" && email !== "" && region_id !== "" && country_id !== "" && city_id !== "" && company_id !== "" && position !== "" && channel !== "" && interest !== "") {
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

//CHANNELS

//1. get channels
async function listChannels(req, res, next) {
  const query = selectQuery("channels", "*");
  const [channels] = await sequelize.query(query, { raw: true });
  req.channelsList = channels;
  next();
}

module.exports = { listContacts, existenceContact, addContact, putContact, deleteContact, listChannels };