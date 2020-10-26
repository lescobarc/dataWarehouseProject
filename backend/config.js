const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/datawarehouse', {useNewUrlParser: true, useUnifiedTopology: true});

module.exports = mongoose;