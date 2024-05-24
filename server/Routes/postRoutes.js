const express = require("express")
const postRoute = express()
const postController = require("../controller/postController")

postRoute.get("/count", postController.getCount)
postRoute.get("/getPestle", postController.getPestle)
postRoute.get("/reg-country", postController.getcountry)
postRoute.get("/getdate", postController.getdata)

module.exports = postRoute