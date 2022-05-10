import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import User from '../models/User';

class UserService {
  /**
   * @desc Helper that creates a user to firestore
   * @param {string} id
   * @param {string} name
   * @param {string} email
   * @returns {User} the newly created user
   */
  async createUser(id: string, email: string, name: string) {
    try {
      const docRef = await admin.firestore().collection('Users').doc(id);
      const user: User = {
        id,
        email,
        name,
        activeSession: '',
      };
      await docRef.set(user);
      return user;
    } catch (e) {
      const error: any = e;
      throw new functions.https.HttpsError(error.code, error.message);
    }
  }

  /**
   * @desc Helper that fetches a user by id
   * @param {userId: string}
   * @returns {user: User}
   */
  async getUserById(userId: string) {
    try {
      const snapshot = await admin.firestore().collection('Users').doc(userId).get();
      const user = snapshot.data() as User;

      return user;
    } catch (e) {
      const error: any = e;
      throw new functions.https.HttpsError(error.code, error.message);
    }
  }

  /**
   * @desc Helper that checks if user's email is unique.
   * @param {user: User}
   * @returns {isUnique: boolean}
   */
  async userEmailIsUnique(email: string) {
    try {
      const usersRef = await admin.firestore().collection('Users').where('email', '==', email).get();
      const users: User[] = await Promise.all(usersRef.docs.map((doc: any) => doc.data()));
      if (users.length > 0) return false;
      return true;
    } catch (e) {
      const error: any = e;
      throw new functions.https.HttpsError(error.code, error.message);
    }
  }
}

const userService = new UserService();
export default userService;
