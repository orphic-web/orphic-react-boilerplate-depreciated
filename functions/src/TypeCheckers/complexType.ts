import * as functions from 'firebase-functions';
import ErrorCodes from '../models/enums/ErrorCodes';
import SupportedLanguages from '../models/enums/SupportedLanguages';
import { isString } from './primitiveType';

/**
 *  TypeChecker that verify the format of a user Object
 *
 * @param {string} language
 * @returns {SupportedLanguages} language
 */

export async function isSupportedLanguage(language: string): Promise<SupportedLanguages> {
  try {
    if (!language) throw new functions.https.HttpsError(ErrorCodes.INVALID_ARGUMENT, 'Invalid argument : language is undefined.');
    await isString('language', language) as SupportedLanguages;

    if (!(<any>Object).values(SupportedLanguages).includes(language)) {
      throw new functions.https.HttpsError(ErrorCodes.UNIMPLEMENTED, `Invalid argument : ${language} is not supported yet.`);
    }
    return language as SupportedLanguages;
  } catch (e) {
    const error: any = e;
    throw new functions.https.HttpsError(error.code, error.message);
  }
}
