let inpBar = document.getElementById("searchNames")

inpBar.oninput = () => {

    let tbody = document.getElementsByTagName("tbody")

    let inp = inpBar.value
    inp = inp.trim()
    inp = inp.toLowerCase()

    if (inp != "") {

        for (let i = 0; i < leaderBoardData.length; i++) {
            let obj = leaderBoardData[i].name.toLowerCase()

            if (obj.includes(inp)) {
                tbody[i + 1].style.display = ""
            } else {
                tbody[i + 1].style.display = "none"
            }
        }
    }
}