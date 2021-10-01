const fetch = require("cross-fetch")
const parser = require("node-html-parser")

const makeRequest = async (url) => {
    let res = await fetch(url)
    return res.text()
}

const getBadges = async (url, enrollDate) => {

    let res = new RegExp("^(https://|http://){1}");
    if (!res.test(url)) {
        url = "https://" + url;
    }

    let data = []
    let htmlData = await makeRequest(url)
    htmlData = parser.parse(htmlData)

    let badgeClass = htmlData.querySelectorAll(".profile-badge")
    if (!badgeClass) {
        console.log("No badges found");
        return []
    }
    let links = badgeClass.map(elem => elem.querySelector("a").getAttribute("href"))
    if (!links) {
        console.log("No links found");
        return []
    }
    let badgeName = badgeClass.map(elem => elem.querySelector("span"))
    if (!badgeName) {
        console.log("No links found");
        return []
    } else {
        badgeName = badgeName.map(elem => elem.innerText.split("\n").join(""))
    }

    let badgeDate = badgeClass.map(elem => elem.querySelector("span.ql-body-2"))
    if (!badgeDate) {
        console.log("No links found");
        return []
    } else {
        badgeDate = badgeDate.map(elem => elem.innerText.split("\n").join(""))
        badgeDate = badgeDate.map(elem => elem.replace(",", "").split(" "))
        for (let i = 0; i < badgeDate.length; i++) {
            let temp;
            for (let j = 0; j < badgeDate[i].length; j++) {
                if (badgeDate[i][j] == '') {
                    badgeDate[i].splice(j, 1)
                }
            }
            temp = badgeDate[i]
        }
    }
    badgeDate = badgeDate.map(elem => {
        let month = Number(monToNum(elem[1]))
        let day = Number(elem[2])
        let year = Number(elem[3])
        let time = Date.UTC(year, month, day)
        return time
    });

    for (let i = 0; i < links.length; i++) {
        let len = links[i].length
        let badge = {
            "badgeName": badgeName[i],
            "badgeID": links[i].substring(len - 7, len),
            "badgeDate": badgeDate[i]
        }
        // console.log(badge);
        if (enrollDate <= badgeDate[i]) {
            data.push(badge)
        }
    }
    return data
}
const monToNum = (inp) => {
    return new Date(Date.parse(inp + " 1, 2012")).getMonth()
}
module.exports = { getBadges }
