const scrapper = require("./scrapper.js")
const dbFunc = require("./../dbFunc.js")
const dbFileLoc = "db.json"
const trackData = require("./trackData.js")

const delay = (time) => {
    return new Promise(function (resolve) {
        setTimeout(resolve, time)
    });
}

const AddZero = (num) => {
    return (num >= 0 && num < 10) ? "0" + num : num + "";
}

const getCurrentTime = () => {
    var now = new Date();
    var strDateTime = [[AddZero(now.getDate()),
    AddZero(now.getMonth() + 1),
    now.getFullYear()].join("-"),
    [AddZero(now.getHours()),
    AddZero(now.getMinutes())].join(":"),
    now.getHours() >= 12 ? "PM" : "AM"].join(" ");
    return strDateTime
}

const joinStr = (inp) => {
    try {
        inp = inp.replace("amp;", "")
        inp = inp.toLowerCase().split(" ").join("").trim()
    } catch {
        console.log(inp);
    }
    return inp
}

const init = async () => {
    /**
     * 1.get profile links
     * 2. scrape their data
     * 3. match badges
     * 4. send mails
     */
    console.log("\n=========================");
    console.log("---Fetching Badge Data---");
    console.log("=========================\n");

    let participants = JSON.parse(dbFunc.read("participants.json"))
    let profile = [{
        "name": "Madhav Jha",
        "profileLink": "https://www.qwiklabs.com/public_profiles/1d192aa3-51d2-444b-ae36-f54252af7adc",
        "enrollDate": 1632355200000,
        "isEnrollStatusGood": true,
        "nickname": "Bouncy Vampire"
    }]
    profile = participants["profiles"]

    for (let i = 0; i < profile.length; i++) {
        // await delay(400)
        if (profile[i]["isEnrollStatusGood"] == false) {
            continue;
        }
        console.log(`Fetching Person ${i + 1}`)
        let badges = await scrapper.getBadges(profile[i]["profileLink"], profile[i]["enrollDate"])
        profile[i]["badges"] = badges
    }

    // count skills and quests
    let track1 = trackData.trackData[0];
    track1.skills = track1.skills.map(elem => elem.name).map(elem => joinStr(elem))

    let track2 = trackData.trackData[1];
    track2.skills = track2.skills.map(elem => elem.name).map(elem => joinStr(elem))

    for (let i = 0; i < profile.length; i++) {
        if (profile[i]["isEnrollStatusGood"] == false) {
            continue;
        }
        let badges = profile[i]["badges"].map(elem => elem.badgeName)

        let skills = 0, trackOne = 0, trackTwo = 0
        badges.forEach(elem => {
            elem = joinStr(elem)
            if (track1.skills.indexOf(elem) != -1) {
                trackOne++;
                skills++;
            }
            if (track2.skills.indexOf(elem) != -1) {
                trackTwo++;
                skills++;
            }
        });
        profile[i]["skills"] = skills
        profile[i]["trackOne"] = trackOne
        profile[i]["trackTwo"] = trackTwo
    }

    console.log("\nUpdating db.json\n");
    let db = {
        "participants": profile,
        "time": getCurrentTime()
    }
    // console.log(db);
    dbFunc.write(dbFileLoc, db)
    console.log("\n---Data collection done---\n");
}

// entry function
init()
