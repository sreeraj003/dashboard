require("dotenv").config()
const mongoose = require("mongoose")

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        console.log("db connected");
    } catch (error) {
        console.log("Monogdb connection error :", error);
        process.exit(1)
    }
}



module.exports = connectDB
