import {
  setPersistence, signInWithEmailAndPassword, browserSessionPersistence, browserLocalPersistence,
} from 'firebase/auth';
import { auth } from '../FirebaseConfig';

class UserService {
  static login = async (email: string, password: string, browserPersistence: boolean) => {
    try {
      if (browserPersistence) {
        await setPersistence(auth, browserSessionPersistence);
        // Existing and future Auth states are now persisted in the current
        // session only. Closing the window would clear any existing state
        await signInWithEmailAndPassword(auth, email, password);
      } else {
        await setPersistence(auth, browserLocalPersistence);
        // Existing and future Auth states are now persisted locally.
        // Closing the window would not clear any existing state
        await signInWithEmailAndPassword(auth, email, password);
      }
    } catch (e: any) {
      console.log(e);
      throw e.message;
    }
  };

  logout = async (dispatch: any) => {
    try {
      const resp = await auth.signOut();
      console.log(resp);
    } catch (e: any) {
      console.log(e);
      throw e.message;
    }
  };
}

export default UserService;
