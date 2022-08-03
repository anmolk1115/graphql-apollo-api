const bcrypt = require('bcryptjs');

const { tasks, users } = require('../constants');
const User = require('../database/models/user');

module.exports = {
    Query: {
        greetings: () => "Hello",
        users: () => users,
        user: (parent, args) => users.find(user => user.id === args.id)
    },
    Mutation: {
        signup: async(parent, { input }, context, info) => {
            const { email, password } = input;
            try {
                const user = await User.findOne({email})
                if(user) {
                    throw new Error('User already exists');
                }
                const hashedPassword = await bcrypt.hash(password, 12);
                const newUser = new User({...input, password: hashedPassword});
                const result = await newUser.save();
                return result;
            } catch(e) {
                console.log('Error =>', e);
                throw e;
            }
        }
    },
    User: {
        tasks: (parent) => tasks.filter(task => task.userId === parent.id)
    }
}