const { mongoose } = require("./config");

const users = mongoose.model('users', {
    name: String,
    lastname: String,
    email: String,
    profile: String,
    password: String
} );

const companies = mongoose.model('companies', {
    name: String,
    address: String,
    email: String,
    telephone: Number,
    region: String,
    country: String,
    city: String
})

const contacts = mongoose.model('contacts', {
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