/* eslint-disable no-useless-catch */
import {
  setPersistence, updateEmail, updatePassword, signInWithEmailAndPassword, signOut, browserSessionPersistence, browserLocalPersistence, createUserWithEmailAndPassword,
} from 'firebase/auth';
import { httpsCallable } from 'firebase/functions';
import { auth, functions } from '../FirebaseConfig';
import User from '../models/User';
import EmailService from './EmailService';

class UserService {
  /**
   * Used to authenticate user from login
   *
   * @param {string} email
   * @param {string} password
   * @param {boolean} rememberMe
   * @returns {void}
   */
  static login = async (email: string, password: string, rememberMe: boolean) => {
    try {
      if (rememberMe) {
        // Existing and future Auth states are now persisted locally.
        // Closing the window would not clear any existing state
        await setPersistence(auth, browserLocalPersistence);
        await signInWithEmailAndPassword(auth, email, password);
      } else {
        // Existing and future Auth states are now persisted in the current
        // session only. Closing the window would clear any existing state
        await setPersistence(auth, browserSessionPersistence);
        await signInWithEmailAndPassword(auth, email, password);
      }
    } catch (e: any) {
      throw e;
    }
  };

  /**
   * Used to create a firebase and firestore user account
   *
   * @param {string} name
   * @param {string} email
   * @param {string} password
   * @param {string} language
   * @returns {timestamp} write time
   */
  static createAccount = async (name: string, email: string, password: string, language: string) => {
    try {
      const firebaseUser = await createUserWithEmailAndPassword(auth, email, password);

      const createUserAccount = httpsCallable(functions, 'user-createUserAccount');
      await createUserAccount({
        id: firebaseUser.user?.uid, email, name, language,
      });

      EmailService.sendAccountConfirmation();
    } catch (e: any) {
      if (auth.currentUser) {
        const uid = auth.currentUser?.uid as string;
        UserService.deleteFirebaseUser(auth.currentUser);
        UserService.deleteFirestoreUser(uid);
      }
      throw e;
    }
  };

  /**
   * Delete a specified Firebase user
   *
   * @param {FirebaseUser} firebaseUser
   * @returns {void}
   */
  static deleteFirebaseUser = async (firebaseUser: any) => {
    try {
      if (firebaseUser === null) throw new Error('There is no current user to delete!');
      firebaseUser.delete();
    } catch (e: any) {
      throw e;
    }
  };

  /**
   * Delete a specified Firestore user
   *
   * @param {string} id
   * @returns {void}
   */
  static deleteFirestoreUser = async (id: string) => {
    try {
      if (id) throw new Error('userId is undefined!');
      const deleteUserAccount = httpsCallable(functions, 'user-deleteUserAccount');
      const deleteUserAccountResponse = await deleteUserAccount({ id });
      return deleteUserAccountResponse;
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

  static updatePassword = async (newPassword: string) => {
    try {
      if (auth.currentUser) { await updatePassword(auth.currentUser, newPassword); }
    } catch (e: any) {
      throw e;
    }
  };

  static updateEmail = async (user: User) => {
    try {
      if (auth.currentUser) { await updateEmail(auth.currentUser, user.email); }
    } catch (e: any) {
      throw e;
    }
  };

  static checkIfSuperAdmin = async () => {
    try {
      const checkIfSuperAdminRef = httpsCallable(functions, 'user-checkIfSuperAdmin');
      const isSuperAdmin = await checkIfSuperAdminRef();
      return isSuperAdmin.data;
    } catch (e: any) {
      throw e;
    }
  };
}

export default UserService;
