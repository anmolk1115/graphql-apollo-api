const express = require('express');
const { ApolloServer } = require('apollo-server-express')
const dotEnv = require('dotenv');
const cors = require('cors');
const app = express();
dotEnv.config();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use('/', (req, res, next) => {
    res.send({greeting: 'Hi, express here'});
})

app.listen(PORT, () => {
    console.log('Listening at port '+PORT);
})

