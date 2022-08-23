/**
 * @desc Trigger that execute when any user is updated.
 * @param {user: User}
 */
// exports.onUpdateUser = functions.firestore
//   .document('Users/{userId}')
//   .onUpdate(async (change, context) => {
//     const newUser: User = change.after.data() as User;
//     const previousUser = change.before.data();

//     // Check if we have to sync the stripe account associated with the updated user
//     if (newUser.name !== previousUser.name || newUser.email !== previousUser.email) {
//       await handleUpdateStripeCustomer(newUser);
//     }
//   });

/**
 * @desc Trigger that execute when any user is deleted.
 * @param {user: User}
 */
// exports.onDeleteUser = functions.firestore
//   .document('Users/{userId}')
//   .onDelete(async (snap, context) => {
//     const deletedUser = snap.data();

//     // Delete the stripe customer related to the deleted user
//     await handleDeleteStripeCustomer(deletedUser.userId);
//   });
