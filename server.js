const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express')
const dotEnv = require('dotenv');
const cors = require('cors');
const app = express();
dotEnv.config();

const { tasks, users } = require('./constants')



const typeDefs = gql`
    type Query {
        greetings: String
        tasks: [Task]
        task(id: ID!): Task
        users: [User!]
        user(id: ID!): User
    }

    type User {
        id: ID!
        name: String!
        email: String!
        tasks: [Task!]
    }

    type Task {
        id: ID!
        name: String!
        completed: Boolean!
        user: User!
    }
`
const resolvers = {
    Query: {
        greetings: () => "Hello",
        tasks: () => tasks,
        task: (parent, args) => tasks.find(task => task.id === args.id),
        users: () => users,
        user: (parent, args) => users.find(user => user.id === args.id)
    },
    Task: {
        user: (parent) => users.find(user => user.id === parent.userId)
    },
    User: {
        tasks: (parent) => tasks.filter(task => task.userId === parent.id)
    }
};

async function startApolloServer (typeDefs, resolvers) {
    const apolloServer = new ApolloServer({
        typeDefs,
        resolvers
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





