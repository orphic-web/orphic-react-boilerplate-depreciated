import * as admin from 'firebase-admin';
import User from '../models/User';
import SupportedLanguages from '../models/enums/SupportedLanguages';

export default class UserService {
  /**
   * Helper that creates a user to firestore
   *
   * @param {string} id
   * @param {string} email
   * @param {string} name
   * @param {SupportedLanguages} language
   * @returns {FirebaseFirestore.WriteResult} Write result
   */
  static async createUserAccount(id: string, email: string, name: string, language: SupportedLanguages) {
    const user: User = {
      id,
      email,
      name,
      language,
    };
    return admin.firestore().collection('Users').doc(user.id).set(user);
  }

  /**
   * Helper that checks if the specified user.id is a super admin
   *
   * @param {string} id
   * @returns {boolean} isSuperAdmin
   */
  static async checkIfSuperAdminResponse(id: string) {
    const snapshot = await admin.firestore().collection('SuperAdmins').doc(id).get();
    if (snapshot.data()) return true;
    return false;
  }

  /**
   * Helper that deletes a user firestore data
   *
   * @param {string} id
   * @returns {FirebaseFirestore.WriteResult} write result
   */
  static async deleteUser(id: string) {
    return admin.firestore().collection('Users').doc(id).delete();
  }

  /**
   * Helper that fetches a user by id
   *
   * @param {string} id
   * @returns {User} user
   */
  static async getUserById(id: string) {
    const snapshot = await admin.firestore().collection('Users').doc('asdasdasd').get();
    return snapshot.data();
  }
}
