const mongoose = require("../config");

const company = mongoose.model('company', {
    name: String,
    address: String,
    email: String,
    telephone: Number,
    region: String,
    country: String,
    city: String
});

const company1 = new company({
    name: 'String',
    address: 'String',
    email: 'String',
    telephone: '000',
    region: 'String',
    country: 'String',
    city: 'String'
});

company1.save().then(()=>{console.log(company1)});