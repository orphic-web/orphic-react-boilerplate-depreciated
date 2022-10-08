import GameOrderType from './enums/GameOrderType';

type GameSpecifications = {
    /** The maximum number of team within the game */
    maxTeams: number,

    /** The maximum number of player within a team */
    teamMaxSize: number,

    /** The minimum number of player within a team */
    teamMinSize: number,

    /** Regulates the order type of a session
     * TEAM - All players of a team plays at the same time
     * PLAYER - Players play one at a time.
     */
    orderType: GameOrderType,
 }

export default GameSpecifications;
