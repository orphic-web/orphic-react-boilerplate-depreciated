import * as functions from 'firebase-functions';

/**
 * Convert string formatted date in a Date Object
 * @param {string} dateString
 * @returns {Date} the converted date
 */
export function convertStringToDate(dateString: string) {
  try {
    return new Date(dateString);
  } catch (e) {
    const error: any = e;
    throw new functions.https.HttpsError(error.code, error.message);
  }
}
