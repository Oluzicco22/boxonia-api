const mongoose = require('mongoose');

module.exports = async () => {
    try{
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('MongoDB Connected!');
    }catch(e){
        throw new Error(`MongoDB connection failed: ${e}`);
    }
}
