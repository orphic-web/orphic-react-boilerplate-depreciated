import * as admin from 'firebase-admin';
import AvailableLanguages from '../models/enums/SupportedLanguages';
import WeekDays from '../models/enums/WeekDays';
import { isInEnum } from '../TypeCheckers/complexType';

/**
 * Clears all documents in specified collection.
 *
 * @returns {Promise<void>} A promise completion of the Collection Deletion
 */
export async function clearCollection(path: string): Promise<void> {
  const ref = admin.firestore().collection(path);
  ref.onSnapshot((snapshot) => {
    snapshot.docs.forEach((doc) => {
      ref.doc(doc.id).delete();
    });
  });
}

/**
 * Returns the intersection of two arrays of objects, filtered by a specified property.
 *
 * @param {string} key The name of the key for the intersection.
 * @param {any[]} arrayA The first array of the intersection.
 * @param {any[]} arrayB The second array of the intersection.
 * @returns {any[]} The intersection of the two arrays.
 */
export function intersectArraysByProp(key: string, arrayA: any[], arrayB: any[]): any[] {
  const mapA = new Map(
    arrayA.map((object: any) => [object[key], object]),
  );

  return arrayB.filter((objectB: any) => mapA.get(objectB[key]));
}

/**
 * Returns the current week's first day at 00:00:00 UTC-0400 based on a specified `firstDayOfWeek`.
 *
 * @param {WeekDays} firstDayOfWeek The first day of the week for the period.
 * @returns {Date} The current week's start date.
 */
export function getCurrentWeekStartDate(firstDayOfWeek: WeekDays): Date {
  const today = new Date();

  let date = today.getDate() - today.getDay() + firstDayOfWeek;
  if (date > today.getDate()) date -= 7;

  const weekStart = new Date(today.setDate(date));
  weekStart.setUTCHours(0, 0, 0, 0);

  return weekStart;
}

/**
 * Returns the current week's first day at 00:00:00 UTC-0400 based on a specified `firstDayOfWeek`.
 *
 * @param {WeekDays} firstDayOfWeek The first day of the week for the period.
 * @returns {Date} The current week's start date.
 */
export function getCurrentWeekEndDate(firstDayOfWeek: WeekDays): Date {
  const start = getCurrentWeekStartDate(firstDayOfWeek);
  const date = start.getDate() + 6;

  const weekEnd = new Date(start.setDate(date));
  weekEnd.setUTCHours(23, 59, 59, 999);

  return weekEnd;
}

/**
 * Returns a week's first day at 00:00:00 UTC-0400 based on a specified `firstDayOfWeek`.
 *
 * @param {WeekDays} firstDayOfWeek The first day of the week for the period.
 * @param {Date} day The date of any day from the week, defaults to today.
 * @returns {Date} The current week's start date.
 */
export function getWeekStartDate(firstDayOfWeek: WeekDays, day: Date = new Date()): Date {
  let date = day.getDate() - day.getDay() + firstDayOfWeek;
  if (date > day.getDate()) date -= 7;

  const weekStart = new Date(day.setDate(date));
  weekStart.setUTCHours(0, 0, 0, 0);

  return weekStart;
}

/**
 * Returns a week's last day at 23:59:59 UTC-0400 based on a specified `firstDayOfWeek`.
 *
 * @param {WeekDays} firstDayOfWeek The first day of the week for the period.
 * @param {Date} day The date of any day from the week, defaults to today.
 * @returns {Date} The current week's start date.
 */
export function getWeekEndDate(firstDayOfWeek: WeekDays, day: Date = new Date()): Date {
  const start = getWeekStartDate(firstDayOfWeek, day);
  const date = start.getDate() + 6;

  const weekEnd = new Date(start.setDate(date));
  weekEnd.setUTCHours(23, 59, 59, 999);

  return weekEnd;
}

/**
 * Get the Display value of a field on the specified language.
 *
 * @param {string} language
 * @param {any} field
 * @param {any} params
 * @returns {string} the display value
 */
export function getTranslation(language: string, field: any, params?: any): string {
  let lang = isInEnum('language', language, AvailableLanguages);
  let translation = '';
  if (!lang) lang = AvailableLanguages.DEFAULT;
  translation = field[lang];
  if (params) {
    // eslint-disable-next-line guard-for-in, no-restricted-syntax
    for (const key in params) {
      if (typeof params[key] === 'string') translation = translation.replace(`{${key}}`, params[key]);
    }
  }
  return translation;
}

/**
 * Formats a duration to a string.
 *
 * @param {number} duration The duration, in seconds.
 * @returns {string} The formatted duration.
 */
export function formatDuration(duration: number): string {
  let seconds = duration;

  const hours = Math.floor(seconds / 3600);
  seconds %= 3600;

  const minutes = Math.floor(seconds / 60);
  seconds %= 60;

  let res = '';

  if (hours) {
    res += `${hours}h`;
    if (!minutes && seconds) res += '00min';
  }
  if (minutes) {
    res += hours
      ? `${`00${minutes}`.substring(minutes.toString().length)}min`
      : `${minutes}min`;
  }
  if (seconds && !hours) {
    res += hours || minutes
      ? `${`00${seconds}`.substring(seconds.toString().length)}s`
      : `${seconds}s`;
  }

  return res;
}
