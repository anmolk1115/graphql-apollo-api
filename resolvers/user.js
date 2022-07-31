const { tasks, users } = require('../constants');

module.exports = {
    Query: {
        greetings: () => "Hello",
        users: () => users,
        user: (parent, args) => users.find(user => user.id === args.id)
    },
    Mutation: {
        
    },
    User: {
        tasks: (parent) => tasks.filter(task => task.userId === parent.id)
    }
}