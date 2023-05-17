/* eslint-disable no-useless-catch */
import {
    User as FirebaseUser, updateEmail, updatePassword, signInWithEmailAndPassword, signOut, createUserWithEmailAndPassword, reauthenticateWithCredential,
} from 'firebase/auth';
import {
    doc, setDoc, deleteDoc, updateDoc, getDoc,
} from 'firebase/firestore';

import { auth, db } from '@/FirebaseConfig';
import Permissions from '@/models/enums/Roles';
import VisibilityStates from '@/models/enums/VisibilityStates';

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
     * @returns {timestamp} write time
     */
    static create = async (id: string, name: string, email: string) => setDoc(doc(db, 'Users', id), {
        id,
        name,
        email,
        permission: Permissions.USER,
        createdDate: new Date(),
        visibility: VisibilityStates.VISIBLE
    });

    /**
     * Gets a user document by id
     *
     * @param {string} id
     * @returns {User} user
     */
    static get = async (id: string) => (await getDoc(doc(db, 'Users', id))).data();

    /**
     * Delete user firebase user
     *
     * @param {firebaseUser} firebaseUser
     * @returns {timestamp} write time
     */
    static deleteAccount = (firebaseUser: FirebaseUser) => {
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
     * @param {string} userId
     * @param {any} user
     * @returns {timestamp} write time
     */
    static update = (userId: string, user: any) => updateDoc(doc(db, 'Users', userId), user);

    /**
     * Reauthenticate user
     *
     * @param {FirebaseUser} firebaseUser
     * @param {string} password
     * @returns {timestamp} write time
     */
    static reauthenticate = (currentUser: FirebaseUser, password: any) => reauthenticateWithCredential(currentUser, password);
}

export default UserService;