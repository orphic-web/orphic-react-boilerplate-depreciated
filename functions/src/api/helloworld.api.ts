import * as functions from 'firebase-functions';
import HelloworldController from '../controller/helloworld.controller';

import ErrorCodes from '../models/enums/ErrorCodes';
import { isString } from '../TypeCheckers/primitiveType';

/**
 * API endpoint that creates a User Account on Firestore.
 *
 * @param {string} text The full name of the User.
 * @returns {Promise<string>} The newly test.
 */
exports.helloworld = functions.region('us-central1').https.onCall(async (data: any, context: any) => {
  try {
    // Permission - Check if the request comes from an authenticated user
    if (!context.auth) throw new functions.https.HttpsError(ErrorCodes.UNAUTHENTICATED, 'Permission denied');

    const text = isString('text', data.text);

    return await HelloworldController.helloworld(text);
  } catch (e) {
    const error: any = e;
    throw new functions.https.HttpsError(error.code, error.message);
  }
});
