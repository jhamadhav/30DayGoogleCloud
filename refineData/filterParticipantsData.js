const db = require("./../dbFunc.js")
let data = db.read("./refineData/rawParticipantsData.json")
data = JSON.parse(data)

// console.log(data);

const monToNum = (inp) => {
    return new Date(Date.parse(inp + " 1, 2012")).getMonth()
}

data = data.map((elem) => {
    let time = elem["Enrolment Date & Time"]
    // console.log(elem);
    time = time.split(" ")
    let month = Number(monToNum(time[1]))
    let day = Number(time[2])
    let year = Number(time[3])

    return {
        "name": elem["Student Name"],
        "profileLink": elem["Qwiklabs Profile URL"],

        // no email due to privacy reasons
        // "email": elem["Student Email"] || null,
        "enrollDate": Date.UTC(year, month, day),
        "isEnrollStatusGood": (elem["Enrolment Status"] == "All Good") ? true : false
    }
})

// console.log(data[0]);

let participants = {
    "profiles": data
}
db.write("participants.json", participants)