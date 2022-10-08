import Player from './Player';
import Score from './Score';

type Team = {
   /** The displayed name of the team */
   name: string,

   /** List of players within the team */
   players: Player[],

   /** The order at which the team has to play */
   order?: number,

   /** The team various scores */
   scores: Score[],
}

export default Team;
