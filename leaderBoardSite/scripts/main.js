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
                ${obj.nickname}
            </td>
            <td class="cell">${obj.skills}</td>
    </tr>
        `
    board.innerHTML += newRow
}


const init = async () => {
    let time = updateTime


    for (let i = 0; i < leaderBoardData.length; i++) {
        addToLeaderBoard(i + 1, leaderBoardData[i])
    }
    time = time.split(" ")
    time = time[0]
    document.getElementById("timeUpdate").innerText = `Last Updated : ${time}`

}

// entry function
window.onload = init()