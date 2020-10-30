const mongoose = require("../config");

const User = mongoose.model('User', { 
    name: String,
    lastname: String,
    email: String,
    username: String,
    password: String,
    repass: String,
    isAdmin: Boolean
 });

const user1 = new User({ 
    name: 'Laura',
    lastname: 'Escobar',
    email: 'lauraescobar@hotmail.com',
    username: 'laurae',
    password: '1234',
    repass: '1234',
    isAdmin: "1"
 });
 const user2 = new User({ 
    name: 'Luis',
    lastname: 'Sanchez',
    email: 'lsanchez@hotmail.com',
    username: 'luis',
    password: '1234',
    repass: '1234',
    isAdmin: "0"
});

 /* user1.save().then(() => console.log('user1'));
user2.save().then(() => console.log('user2')); 
 User.find({username: 'laurae'}).then((result)=> console.log(result))   */  

module.exports = User;


 



