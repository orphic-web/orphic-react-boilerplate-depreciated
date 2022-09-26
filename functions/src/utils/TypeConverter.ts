import { firestore } from 'firebase-admin';
import * as functions from 'firebase-functions';

/**
 * Converts a string formatted date to a Date Object
 *
 * @param {string} dateString The string to convert
 * @returns {Date} The converted date
 */
export function convertStringToDate(dateString: string): Date {
  try {
    return new Date(dateString);
  } catch (e) {
    const error: any = e;
    throw new functions.https.HttpsError(error.code, error.message);
  }
}

/**
 * Converts a Date to a Timestamp. Also accepts a firestore Timestamp as a
 * parameter to avoid writing too many checks.
 *
 * @param {Date | firestore.Timestamp} date The Date to convert.
 * @return {firestore.Timestamp} The Date converted to a firestore Timestamp.
 */
export function convertDateToTimestamp(date: Date | firestore.Timestamp): firestore.Timestamp {
  if (date instanceof firestore.Timestamp) return date;
  return firestore.Timestamp.fromDate(date);
}
