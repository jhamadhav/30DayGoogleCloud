const db = require("./dbFunc.js")

const init = () => {
    let credTemplate = `const cred = [
    {
        "user": "your mail",
        "pass": "password"
    },
    {
        "user": "Another mail",
        "pass": "password"
    }
]
module.exports = cred
    `
    db.writeString("./progressMailReport/cred.js", credTemplate)
    console.log("cred.js created");
    db.writeString("./refineData/rawParticipantsData.json", "")
    console.log("rawParticipantsData.json created");
}

init()