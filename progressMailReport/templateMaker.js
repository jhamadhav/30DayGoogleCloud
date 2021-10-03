let trackFromDB = require("./../scrapeData/trackData")
const dbFunc = require("./../dbFunc.js")
const htmlFileLoc = "./progressMailReport/template.html"


let trackTitle = `<div class="track" style="
width: 100%;
text-align: left;
display: flex;
align-items: center;
padding: 0 20px;
margin: 10px 0;
margin-top:30px;
width: 90%;
">
<div class="logo" style="display: inline-block;
    margin-right: 10px;">
    <img src="https://i.imgur.com/93Jtlo4.png" alt="track-logo">
</div>
<div class="track-title" style="display: inline-block;
    font-weight: bold;
    font-size: 18px;
    color: #000;
    ">
    Track {{trackNum}}: {{trackName}}
</div>
</div>`

let skillTitle = `<div class="quest-title" style="color: rgba(38, 38, 38, 0.7);
font-weight: bold;
font-size: 16px; margin-bottom: 10px; padding-left: 20px;">Skills:</div>`

let correct = "https://i.imgur.com/dnjY1vi.png"
let incorrect = "https://i.imgur.com/9SBIV5n.png"

const joinStr = (inp) => {
    try {
        inp = inp.replace("amp;", "")
        inp = inp.toLowerCase().split(" ").join("").trim()
    } catch {
        console.log(inp);
    }
    return inp
}
let task = dbFunc.read("./progressMailReport/task.html")

const getTemplate = (profile) => {
    let allBadges = profile["badges"]
    allBadges = allBadges.map(elem => joinStr(elem.badgeName))

    let BaseTemplate = dbFunc.read(htmlFileLoc)

    BaseTemplate = BaseTemplate.replace("{{name}}", profile["name"])
    // BaseTemplate = BaseTemplate.replace("{{nickname}}", profile["nickname"])


    let track = trackFromDB.trackData;
    let tracks = ""
    for (let i = 0; i < track.length; i++) {
        let title = trackTitle
        title = title.replace("{{trackName}}", track[i].name)
        title = title.replace("{{trackNum}}", i + 1)

        let skills = ``
        let skillsData = track[i]["skills"]
        for (let j = 0; j < skillsData.length; j++) {

            let skill = task
            skill = skill.replace("{{taskName}}", skillsData[j]["name"])
            skill = skill.replace("{{id}}", skillsData[j]["id"])

            let currentStatus;
            if (allBadges.indexOf(joinStr(skillsData[j]["name"])) != -1) {
                currentStatus = correct
            } else {
                currentStatus = incorrect
            }
            skill = skill.replace("{{taskStatus}}", currentStatus)
            skills += skill
        }


        tracks += title + skillTitle + skills
    }
    template = BaseTemplate + tracks + "</div></body>"

    return template
}

module.exports = { getTemplate }
