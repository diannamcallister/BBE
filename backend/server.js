const { mongoose } = require("./db/mongoose");
mongoose.set('useFindAndModify', false);

const { Publication } = require("./models/publication.js");


const express = require("express");
const app = express();

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Listening on port ${port}...`);
});