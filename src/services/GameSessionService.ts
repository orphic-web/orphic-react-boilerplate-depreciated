import { db } from '../FirebaseConfig';
import userService from './UserService';

class GameSessionService {
  startGameSession = async () => {
    try {
      const admin: any = await userService.getAdmin();

      if (admin.activeGameSessionId) {
        const docRef = await db.collection('GameSessions').doc();

        const newGameSession = {
          id: docRef.id,
          boardgame: null,
          members: [],
          createdTime: new Date(),
          admin: admin.id,
        };

        await docRef.set(newGameSession);

        admin.activeGameId = docRef.id;

        await userService.updateAdmin(admin);
      } else {
        throw Error('A game session is already started');
      }
    } catch (e: any) {
      console.log(e);
      throw e.message;
    }
  };
}

const gameSessionService = new GameSessionService();
export default gameSessionService;
