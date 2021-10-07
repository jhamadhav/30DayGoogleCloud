const fs = require('fs')
const dbFunc = require("../dbFunc.js")
const dbFileLoc = "./leaderBoardSite/leaderBoard.js"

const max = (a, b) => {
    return (a >= b) ? a : b;
}
const min = (a, b) => {
    return (a <= b) ? a : b;
}

const init = () => {

    let participants = JSON.parse(dbFunc.read("db.json"))
    profile = participants["participants"]

    let leaderBoard = []
    for (let i = 0; i < profile.length; i++) {

        if (profile[i]["isEnrollStatusGood"] == false) {
            continue;
        }

        let color = "black";
        if (profile[i]["trackOne"] == 6 || profile[i]["trackTwo"] == 6) {
            color = "blue"
        }
        if (profile[i]["trackOne"] == 6 && profile[i]["trackTwo"] == 6) {
            color = "green"
        }
        let data = {
            name: profile[i]["name"],
            nickname: profile[i]["nickname"],
            skills: profile[i]["skills"],
            trackOne: profile[i]["trackOne"],
            trackTwo: profile[i]["trackTwo"],
            color,
            latestSkill: (profile[i]["badges"][0]) ? profile[i]["badges"][0]["badgeDate"] : null
        }
        leaderBoard.push(data)
    }

    leaderBoard.sort((a, b) => {
        let maxA = max(a["trackOne"], a["trackTwo"])
        let maxB = max(b["trackOne"], b["trackTwo"])
        let minA = min(a["trackOne"], a["trackTwo"])
        let minB = min(b["trackOne"], b["trackTwo"])
        if (maxA == maxB) {

            if (minA == minB) {
                if (a["latestSkill"] == b["latestSkill"]) {
                    return 0
                } else if (a["latestSkill"] < b["latestSkill"]) {
                    return -1
                } else {
                    return 1
                }
            } else if (minA > minB) {
                return -1
            } else {
                return 1
            }

        } else if (maxA > maxB) {
            return -1
        } else {
            return 1
        }
    })

    let leaderBoardData = "const leaderBoardData = ["
    for (let i = 0; i < leaderBoard.length; i++) {
        leaderBoardData += JSON.stringify(leaderBoard[i]);
        leaderBoardData += ","
    }
    leaderBoardData += "]"
    leaderBoardData += `\nconst updateTime =  "${participants["time"]}"`

    fs.writeFile(dbFileLoc, leaderBoardData, (err) => {
        if (err) {
            throw err;
        }
    });

}

init()