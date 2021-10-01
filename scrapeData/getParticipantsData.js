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

    for (let i = 0; i < profile.length; i++) {
        await delay(400)
        console.log(`Fetching Person ${i + 1}`)
        let badges = await scrapper.getBadges(profile[i]["profileLink"], profile[i]["enrollDate"])
        profile[i]["badges"] = badges
    }
    console.log(profile);

    // count skills and quests
    // trackData.allQuests = trackData.allQuests.map(elem => elem.name)
    // trackData.allSkills = trackData.allSkills.map(elem => elem.name)
    // trackData.allQuests = trackData.allQuests.map(elem => joinStr(elem))
    // trackData.allSkills = trackData.allSkills.map(elem => joinStr(elem))
    // for (let i = 0; i < profile.length; i++) {
    //     let badges = profile[i]["badges"].map(elem => elem.badgeName)

    //     let quests = 0;
    //     let skills = 0
    //     badges.forEach(elem => {
    //         elem = joinStr(elem)
    //         if (trackData.allQuests.indexOf(elem) != -1) {
    //             quests++;
    //         }
    //         if (trackData.allSkills.indexOf(elem) != -1) {
    //             skills++;
    //         }
    //     });
    //     profile[i]["quests"] = quests
    //     profile[i]["skills"] = skills
    // }

    console.log("\nUpdating db.json\n");
    let db = {
        "participants": profile,
        "time": getCurrentTime()
    }
    // console.log(db);
    // dbFunc.write(dbFileLoc, db)
    console.log("\n---Data collection done---\n");
}

// entry function
init()
