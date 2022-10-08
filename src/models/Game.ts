import GameVisibility from './enums/GameVisibility';
import GameSpecifications from './GameSpecifications';
import ScoreSpecifications from './ScoreSpecifications';

type Game = {
   /** The unique id of the Firestore Game document */
   id: string,

   /** The displayed name of the game */
   name: string,

   /** The publisher id of the user who created the game */
   publisherId: string,

   /** The visibility of the game for other users */
   visibility: GameVisibility,

   /** The date at which the Session was created. */
   createdDate: Date,

   /** General game specifications */
   GameSpecifications: GameSpecifications,

   /** The specification of teamsScore and playersScore */
   ScoreSpecifications: ScoreSpecifications,

   /** The rule book storage url */
   ruleBookUrl: string,
}

export default Game;
