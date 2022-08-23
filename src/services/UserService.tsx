/* eslint-disable no-useless-catch */
import {
  User as FirebaseUser, updateEmail, updatePassword, signInWithEmailAndPassword, signOut, createUserWithEmailAndPassword,
} from 'firebase/auth';
import {
  doc, collection, setDoc, deleteDoc, updateDoc,
} from 'firebase/firestore';

import { auth, db } from '../FirebaseConfig';
import Permissions from '../models/enums/Permissions';
import User from '../models/User';

class UserService {
  /**
   * Sign in a user by email & password
   *
   * @param {string} email
   * @param {string} password
   * @returns {void}
   */
  static login = (email: string, password: string) => signInWithEmailAndPassword(auth, email, password);

  /**
   * Sign out a user
   *
   * @returns {void}
   */
  static logout = () => signOut(auth);

  /**
   * Create a firebase user
   *
   * @param {string} email
   * @param {string} password
   * @returns {void}
   */
  static createAccount = (email: string, password: string) => createUserWithEmailAndPassword(auth, email, password);

  /**
   * Create a user document
   *
   * @param {string} id
   * @param {string} name
   * @param {string} email
   * @param {string} language
   * @returns {timestamp} write time
   */
  static create = async (id:string, name: string, email: string, language: string) => {
    const usersRef = collection(db, 'Users');

    const newUser = {
      id,
      name,
      email,
      permission: Permissions.USER,
      language,
    };

    return setDoc(doc(usersRef, id), newUser);
  };

  /**
   * Gets a user document by id
   *
   * @param {string} id
   * @returns {User} user
   */
  static get = async (id: string) => doc(db, 'Users', id);

  /**
   * Delete user firebase user
   *
   * @param {FirebaseUser} firebaseUser
   * @returns {timestamp} write time
   */
  static deleteAccount = (firebaseUser: any) => {
    firebaseUser.delete();
  };

  /**
   * Delete user document
   *
   * @param {string} id
   * @returns {timestamp} write time
   */
  static delete = (id: string) => deleteDoc(doc(db, 'Users', id));

  /**
   * Updates user password
   *
   * @param {FirebaseUser} firebaseUser
   * @param {string} newPassword
   * @returns {timestamp} write time
   */
  static updatePassword = (currentUser: FirebaseUser, newPassword: string) => updatePassword(currentUser, newPassword);

  /**
   * Updates user email
   *
   * @param {FirebaseUser} firebaseUser
   * @param {string} email
   * @returns {timestamp} write time
   */
  static updateEmail = (currentUser: FirebaseUser, newEmail: string) => updateEmail(currentUser, newEmail);

  /**
   * Updates user document
   *
   * @param {User} user
   * @returns {timestamp} write time
   */
  static update = (user: User) => updateDoc(doc(db, 'Users', user.id), user);
}

export default UserService;
