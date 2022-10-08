import Score from './Score';

type Player = {
    /** The displayed name of the player */
    name: string,

    /** The order at which the player has to play */
    order?: number,

    /** The player various scores */
    scores: Score[],
 }

export default Player;
