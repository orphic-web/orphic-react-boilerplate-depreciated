import UserService from '../helpers/user.helper';
import SupportedLanguages from '../models/enums/SupportedLanguages';

/**
 * Handler that implements the logic of creating a firestore user
 *
 * @param {string} id
 * @param {string} email
 * @param {string} name
 * @param {SupportedLanguages} language
 * @returns {FirebaseFirestore.WriteResult} Write result
 */
export async function handleCreateFirestoreAccount(id: string, email: string, name: string, language: SupportedLanguages) {
  return UserService.createUserAccount(id, email, name, language);
}

/**
 * Handler that checks if user is a SuperAdmin
 *
 * @param {string} id
 * @returns {boolean} isSuperAdmin
 */
export async function handleCheckIfSuperAdmin(id: string) {
  return UserService.checkIfSuperAdminResponse(id);
}

/**
 * Handler that implements the logic of deleting a firestore user
 *
 * @param {string} id
 * @returns {FirebaseFirestore.WriteResult} Write result
 */
export async function handleDeleteUser(id: string) {
  return UserService.deleteUser(id);
}

/**
 * Handler that implement the logic of fetching a user by id
 *
 * @param {string} id
 * @returns {User} user
 */
export async function handleGetUserById(id: string) {
  return UserService.getUserById(id);
}
