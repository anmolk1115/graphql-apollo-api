const { gql } = require("apollo-server-express");


module.exports = gql`
    extend type Query {
        users: [User!]
        user(id: ID!): User
    }

    extend type Mutation {
        signup(input: inputSignup): User
        login(input: inputLogin): Token
    }

    input inputLogin {
        email: String!
        password: String!
    }

    type Token {
        token: String!
    }

    input inputSignup {
        name: String!
        email: String!
        password: String!
    }

    type User {
        id: ID!
        name: String!
        email: String!
        password: String!
        tasks: [Task!]
        createdAt: Date!
        updatedAt: Date!
    }

`