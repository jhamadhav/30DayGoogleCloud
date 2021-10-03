const dbFunc = require("./../dbFunc.js")
const mailNode = require("./nodeMailer.js")
const cred = require("./cred")
let templateMaker = require("./templateMaker.js")

const delay = (time) => {
    return new Promise(function (resolve) {
        setTimeout(resolve, time)
    });
}

const init = async () => {

    let db = dbFunc.read("db.json")
    db = JSON.parse(db)
    db = db["participants"]

    let divisor = Math.ceil(db.length / cred.length)
    console.log("\n--Sending mails---\n");
    for (let i = 0; i < db.length; i++) {

        if (db[i]["isEnrollStatusGood"] == false) {
            console.log("For: " + i + "not enrolled");
            continue;
        }
        if (db[i]["email"] == null) {
            console.log("For: " + i + "Email not available");
            continue;
        }
        await delay(200);
        let credIndex = Math.floor(i / divisor)
        let obj = db[i]
        let template = templateMaker.getTemplate(obj)
        let message = {
            "subject": "Your #3oDayGoogleCloud progress report",
            "body": template,
            "success": "message sent"
        }
        let targetMail = db[i]["email"]
        // console.log(template);
        await mailNode.sendMail(cred[credIndex], targetMail, message)
        console.log(`Mail sent : ${i + 1}`);
    }
    console.log("\n---END---\n");
}

//entry function
init().catch(console.error)