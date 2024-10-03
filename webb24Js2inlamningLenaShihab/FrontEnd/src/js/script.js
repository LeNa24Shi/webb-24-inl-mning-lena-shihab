import { showScoreList, guessGame } from "./scoreList.js";
import { getAllPlayers } from "./gui.js";

getAllPlayers().then(showScoreList);
guessGame();