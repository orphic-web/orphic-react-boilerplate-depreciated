import Score from './Score';

type ScoreSpecifications = {
    /** The score associate for each team */
    teamScore: Score[],

    /** The score associated for each player */
    playerScore: Score[],
 }

export default ScoreSpecifications;
