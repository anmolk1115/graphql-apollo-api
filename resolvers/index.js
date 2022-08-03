const { GraphQLDateTime } = require('graphql-iso-date');

const taskResolver = require('./task');
const userResolver = require('./user');

const customDataScalarResolver = {
    Date: GraphQLDateTime
}

module.exports = [
    taskResolver,
    userResolver,
    customDataScalarResolver
]