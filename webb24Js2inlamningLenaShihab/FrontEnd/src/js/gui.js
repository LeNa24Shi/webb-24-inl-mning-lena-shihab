const baseURL = 'http://localhost:3000/players';

const header = {
    "Content-type": "application/json; charset=UTF-8"
}
    
async function getAllPlayers(){
    const res = await fetch(baseURL);
    const playerData = await res.json();
    // playerData.sort((a, b) => {b.score - a.csore
    // console.log()});
    return playerData;
}

async function postNewPlayer(NewPlayer){
    const res = await fetch(baseURL, {
        method : "POST",
        body: JSON.stringify(NewPlayer),
        headers: header
    })
    const playerData = await res.json();
}

export {getAllPlayers, postNewPlayer};