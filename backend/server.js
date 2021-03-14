const { mongoose } = require("./db/mongoose");
mongoose.set('useFindAndModify', false);

const { Publication } = require("./models/publication.js");

mongoose.connection.once('open', () => {
    console.log('connected to database');
});


const express = require("express");
const { graphqlHTTP } = require('express-graphql');
const schema = require('./schema/schema')

const app = express();

app.use('/graphql', graphqlHTTP({
    //directing express-graphql to use this schema to map out the graph 
    schema,
    //directing express-graphql to use graphiql when goto '/graphql' address in the browser
    //which provides an interface to make GraphQl queries
    graphiql:true
}));

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Listening on port ${port}...`);
});