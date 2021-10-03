const db = require("./../dbFunc.js")

let RawData = db.read("./refineData/rawParticipantsData.json")
RawData = JSON.parse(RawData)
let newData = db.read("db.json")
newData = JSON.parse(newData)

for (let i = 0; i < RawData.length; i++) {
    if (RawData[i]["Qwiklabs Profile URL"] = newData["participants"][i]["profileLink"]) {
        newData["participants"][i]["email"] = RawData[i]["Student Email"] || null
    }
}
db.write("db.json", newData)
console.log("Emails added");
