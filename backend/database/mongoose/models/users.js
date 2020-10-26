const mongoose = require("../config");

const User = mongoose.model('User', { 
    name: String,
    lastname: String,
    email: String,
    profile: String,
    password: String });

const user1 = new User({ 
    name: 'Laura',
    lastname: 'Escobar',
    email: 'lauraescobar@hotmail.com',
    profile: 'laurae',
    password: '1234'
 });
 const user2 = new User({ 
    name: 'Luis',
    lastname: 'Sanchez',
    email: 'lsanchez@hotmail.com',
    profile: 'luis',
    password: '1234'
});

user1.save().then(() => console.log('user1'));
user2.save().then(() => console.log('user2'));


 



