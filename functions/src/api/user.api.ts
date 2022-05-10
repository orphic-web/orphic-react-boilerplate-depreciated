import * as functions from 'firebase-functions';
import { handleCreateUser } from '../controllers/user.handler';
import { isString } from '../typeCheckers/Primitives';

/**
 * @desc API endpoint that creates a user firestore document data.
 * @param {string} id
 * @param {string} email
 * @param {string} name
 * @returns {User} the newly created user
 */
exports.createUser = functions.region('us-central1').https.onCall(async (data: any, context: any) => {
  try {
    const id: string = isString('id', data.id);
    const email: string = isString('email', data.email);
    const name: string = isString('name', data.name);

    const handleCreateFamilyResponse = await handleCreateUser(id, email, name);
    return handleCreateFamilyResponse;
  } catch (e) {
    const error: any = e;
    throw new functions.https.HttpsError(error.code, error.message);
  }
});
