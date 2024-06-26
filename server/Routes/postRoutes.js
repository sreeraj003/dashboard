const express = require("express")
const postRoute = express()
const postController = require("../controller/postController")

postRoute.get("/count", postController.getCount)
postRoute.get("/getPestle", postController.getPestle)
postRoute.get("/reg-country", postController.getcountry)
postRoute.get("/getdate", postController.getdata)
postRoute.get("/sectors", postController.sectors)
postRoute.get("/postData", postController.postData)
postRoute.get("/filterField", postController.filterField)

module.exports = postRoute