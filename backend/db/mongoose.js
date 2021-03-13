const mongoose = require('mongoose')

const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/CovidPublications'
console.log(mongoURI);
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true});

module.exports = { mongoose }