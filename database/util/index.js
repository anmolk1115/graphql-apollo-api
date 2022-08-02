const mongoose = require("mongoose");

module.exports.connection = async () => {
    try {
        await mongoose.connect(process.env.MONGO_DB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
        console.log('database connected successfully');
    } catch(err) {
        console.error('Error =>', err);
    }
}