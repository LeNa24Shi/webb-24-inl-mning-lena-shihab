import { randomBytes } from "crypto";
import { raw } from "express";
import fs from "fs/promises";


async function getScoreList(){
    const rawdata = await fs.readFile('./src/scoreList.json');

    return JSON.parse(rawdata);
}

async function addNewPlayer(NewPlayer){
    const players = await getScoreList();
    // console.log(NewPlayer.score);
    let lastElement = players[players.length - 1];

    for (let i = 0; i < players.length; i++) {
        if (NewPlayer.score >= lastElement.score ) {
            players.push(NewPlayer);
            console.log(lastElement);
            break;
        }
    } 
    players.sort((a, b) => b.score - a.score);
    
    if(players.length > 5){
        // console.log(players.length);
        players.pop();
    }
    
    await fs.writeFile("./src/scoreList.json", JSON.stringify(players, null, 2));
}

export {getScoreList, addNewPlayer};