const mongoose = require('mongoose');
const config = require('config');

const db = config.get('mongoUri');
const connectDB = async ()=>{
    try {
        await mongoose.connect(db,{
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        console.log('Mongo Db Atlas connected successfully');
    } catch (error) {
        console.log(error.message);
    }
}

module.exports = connectDB;
