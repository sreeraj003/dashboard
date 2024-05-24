const mongoose = require("mongoose")
const fs = require("fs")
async function getCount(req, res) {
    try {
        const result = await mongoose.connection.db.collection("data").aggregate([
            {
                $group: {
                    _id: null,
                    postCount: { $sum: 1 },
                    distinctSectors: { $addToSet: "$sector" },
                    distinctCountries: { $addToSet: "$country" },
                    distinctTopics: { $addToSet: "$topic" },
                    distinctRegion: { $addToSet: "$region" },
                }
            },
            {
                $project: {
                    _id: 0,
                    postCount: 1,
                    sectorCount: { $size: "$distinctSectors" },
                    countryCount: { $size: "$distinctCountries" },
                    regionCount: { $size: "$distinctRegion" },
                    topicCount: { $size: "$distinctTopics" }
                }
            }
        ]).toArray();
        res.json(result)
    } catch (error) {
        console.log(error);
    }
}

async function getPestle(req, res) {
    try {
        const result = await mongoose.connection.db.collection("data").aggregate([{ $group: { _id: "$pestle", count: { $sum: 1 } } }, { $sort: { _id: 1 } }]).toArray()
        const pestleArray = result.map(el => {
            if (el._id == "") return "Unknown"
            else return el._id
        })
        const countArray = result.map(el => el.count)
        res.json({ pestleArray, countArray })
    } catch (error) {
        console.log(error);
    }
}

async function getcountry(req, res) {
    try {
        const result = await mongoose.connection.db.collection("data").aggregate([{ $group: { _id: "$region", country: { $addToSet: "$country" } } }, { $project: { _id: 0, name: "$_id", children: { $map: { input: "$country", as: "c", in: { name: "$$c", value: 57 } } } } }]).toArray()
        res.json({ name: "region", children: result })
    } catch (error) {
        console.log(error);
    }
}

async function getdata(req, res) {
    const data = (await mongoose.connection.db.collection("data").distinct("published")).sort()
    // const result = data.map(el => el.split(" ")[2])
    // fs.writeFileSync("./data.txt", result.join("\n"))
}
module.exports = {
    getCount,
    getPestle,
    getcountry,
    getdata,

}

