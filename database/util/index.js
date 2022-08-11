const mongoose = require("mongoose");
// const DB = "mongodb+srv://anmol:anmol@cluster0.9tnvuxp.mongodb.net/?retryWrites=true&w=majority";
const DB = "mongodb://anmol:anmol@ac-ovmzozi-shard-00-00.9tnvuxp.mongodb.net:27017,ac-ovmzozi-shard-00-01.9tnvuxp.mongodb.net:27017,ac-ovmzozi-shard-00-02.9tnvuxp.mongodb.net:27017/?ssl=true&replicaSet=atlas-ajisz6-shard-0&authSource=admin&retryWrites=true&w=majority";
module.exports.connection = async () => {
    try {
        // await mongoose.connect(process.env.MONGO_DB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
        await mongoose.connect(DB, { useNewUrlParser: true, useUnifiedTopology: true })
        console.log('database connected successfully');
    } catch(err) {
        console.error('Error =>', err);
    }
}