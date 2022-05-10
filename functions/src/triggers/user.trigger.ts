import * as functions from 'firebase-functions';

/**
 * @desc Trigger that execute when any user is updated.
 * @param {user: User
 */
exports.onUpdateUser = functions.firestore
  .document('Users/{userId}')
  .onUpdate(async (change, context) => {
    console.log('new user created');
  });
