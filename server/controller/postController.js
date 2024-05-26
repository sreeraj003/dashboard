const mongoose = require("mongoose")
const fs = require("fs");
async function getCount(req, res) {
    try {
        console.log(1);
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
        res.json("error")
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
        res.json("error")
    }
}

async function getcountry(req, res) {
    try {
        const result = await mongoose.connection.db.collection("data").aggregate([{ $group: { _id: "$region", country: { $addToSet: "$country" } } }, { $project: { _id: 0, name: "$_id", children: { $map: { input: "$country", as: "c", in: { name: "$$c", value: 57 } } } } }]).toArray()
        res.json({ name: "region", children: result })
    } catch (error) {
        res.json("error")
    }
}

async function getdata(req, res) {
    try {

    } catch (error) {

    }
    const data = (await mongoose.connection.db.collection("data").distinct("published")).sort()
    // const result = data.map(el => el.split(" ")[2])
    // fs.writeFileSync("./data.txt", result.join("\n"))
}
async function sectors(req, res) {
    try {
        const chartdata = await mongoose.connection.db.collection("data").aggregate([{ $group: { _id: "$sector", count: { $sum: 1 } } }, { $sort: { _id: 1 } }]).toArray()
        const result = chartdata.map(el => {
            if (el._id == "") return ["Unknown", el.count]
            else return [el._id, el.count]
        })
        result.unshift(["Sectors", "Count"])
        res.json(result)
    } catch (error) {
        res.json("error")
    }
}

async function postData(req, res) {
    try {
        let { pageNo, filter, filterField } = req.query
        const field = filterField.split("").map(el => el.toLowerCase()).join("")
        const page = parseInt(pageNo)
        if (filter.charCodeAt(0) >= 48 && filter.charCodeAt(0) <= 57) {
            filter = parseInt(filter)
        }
        let data
        if (filter) {
            const query = { [field]: filter };
            data = await mongoose.connection.db.collection("data").find(query).skip((page - 1) * 10).limit(10).project({
                title: 1,
                _id: 0,
                intensity: 1,
                topic: 1,
                relevance: 1,
                country: 1,
                region: 1,
                added: 1,
                published: 1,
                end_year: 1,
                likelihood: 1,
                url: 1
            }).toArray()
        } else {
            data = await mongoose.connection.db.collection("data").find({}).skip((page - 1) * 10).limit(10).project({
                title: 1,
                _id: 0,
                url: 1,
                intensity: 1,
                topic: 1,
                relevance: 1,
                country: 1,
                region: 1,
                added: 1,
                published: 1,
                end_year: 1,
                likelihood: 1
            }).toArray()

        }
        res.json(data)
    } catch (error) {
        res.json("error")
    }
}

async function filterField(req, res) {
    try {
        const filterField = req.query.filterField
        const field = filterField.split("").map(el => el.toLowerCase()).join("")
        const data = await mongoose.connection.db.collection("data").distinct(field)
        res.json(data)
    } catch (error) {
        res.json("error")
    }
}
module.exports = {
    getCount,
    getPestle,
    getcountry,
    getdata,
    sectors,
    postData,
    filterField
}

