const uuid = require('uuid');

const { tasks, users } = require('../constants')

module.exports = {
    Query: {
        greetings: () => "Hello",
        tasks: () => tasks,
        task: (parent, args) => tasks.find(task => task.id === args.id),
    },
    Mutation: {
        createTask: (parent, args) => {
            let { input } = args;
            let task = {...input, id: uuid.v4()}
            tasks.push(task);
            return task;
        }
    },
    Task: {
        user: (parent) => users.find(user => user.id === parent.userId)
    }
}