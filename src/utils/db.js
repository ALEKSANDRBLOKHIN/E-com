const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

console.log("NODE_ENV:", process.env.NODE_ENV);
console.log("DB_CONNECTION:", process.env.DB_CONNECTION);

const isProduction = process.env.NODE_ENV === "production";
const mongoConnection = isProduction ? process.env.DB_CONNECTION : process.env.LOCAL_DB_CONNECTION;

console.log(" Using database:", mongoConnection); // Проверка

mongoose.set("strictQuery", true);

const connectDB = async () => {
    try {
        await mongoose.connect(mongoConnection, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log(" Connected to MongoDB");
    } catch (error) {
        console.error(" Connection failed!", error);
        process.exit(1);
    }
};

module.exports = connectDB;
