const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express')
const dotEnv = require('dotenv');
const cors = require('cors');
const app = express();
const uuid = require('uuid');
dotEnv.config();
const typeDefs = require('./typeDefs/index');
const resolvers = require('./resolvers/index');
const {connection} = require('./database/util/index');
const { verifyUser } = require('./helper/context/index');
connection();

let flag = false;

async function startApolloServer (typeDefs, resolvers) {
    const apolloServer = new ApolloServer({
        typeDefs,
        resolvers,
        // context: (obj) => {
        //     if(!flag) {
        //         flag = true;
        //         console.log('request =>', obj);
        //     } 
        // }
        // context: ({req}) => {
        //     verifyUser(req);
        // }
    })

    await apolloServer.start()

    app.use(cors());
    app.use(express.json());
    
    apolloServer.applyMiddleware({
        app,
        path: '/graphql'
    })
    const PORT = process.env.PORT || 3000;
    
    app.use('/', (req, res, next) => {
        res.send({greeting: 'Hi, express here'});
    });

    await new Promise((req, res) => {
        app.listen(PORT, () => {
            console.log('Listening at port '+PORT);
            console.log(`GraphQL endpoint: ${apolloServer.graphqlPath}`)
        })

    })
}

startApolloServer(typeDefs, resolvers);