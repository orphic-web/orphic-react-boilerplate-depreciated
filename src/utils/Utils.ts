import SupportedLanguages from '../models/enums/SupportedLanguages';
import translator from '../theme/translator.json';

abstract class Utils {
  /**
   * Convert name to minified version
   * @param {string} name
   * @returns {string} minified name
   */
  static stringAvatar = (name: string) => {
    let child = `${name[0]}${name[1]}${name[2]}`;

    if (name.split(' ').length >= 2 && name.split(' ')[1][0]) {
      child = `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`;
    }

    return child;
  };

  /**
   * Util function that calculate the first day of the week.
   *      - Used for getting the start date of the week
   * @condition
   *      - FirstDayOfWeek start time are sunday's at 4 am
   * @params Date
   * @return Date
  */
  static firstDayOfWeek = (dateObject: Date) => new Promise<Date>((resolve) => {
    try {
      const date = dateObject;
      if (date.getDay() === 0) {
        const dateMin = new Date(date);
        dateMin.setHours(4, 0, 0, 0);
        if (date.getTime() >= dateMin.getTime()) {
          date.setHours(4, 0, 0, 0);
          resolve(date);
        } else {
          date.setDate(date.getDate() - 7);
          date.setHours(4, 0, 0, 0);
          resolve(date);
        }
      }
      date.setDate(date.getDate() - (date.getDay() || 7));
      date.setHours(4, 0, 0, 0);
      resolve(date);
    } catch (e) {
      const error: any = e;
      throw new Error(error.message);
    }
  });

  /**
   * Get the Display value of a field on current language
   *
   * @param {string} language
   * @param {any} field
   * @returns {string} the display value
   */
  static getTranslation = (field: any, language?: string): string => {
    let lang = language;
    let translation = '';
    if (!lang) lang = SupportedLanguages.DEFAULT;
    translation = field[lang];
    return translation;
  };

  /**
   * Get the Display value of an enum translated to current language
   *
   * * I know this hurts to watch...but it also hurt to code. I hope in the future
   * * we either stray from this horrible path TypeScript has laid out for us and we
   * * can reminisce the past with a tear in eye, celebrating the progress the human
   * * being has made over the last decades. But anyway, it works, so we should just
   * * use this despicable lump of code... cause it works!
   * *                                                      — the intern, 2022-05-18
   *
   * @param {string} language
   * @param {string} values the enum in camelCase
   * @param {string} value the value in the enum
   *
   * @returns {string | boolean} the translated value or false if value was not found in translator
   */
  static getTranslatedEnumValue = (language: string, values: string, value: string): string | boolean => {
    // Get all the enums
    const enums = Object.entries(translator.models.enums);

    // Find the corresponding enum object
    let enumObject: any[] = [];
    enums.forEach((enumObjectTemp: any[]) => {
      if (enumObjectTemp[0] === values) enumObject = Object.entries(enumObjectTemp[1]);
    });
    if (!enumObject.length) return false;

    // Find the corresponding value
    let valueObject;
    enumObject.forEach((valueObjectTemp: any[]) => {
      if (valueObjectTemp[0] === value) valueObject = { ...valueObjectTemp[1] };
    });
    if (!valueObject) return false;

    // Call the translation utility
    return this.getTranslation(language, valueObject);
  };

  /**
   * Creates an array of options from an enum
   *
   * ? We should use getTranslatedEnumValue method here for the label
   *
   * @param {enum} values
   * @returns {Array<{ string, string }>} an array of options
   */
  static optionsFromEnum = (values: any) => {
    const options: any[] = [];
    (Object.keys(values) as (keyof typeof values)[]).map(
      (key, index) => options.push(
        { value: values[key], label: values[key] },
      ),
    );
    return options;
  };
}

export default Utils;
