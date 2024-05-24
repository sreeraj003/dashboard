require("dotenv").config()
const connectDB = require("./config/mongodb")
const cors = require("cors")
connectDB()
const express = require("express")
const postRoute = require("./Routes/postRoutes")
const app = express()
app.use(cors())
app.use(express.urlencoded({ extends: true }))
app.use(express.json())
app.use("/", postRoute)
app.listen(process.env.PORT || 3000, () => console.log("Server running "))