const { sequelize } = require("../database/sequelize/config");
const { JWT, signature } = require("./auth");
const { deleteQuery, insertQuery, joinQuery, selectQuery, updateQuery, useQuery } = require("../database/sequelize/commons");
const { default: contentSecurityPolicy } = require("helmet/dist/middlewares/content-security-policy");


//1. get contacts
async function listContacts(req, res, next) {
  const query = `SELECT contacts.contact_id, contacts.name, contacts.lastname, contacts.email, contacts.address, regions.nameRegion, countries.nameCountry, cities.nameCity, companies.nameCompany, contacts.position,  contacts.interest FROM contacts INNER JOIN regions ON contacts.region_id = regions.region_id INNER JOIN countries ON contacts.country_id= countries.country_id INNER JOIN cities ON contacts.city_id = cities.city_id INNER JOIN companies ON contacts.company_id = companies.company_id `
  const [contacts] = await sequelize.query(query, { raw: true });
  req.contactsList = [contacts];
  next();
}

//2. post contact
async function existenceContact(req, res, next) {
  const { email } = req.body;
  const dbContacts = await findContactName(email);
  if (!dbContacts) {
    next();
  } else {
    res.status(405).json("Email Contact exist");
  }
}

async function findContactName(email) {
  const query = selectQuery("contacts", "name, lastname, email, address, region_id, country_id, city_id, company_id, position,  interest", `email = '${email}'`);
  const [dbContacts] = await sequelize.query(query, { raw: true });
  const foundContact = dbContacts[0];
  return foundContact;
}



async function addContact(req, res, next) {
  const { name, lastname, email, address, region_id, country_id, city_id, company_id, position, interest, channel1, account1, preferences1, channel2, account2, preferences2 } = req.body;
  if (name && lastname && position && email && address && company_id) {
    const query = insertQuery("contacts", "name, lastname, email, address, region_id, country_id, city_id, company_id, position,  interest",
      [name, lastname, email, address, region_id, country_id, city_id, company_id, position, interest]);
    [contactId] = await sequelize.query(query, { raw: true });
    let contact_id = [contactId];
    if (account1 !== '') {
      const query2 = insertQuery("contacts_channels", "contact_id, channel_id, account, preferences", [contact_id, channel1, account1, preferences1]);
      [channelId1] = await sequelize.query(query2, { raw: true });
    }
    if (account2 !== '') {
      const query3 = insertQuery("contacts_channels", "contact_id, channel_id, account, preferences", [contact_id, channel2, account2, preferences2]);
      [channelId2] = await sequelize.query(query3, { raw: true });
    }
    req.createdContactId = contactId;
    next();
  } else {
    res.status(400).json("Bad Request: Missing Arguments");
  }
}


// get info of contact
async function infoContact(req, res, next) {
  let id = req.params.value;
 const query = `SELECT contacts.contact_id, contacts.name, contacts.lastname, contacts.email, contacts.address, contacts.company_id, contacts.region_id, contacts.country_id, contacts.city_id,  regions.nameRegion, countries.nameCountry, cities.nameCity, companies.nameCompany, contacts.position,  contacts.interest FROM contacts INNER JOIN regions ON contacts.region_id = regions.region_id INNER JOIN countries ON contacts.country_id= countries.country_id INNER JOIN cities ON contacts.city_id = cities.city_id INNER JOIN companies ON contacts.company_id = companies.company_id where contacts.contact_id =${id} `
  const [dbContact] = await sequelize.query(query, { raw: true });
  const foundContact = dbContact[0];
  req.contact = foundContact;
  next();
}

// get info channels of contact
async function infoContactChannel(req, res, next) {
  let id = req.params.value;
 const query = `SELECT contacts_channels.channel_id, contacts_channels.account, contacts_channels.preferences, channels.nameChannel FROM contacts_channels INNER JOIN channels ON contacts_channels.channel_id = channels.channel_id WHERE contacts_channels.contact_id =${id} `
  const [dbChannels] = await sequelize.query(query, { raw: true });
  const foundChannels = dbChannels;
  req.channelsContact = foundChannels;
  next();
}

//3. Update contact

async function putContact(req, res, next) {
  const { name, lastname, email, address, region_id, country_id, city_id, company_id, position, interest, channel1, account1, preferences1, channel2, account2, preferences2 } = req.body;
  let id = req.params.value;
  if (id) {
    const contactToUpdate = await findContactById(id);
    const contactChannelToUpdate = await findContact_channel_idByContact_id(id);
    const contactChannelToUpdate1 = contactChannelToUpdate[0];
    const contactChannelToUpdate2 = contactChannelToUpdate[1];
    const query = updateQuery("contacts", `name = '${name}', lastname = '${lastname}',  email= '${email}',  address= '${address}', region_id = '${region_id}', country_id = '${country_id}', city_id = '${city_id}', company_id = '${company_id}', position = '${position}',  interest = '${interest}'`, `contact_id = '${id}'`);
    const [contactPut] = await sequelize.query(query, { raw: true });
 
    if (contactChannelToUpdate1 !== undefined && !isNaN(channel1) && account1 !== " ") {
      const query2 = updateQuery("contacts_channels", `channel_id = '${channel1}', account = '${account1}',  preferences= '${preferences1}'`, `contact_channel_id = '${contactChannelToUpdate1.contact_channel_id}' `);
      const [contactChannel1] = await sequelize.query(query2, { raw: true });
    }else if(account1 !== '' && channel1 !== NaN ){
      const query2 = insertQuery("contacts_channels", "contact_id, channel_id, account, preferences", [id, channel1, account1, preferences1]);
      [channelId1] = await sequelize.query(query2, { raw: true });
    }
    if (contactChannelToUpdate2 !== undefined && !isNaN(channel2)  && account2 !== " ") {
      const query3 = updateQuery("contacts_channels", `channel_id = '${channel2}', account = '${account2}',  preferences= '${preferences2}'`, `contact_channel_id = '${contactChannelToUpdate2.contact_channel_id}' `);
      const [contactChannel2] = await sequelize.query(query3, { raw: true });
    }else if(account2 !== '' && channel2 !== NaN ){
      const query3 = insertQuery("contacts_channels", "contact_id, channel_id, account, preferences", [id, channel2, account2, preferences2]);
      [channelId2] = await sequelize.query(query3, { raw: true });
    }
    req.updatedContact = { name, lastname, email, address, region_id, country_id, city_id, company_id, position, interest };
    next();
  } else {
    res.status(404).json("Contact Not Found");
  }
}

async function findContactById(id) {
  const query = selectQuery("contacts", "*", `contact_id = '${id}'`);
  const [dbContacts] = await sequelize.query(query, { raw: true });
  const foundContact = dbContacts[0];
  return foundContact;
}

async function findContact_channel_idByContact_id(id) {
  const query = selectQuery("contacts_channels", "*", `contact_id = '${id}'`);
  const [dbContacts] = await sequelize.query(query, { raw: true });
  const foundContactChannel1 = dbContacts[0];
  const foundContactChannel2 = dbContacts[1];
  return dbContacts;
}


//6.delete contact
async function deleteContact(req, res, next) {
  let id = req.params.contact_id;
  const findContact = await findContactById(id);
  if (findContact) {
    const query = deleteQuery("contacts", `contact_id = ${id}`);
    await sequelize.query(query, { raw: true });
    req.isDeleted = true;
    next();
  } else {
    res.status(404).json("Contact Not Found");
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




module.exports = { listContacts, existenceContact, infoContact, addContact, putContact, deleteContact, listChannels, infoContactChannel };