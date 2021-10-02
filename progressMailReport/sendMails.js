const dbFunc = require("./../dbFunc.js")
const mailNode = require("./nodeMailer.js")
const cred = require("./cred.js")
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
    db = [
        {
            "name": "Madhav Jha",
            "profileLink": "https://www.qwiklabs.com/public_profiles/1d192aa3-51d2-444b-ae36-f54252af7adc",
            "enrollDate": 1632355200000,
            "isEnrollStatusGood": true,
            "email": "jhamd@rknec.edu",
            "nickname": "Friendly Villain",
            "badges": [
                {
                    "badgeName": "Set Up and Configure a Cloud Environment in Google Cloud",
                    "badgeID": "1241912",
                    "badgeDate": 1632960000000
                },
                {
                    "badgeName": "Perform Foundational Infrastructure Tasks in Google Cloud",
                    "badgeID": "1219675",
                    "badgeDate": 1632700800000
                },
                {
                    "badgeName": "Create and Manage Cloud Resources",
                    "badgeID": "1214815",
                    "badgeDate": 1632614400000
                }
            ],
            "skills": 4,
            "trackOne": 3,
            "trackTwo": 1
        }
    ]
    // console.log(db);

    let divisor = Math.ceil(db.length / cred.length)
    console.log("\n--Sending mails---\n");
    for (let i = 0; i < db.length; i++) {

        if (db[i]["isEnrollStatusGood"] == false) {
            console.log("For: " + i + 1 + "not enrolled");
            continue;
        }
        if (db[i]["email"] == null) {
            console.log("For: " + i + 1 + "Email not available");
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