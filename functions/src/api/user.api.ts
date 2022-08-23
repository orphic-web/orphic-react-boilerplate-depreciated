import * as functions from 'firebase-functions';

import {
  handleCheckIfSuperAdmin,
  handleCreateFirestoreAccount,
  handleDeleteUser,
  handleGetUserById,
} from '../controllers/user.handler';
import ErrorCodes from '../models/enums/ErrorCodes';
import User from '../models/User';
import { isSupportedLanguage } from '../TypeCheckers/complexType';
import { isString } from '../TypeCheckers/primitiveType';

/**
 * API endpoint that creates a user account to firestore
 *
 * @param {string} id
 * @param {string} email
 * @param {string} name
 * @param {string} language
 * @returns {FirebaseFirestore.WriteResult} Write result
 */
exports.createUserAccount = functions.region('us-central1').https.onCall(async (data: any, context: any) => {
  try {
    // Permission - Checks if the request comes from an authenticated user
    if (!context.auth) throw new functions.https.HttpsError(ErrorCodes.PERMISSION_DENIED, 'Permission denied');
    const user = handleGetUserById(context.auth.uid);
    console.log(user);
    const id = isString('id', data.id);
    const name = isString('name', data.name);
    const email = isString('email', data.email);
    const language = await isSupportedLanguage(data.language);

    return handleCreateFirestoreAccount(id, email, name, language);
  } catch (e) {
    const error: any = e;
    throw new functions.https.HttpsError(error.code, error.message);
  }
});

/**
 * API endpoint that checks if the request user is admin
 *
 * @returns {boolean} isSuperAdmin
 */
exports.checkIfSuperAdmin = functions.region('us-central1').https.onCall(async (data: any, context: any) => {
  try {
    // Permission - Checks if the request comes from an authenticated user
    if (!context.auth) throw new functions.https.HttpsError(ErrorCodes.PERMISSION_DENIED, 'Permission denied');

    const handleCheckIfSuperAdminResponse = await handleCheckIfSuperAdmin(context.auth.uid);
    return handleCheckIfSuperAdminResponse;
  } catch (e) {
    const error: any = e;
    throw new functions.https.HttpsError(error.code, error.message);
  }
});

/**
 * API endpoint that deletes a firestore user
 *
 * @param {string} id
 * @returns {FirebaseFirestore.WriteResult} Write result
 */
exports.deleteUser = functions.region('us-central1').https.onCall(async (data: any, context: any) => {
  try {
    // Permission - Checks if the request comes from an authenticated user
    if (!context.auth) throw new functions.https.HttpsError(ErrorCodes.PERMISSION_DENIED, 'Permission denied');

    const id = isString('id', data.id);
    const user = await handleGetUserById(id) as User;
    const requestUser = await handleGetUserById(context.auth.uid) as User;

    // Permission - Checks if its the user himself that is trying to update
    if (requestUser.id !== user.id) throw new functions.https.HttpsError(ErrorCodes.PERMISSION_DENIED, 'Permission denied');

    const handleDeleteUserResponse = await handleDeleteUser(id);
    return handleDeleteUserResponse;
  } catch (e) {
    const error: any = e;
    throw new functions.https.HttpsError(error.code, error.message);
  }
});
