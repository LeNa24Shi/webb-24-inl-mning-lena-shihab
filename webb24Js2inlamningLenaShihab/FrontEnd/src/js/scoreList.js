import { postNewPlayer , getAllPlayers} from "./gui.js";


function showScoreList(players){
    const container = document.querySelector("#divScore");
    container.innerHTML = '';

    const divScore = document.getElementById("divScore");
    const pTop= document.createElement("p");
    pTop.innerHTML = "Top Five Players : ";
    divScore.append(pTop);
    pTop.style.fontWeight ="bold";
    for (const player of players) {
        const p = document.createElement("p");
        p.innerHTML = `Name : ${player.name} __ Score: ${player.score}`
        container.append(p);
    }
}


const buttonDiv = document.querySelector("#buttonDiv");
const btn = document.getElementsByClassName("answerButton")
// console.log(btn);

function guessGame(){
    const min = 1;
    const max = 3;
    let randomNum = Math.floor(Math.random() * (max - min +1) + min);
    // console.log(answer);
    const pNum = document.createElement("p");
    buttonDiv.append(pNum);
    pNum.style.visibility  = "hidden";
    // console.log(pNum);
    let rightAnswer = 0; 
    let pCorrect;
    let pWrong;
   
    
    const scoreForm = document.getElementById("scoreForm");
    buttonDiv.append(scoreForm);
    
    for (let i = 0; i < btn.length; i++) {
        btn[i].addEventListener('click', event=> {
            event.preventDefault();
            // console.log(rightAnswer);
            if(btn[i].innerHTML == randomNum){
                pWrong.innerHTML ="";
                rightAnswer++;
                pCorrect = document.createElement("p");
                buttonDiv.append(pCorrect);
                pCorrect.innerHTML = `Your answer is corret, ${rightAnswer} points`;
                setTimeout(() => { pCorrect.innerHTML=""}, 2000);
                randomNum = Math.floor(Math.random() * (max - min +1) + min);
            }else if(rightAnswer >0){
                pCorrect.innerHTML ="";
                pWrong = document.createElement("p");
                buttonDiv.append(pWrong);
                pWrong.innerHTML = `Your answer is wrong ${rightAnswer} points.`;
                const nameInput = document.createElement("input");
                scoreForm.append(nameInput);
                nameInput.placeholder = "YOUR NAME";
                const btnScore = document.createElement("button");
                btnScore.innerHTML = "Send score!";
                scoreForm.append(btnScore);

                for (let j = 0; j < btn.length; j++) {
                    btn[j].disabled = true;
                }

                scoreForm.addEventListener("submit", (event)=>{
                    event.preventDefault();
                    postNewPlayer({
                        name: nameInput.value,
                        score: rightAnswer
                        
                    }).then(getAllPlayers).then(showScoreList); 
                    // location.reload();
            })

            }else{
                pWrong = document.createElement("p");
                buttonDiv.append(pWrong);
                pWrong.innerHTML = `Your answer is wrong`;
                setTimeout(() => { pWrong.innerHTML=""}, 1000);
            }
        });
    }
    
}


export {showScoreList, guessGame};