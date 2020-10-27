const mongoose = require("../config");


const Contact = mongoose.model('Contact', {
    firstname: String,
    lastname: String,
    email: String,
    company: String,
    region: String,
    country: String,
    city: String,
    address: String,
    interest: String,
    contactChannel: String,
    userAcount: String,
    preferences: String,
    channel: String
})

const contact1 = new Contact({ 
    firstname: 'Vera',
    lastname: 'Sk',
    email: 'andrep@hotmail.com',
    company: 'String',
    region: 'Sur América',
    country: 'Colombia',
    city: 'Medellín',
    address: 'Cll 67 #45-89',
    interest: 'String',
    contactChannel: 'String',
    userAcount:'String',
    preferences: 'String',
    channel: 'String'
 });
/* 
  contact1.save().then(() => console.log('contact1')); */
 
 module.exports = Contact;