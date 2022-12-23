// Selecting all required elements
const selectBox = document.querySelector(".select-box"),
selectXBtn = document.querySelector(".PlayerX"), 
selectOBtn = document.querySelector(".PlayerO"),
playBoard = document.querySelector(".play-board"),
allBox = document.querySelectorAll("section span"),
players = document.querySelector(".players"),
resultBox = document.querySelector(".result-box"),
wonText = document.querySelector(".won-text"),
replayBtn = resultBox.querySelector("button")



window.onload = () =>{ // Run on Load

    for(let i = 0; i < allBox.length; i++){
        allBox[i].setAttribute("onclick", "clickedBox(this)")
    }
    selectXBtn.onclick = () => {
        selectBox.classList.add("hide") // hide the select box on click
        playBoard.classList.add("show")
    }
    selectOBtn.onclick = () => {
        selectBox.classList.add("hide") // hide the select box on click
        playBoard.classList.add("show")
        players.setAttribute("class", "players active player")
    }
}

let playerXIcon = "fas fa-times"
let playerOIcon = "far fa-circle"
let playerSign = "X"
let runBot = true

// user click function
const clickedBox = (element) => {
    if(players.classList.contains("player")){ //if players element contains .player
        playerSign = "O"// if player will be O then we'll chnage the sign
        element.innerHTML = `<i class ="${playerOIcon}"></i>`
        players.classList.add('active')
        element.setAttribute("id", playerSign)
    }else{
        element.innerHTML = `<i class ="${playerXIcon}"></i>`
        players.classList.add('active')
        element.setAttribute("id", playerSign)
    }
    selectWinner()
    playBoard.style.pointerEvents = 'none'
    element.style.pointerEvents = "none"
    let randomDelayTIme = ((Math.random() * 1000) + 200).toFixed() // setiing randomdelay time for the bot so it doesn't run instantly
    setTimeout(() => {
        bot(runBot)
    }, randomDelayTIme)
}

function bot (runBot){
    if(runBot){
            //first change playerSign to "o" if player is x
        playerSign = "O"
        let array = [] //creating an array of unselected boxes
        for(let i = 0; i < allBox.length; i++){
            if(allBox[i].childElementCount == 0){ // if span has no child Element
                array.push(i) //inserting unclicked into the array 
            }
        }
        let randomBox = array[Math.floor(Math.random() * array.length)] //getting a random index from the array for the bot to select
        if(array.length > 0){
            if(players.classList.contains("player")){
                allBox[randomBox].innerHTML = `<i class ="${playerXIcon}"></i>`
                players.classList.remove('active')
                playerSign = "x"
                allBox[randomBox].setAttribute("id", playerSign)
            }else{
                allBox[randomBox].innerHTML = `<i class ="${playerOIcon}"></i>`
                players.classList.remove('active')
                allBox[randomBox].setAttribute("id", playerSign)
            }
            selectWinner()
        }
        playBoard.style.pointerEvents = 'auto'
        allBox[randomBox].style.pointerEvents = "none"
        playerSign = "X"
    }    
}

//Logic to pick winner
function getClass(idname){
    return document.querySelector(".box" + idname).id // return the id name
}
function checkThreeClasses(val1, val2, val3, sign){
    if(getClass(val1) == sign && getClass(val2) == sign && getClass(val3) == sign){
        return true;
    }
}
function selectWinner(){
    if(checkThreeClasses(1,2,3,playerSign) || checkThreeClasses(4,5,6,playerSign) ||
     checkThreeClasses(7,8,9,playerSign) || checkThreeClasses(1,4,7,playerSign) || checkThreeClasses(2,5,8,playerSign) || checkThreeClasses(3,6,9,playerSign)
     || checkThreeClasses(1,5,9,playerSign) || checkThreeClasses(3,5,7,playerSign)){
        runBot = false
        bot(runBot)
        setTimeout(()=> {
            playBoard.classList.remove("show")
            resultBox.classList.add("show")
        }, 700)
        wonText.innerHTML = `Player ${playerSign} won the game!`
     }else{
        if(getClass(1) != "" && getClass(2) != "" && getClass(3) != "" && getClass(4) != "" && getClass(5) != "" && getClass(6) != "" && getClass(7) != "" && getClass(8) != "" && getClass(9) != ""){
            runBot = false
            bot(runBot)
            setTimeout(()=> {
                playBoard.classList.remove("show")
                resultBox.classList.add("show")
            }, 700)
            wonText.textContent = `The match was a draw!`
        }
     }
}
replayBtn.onclick = () => {
    window.location.reload()
}

