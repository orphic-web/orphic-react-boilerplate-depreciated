import Boardgames from './enums/Boardgames';
import GameState from './enums/GameState';
import Player from './Player';

type Game = {
    id: string,
    state: GameState,
    playerCount?: number,
    players?: Player[]
    boardgameName?: Boardgames,
    lastEdited?: Date,
    createdDate?: Date
}

export default Game;
