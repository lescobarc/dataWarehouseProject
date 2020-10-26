const Sequelize = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(process.env.dbName, process.env.dbUser, process.env.password,
{
    dialect:'mysql',
    host: '127.0.0.1'
});

sequelize.authenticate().then(()=>{
    console.log('Connection Database');
}).catch(err=>{
    console.error(err);
})

module.exports = { sequelize }; 

