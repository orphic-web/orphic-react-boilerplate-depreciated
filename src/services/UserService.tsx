/* eslint-disable no-useless-catch */
import {
  setPersistence, signInWithEmailAndPassword, signOut, browserSessionPersistence, browserLocalPersistence, createUserWithEmailAndPassword,
} from 'firebase/auth';
import { httpsCallable } from 'firebase/functions';

import { auth, functions } from '../FirebaseConfig';
import EmailService from './EmailService';

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
      throw e;
    }
  };

  static createAccount = async (email: string, password: string, language: string) => {
    try {
      const firebaseUser = await createUserWithEmailAndPassword(auth, email, password);

      await EmailService.sendVerificationEmail();
      // const createUserAccount = functions.httpsCallable('user-createUserAccount');
      // await createUserAccount({
      //   userId: firebaseUser.user?.uid, email, name, birthDate: birthDate.toDateString(), language,
      // });
      return firebaseUser;
    } catch (e: any) {
      throw e;
    }
  };

  static logout = async () => {
    try {
      await signOut(auth);
    } catch (e: any) {
      throw e;
    }
  };

  static checkIfSuperAdmin = async () => {
    try {
      const checkIfSuperAdminRef = httpsCallable(functions, 'user-checkIfSuperAdmin');
      const isSuperAdmin = await checkIfSuperAdminRef();
      return isSuperAdmin;
    } catch (e: any) {
      throw e;
    }
  };
}

export default UserService;
