import * as functions from 'firebase-functions';
import ErrorCodes from '../models/enums/ErrorCodes';
import userService from '../helpers/user.helper';

/**
 * Handler that implements the logic of creating a firestore user
 * @param {string} id
 * @param {string} email
 * @param {string} name
 * @returns {Family} the newly created user
 */
export async function handleCreateUser(id: string, email: string, name: string) {
  try {
    const userEmailIsUnique = await userService.userEmailIsUnique(email);
    if (!userEmailIsUnique) throw new functions.https.HttpsError(ErrorCodes.ALREADY_EXISTS, 'This email is already used by another account.');

    const createUserResponse = await userService.createUser(id, email, name);
    return createUserResponse;
  } catch (e) {
    const error: any = e;
    throw new functions.https.HttpsError(error.code, error.message);
  }
}
