/* eslint-disable no-useless-catch */

import {
  doc, setDoc, deleteDoc, updateDoc, getDoc, collection, Timestamp, where, query, getDocs,
} from 'firebase/firestore';

import { db } from '../FirebaseConfig';
import GameVisibility from '../models/enums/GameVisibility';
import Game from '../models/Game';
import GameSpecifications from '../models/GameSpecifications';
import QueryArg from '../models/QueryArg';
import ScoreSpecifications from '../models/ScoreSpecifications';

class GameService {
  /**
     * Create a game document
     *
     * @param {string} name
     * @param {string} publisherId
     * @param {GameVisibility} visibility
     * @param {string} createdDate
     * @param {GameSpecifications} gameSpecifications
     * @param {ScoreSpecifications} scoreSpecifications
     * @param {string} ruleBookUrl
     * @returns {timestamp} write time
     */
  static create = async (
    name: string,
    publisherId: string,
    visibility: GameVisibility,
    createdDate: Date,
    gameSpecifications: GameSpecifications,
    scoreSpecification: ScoreSpecifications,
    ruleBookUrl: string,
  ) => {
    const newGameRef = doc(collection(db, 'Games'));

    await setDoc(newGameRef, {
      id: newGameRef.id,
      name,
      publisherId,
      visibility,
      createdDate: Timestamp.fromDate(createdDate),
      gameSpecifications,
      scoreSpecification,
      ruleBookUrl,
    });
  };

  /**
     * Gets a game document by id
     *
     * @param {string} id
     * @returns {Game} game
     */
  static get = async (id: string) => (await getDoc(doc(db, 'Games', id))).data();

  /**
     * Delete game document
     *
     * @param {string} id
     * @returns {timestamp} write time
     */
  static delete = (id: string) => deleteDoc(doc(db, 'Games', id));

  /**
     * Updates game document
     *
     * @param {Game} game
     * @returns {timestamp} write time
     */
  static update = (game: Game) => updateDoc(doc(db, 'Games', game.id), {
    id: game.id,
    name: game.name,
    publisherId: game.publisherId,
    visibility: game.visibility,
    createdDate: Timestamp.fromDate(game.createdDate),
    gameSpecifications: game.gameSpecifications,
    scoreSpecification: game.scoreSpecifications,
    ruleBookUrl: game.ruleBookUrl,
  });

  /**
     * Gets multiple game documents with a certain filter
     *
     * @param {QueryArg[]} queryArgs
     * @param {WhereFilterOp} condition
     * @param {string} value
     * @returns {Game[]} games
     */
  static getMultiple = async (queryArgs: QueryArg[]) => {
    let q = query(collection(db, 'Games'));
    queryArgs.forEach((arg: QueryArg) => {
      q = query(q, where(arg.property, arg.condition, arg.value));
    });
    const games = [] as Game[];
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((docRef: any) => {
      const game = docRef.data() as Game;
      games.push(game);
    });
    return Promise.all(games);
  };

  /**
     * Subscribe to multiple game documents by certain filter
     *
     * @param {string} id
     * @returns {Game[]} games
     */
  static subscribeDoc = async (id: string) => {
    console.log('Subscribe single doc');
  };

  /**
     * Subscribe to multiple game documents by certain filter
     *
     * @param {string} property
     * @param {string} condition
     * @param {string} value
     * @returns {Game[]} games
     */
  static subscribeCollection = async (property: string, condition: string, value: string) => {
    console.log('Subscribe collection');
  };
}

export default GameService;
