import {
  doc, collection, setDoc, deleteDoc, updateDoc, getDoc,
} from 'firebase/firestore';
import { auth, db } from '../FirebaseConfig';
import GameState from '../models/enums/GameState';
import Game from '../models/Game';

class GameService {
  /**
     * Create a Game document
     *
     * @returns {timestamp} write time
     */
  static create = async () => {
    const gameRef = doc(collection(db, `Users/${auth.currentUser?.uid}/Games`));

    const newGame = {
      id: gameRef.id,
      state: GameState.INIT,
      createdDate: new Date(),
    } as Game;

    await setDoc(gameRef, newGame);

    return newGame;
  };

  /**
   * Gets a game document by id
   *
   * @param {string} id
   * @returns {Game} game
   */
  static get = async (id: string) => (await getDoc(doc(db, `Users/${auth.currentUser?.uid}/Games`, id))).data();

  /**
   * Delete game document
   *
   * @param {string} id

  * @returns {timestamp} write time
   */
  static delete = (id: string) => deleteDoc(doc(db, `Users/${auth.currentUser?.uid}/Games`, id));

  /**
   * Updates game document
   *
   * @param {Game} game
   * @returns {timestamp} write time
   */
  static update = (game: Game) => updateDoc(doc(db, `Users/${auth.currentUser?.uid}/Games`, game.id), game);
}

export default GameService;
