import {
  setPersistence, signInWithEmailAndPassword, signOut, browserSessionPersistence, browserLocalPersistence, createUserWithEmailAndPassword,
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

  static createAccount = async (email: string, password: string, language: string) => {
    try {
      const firebaseUser = await createUserWithEmailAndPassword(auth, email, password);
      // const createUserAccount = functions.httpsCallable('user-createUserAccount');
      // await createUserAccount({
      //   userId: firebaseUser.user?.uid, email, name, birthDate: birthDate.toDateString(), language,
      // });
      return firebaseUser;
    } catch (e: any) {
      console.log(e.message);
      throw e.message;
    }
  };

  static logout = async () => {
    try {
      await signOut(auth);
    } catch (e: any) {
      console.log(e);
      throw e.message;
    }
  };
}

export default UserService;
