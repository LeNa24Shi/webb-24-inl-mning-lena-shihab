import express from "express";
import cors from "cors";
import * as db from "./fileSystem.js";
import {body, validationResult} from "express-validator";

const PORT = 3000;

const app = express();
app.use( express.json() );
app.use(cors());

const validations = [
    body("name").exists().isString(),
    body("name").exists().notEmpty(),
    body("score").exists().isNumeric(),
];

app.get('/players', async (req, res)=>{

    const scoreList = await db.getScoreList();
    //scoreList.sort((a, b) => b.score - a.score);
    // console.log(players);
    res.json(scoreList);
})

app.post('/players', validations, async (req, res)=>{

    const errors = validationResult(req);
    //console.log(errors.array().length);
    if(errors.array().length>0){
        res.status(400).json({message: 'Invalid value'});
    }
    else{
        await db.addNewPlayer(req.body);
        res.json({message: 'New player added'});
    }
    

    // console.log(newScoreList);
})

app.listen(PORT, ()=>{
    console.log('Listening on port', PORT)
});
