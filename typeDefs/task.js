const { gql } = require("apollo-server-express");

module.exports = gql`
    extend type Query {
        greetings: String
        tasks: [Task]
        task(id: ID!): Task
    }

    extend type Mutation {
        createTask(input: createTaskInput!): Task
    }

    input createTaskInput {
        name: String!
        completed: Boolean!
        id: ID!
    }

    type Task {
        id: ID!
        name: String!
        completed: Boolean!
        user: User!
    }
`
