import * as functions from 'firebase-functions';
import ErrorCodes from '../models/enums/ErrorCodes';
import User from '../models/User';
import {
  isString, isStringDate,
} from './primitiveType';
import SupportedLanguages from '../models/enums/SupportedLanguages';

/**
 * TypeChecker that verifies the format of a User Object.
 *
 * @param {User} user The User to be verified.
 * @returns {User} The verified User.
 */
export function isUser(user: User): User {
  try {
    if (!user) throw new functions.https.HttpsError(ErrorCodes.INVALID_ARGUMENT, 'Invalid argument : user is undefined.');

    const newUser = {
      id: isString('userId', user.id),
      email: isString('email', user.email),
      name: isString('name', user.name),
      creationDate: isStringDate('creationDate', user.creationDate),
      language: isInEnum('language', user.language, SupportedLanguages),
    } as User;

    return newUser;
  } catch (e) {
    const error: any = e;
    throw new functions.https.HttpsError(error.code, error.message);
  }
}

/**
 * TypeChecker that verifies is a specified value is in specified enum.
 *
 * @param {string} description A description for the object, appended to the error.
 * @param {any} variable The variable to verify.
 * @param {any} values The enum object.
 * @returns {any} The verified variable.
 */
export function isInEnum(description: string, variable: any, values: any): any {
  if (variable === undefined) throw new functions.https.HttpsError(ErrorCodes.INVALID_ARGUMENT, `Invalid argument : ${description} is undefined.`);
  if (!Object.values(values).includes(variable)) throw new functions.https.HttpsError(ErrorCodes.INVALID_ARGUMENT, `Invalid argument : ${description}`);
  return variable;
}
