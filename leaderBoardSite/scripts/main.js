const addToLeaderBoard = (i, obj) => {
    let sum = obj.badge + obj.skill
    if (sum == 0) {
        return 0
    }
    let board = document.getElementById("leaderboard");
    let newRow = `
    <tr class="row">
            <td class="cell">${i}</td>
            <td class="cell ${obj.color}">
                ${obj.name.toLowerCase()}
            </td>
            <th class="cell robo">${obj.trackOne}</th>
            <th class="cell robo">${obj.trackTwo}</th>
    </tr>
        `
    board.innerHTML += newRow
}


const init = async () => {
    let shadowLoad = document.getElementsByClassName("shadowLoad")
    for (let i = 0; i < shadowLoad.length; i++) {
        shadowLoad[i].style.display = "none"
    }

    let time = updateTime

    let j = 0;
    for (let i = 0; i < leaderBoardData.length; i++) {

        addToLeaderBoard(j + 1, leaderBoardData[i])
        j++;
    }
    time = time.split(" ")
    time = time[0]
    document.getElementById("timeUpdate").innerText = `Last Updated : ${time}`

}

// entry function
window.onload = init()