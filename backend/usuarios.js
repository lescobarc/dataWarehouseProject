const mongoose = require('./database/mongoose/config');
var cors = require('cors')
const express = require('express');
const app = express();
app.use(cors())
app.use(express.json());

app.listen(3000, function () {
    console.log('listening on 3000')
})
const User = mongoose.model('User', {
    name: String,
    lastname: String,
    email: String,
    username: String,
    password: String
});


app.get('/users', (req, res) => {
    User.find((err, res) => {
        console.log(res)
    })
    res.status(200).json('Usuarios Encontrados')
})