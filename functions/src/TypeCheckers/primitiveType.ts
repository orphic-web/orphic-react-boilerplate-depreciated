import * as functions from 'firebase-functions';
import ErrorCodes from '../models/enums/ErrorCodes';
import { convertStringToDate } from '../utils/TypeConverter';

/**
 * @desc TypeChecker that verify the format of an string object
 * @param {string} description
 * @param {string} variable
 * @returns {string} variable
 */
export function isString(description: string, variable: string): string {
  try {
    if (variable === undefined) throw new functions.https.HttpsError(ErrorCodes.INVALID_ARGUMENT, `Invalid argument : ${description} is undefined.`);
    if (typeof variable !== 'string') throw new functions.https.HttpsError(ErrorCodes.INVALID_ARGUMENT, `Invalid argument : ${description}`);
    return variable;
  } catch (e) {
    const error: any = e;
    throw new functions.https.HttpsError(error.code, error.message);
  }
}

/**
 * @desc TypeChecker that verify the format of a number object
 * @param {description: string, variable: number
 * @returns {variable: number
 */
export function isNumber(description: string, variable: number): number {
  try {
    if (variable === undefined) throw new functions.https.HttpsError(ErrorCodes.INVALID_ARGUMENT, `Invalid argument : ${description} is undefined.`);
    if (typeof variable !== 'number') throw new functions.https.HttpsError(ErrorCodes.INVALID_ARGUMENT, `Invalid argument : ${description}`);
    return variable;
  } catch (e) {
    const error: any = e;
    throw new functions.https.HttpsError(error.code, error.message);
  }
}

/**
 * @desc TypeChecker that verify the format of a boolean object
 * @param {description: string, variable: boolean
 * @returns {variable: boolean
 */
export function isBoolean(description: string, variable: boolean): boolean {
  try {
    if (variable === undefined) throw new functions.https.HttpsError(ErrorCodes.INVALID_ARGUMENT, `Invalid argument : ${description} is undefined.`);
    if (typeof variable !== 'boolean') throw new functions.https.HttpsError(ErrorCodes.INVALID_ARGUMENT, `Invalid argument : ${description}`);
    return variable;
  } catch (e) {
    const error: any = e;
    throw new functions.https.HttpsError(error.code, error.message);
  }
}

/**
 * @desc TypeChecker that verify the format of a string formatted date and return a Date object.
 * @param {description: string, variable: string
 * @returns {variable: Date
 */
export function isStringDate(description: string, variable: string | Date): Date {
  try {
    let date = variable;

    if (date === undefined) throw new functions.https.HttpsError(ErrorCodes.INVALID_ARGUMENT, `Invalid argument : ${description} is undefined.`);
    if (typeof date === 'string') {
      date = isString(description, date);
      date = convertStringToDate(date);
      date = isDate(description, date);
    } else if ((date instanceof Date)) {
      date = isDate(description, date);
    }

    return date;
  } catch (e) {
    const error: any = e;
    throw new functions.https.HttpsError(error.code, error.message);
  }
}

/**
 * @desc TypeChecker that verify the format of a date object
 * @param {description: string, variable: Date
 * @returns {variable: Date
 */
export function isDate(description: string, variable: Date): Date {
  try {
    const date: Date = variable;
    if (date === undefined) throw new functions.https.HttpsError(ErrorCodes.INVALID_ARGUMENT, `Invalid argument : ${description} is undefined.`);
    if (!(date instanceof Date) || Number.isNaN(date.getTime())) {
      throw new functions.https.HttpsError(ErrorCodes.INVALID_ARGUMENT, `Invalid argument : ${description}`);
    }
    return date;
  } catch (e) {
    const error: any = e;
    throw new functions.https.HttpsError(error.code, error.message);
  }
}
