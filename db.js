const mongoose = require('mongoose');

mongoURI = "mongodb://localhost:27017/ZingyExpenseTracker?readPreference=primary&appname=MongoDB%20Compass&directConnection=true&ssl=false";

const connectToMongo = () => {
    mongoose.connect(mongoURI, () => {
        console.log("Connected to mongodb");
    })
}

module.exports = connectToMongo;