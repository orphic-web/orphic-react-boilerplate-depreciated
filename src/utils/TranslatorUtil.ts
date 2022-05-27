import translator from '../theme/translator.json';

class TranslatorUtils {
  /**
   * Get the Display value of a field on current language
   *
   * @param {string} language
   * @param {any} field
   * @returns {string} the display value
   */
  static getTranslation = (language: string, field: any): string => {
    try {
      if (!language) throw Error('Language is not defined');
      const translation = field[language];
      return translation;
    } catch (e: any) {
      console.log(e);
      console.log(e.message);
      throw e.message;
    }
  };

  /**
   * Get the Display value of an enum translated to current language
   *
   * * I know this hurts to watch...but it also hurt to code. I hope in the future
   * * we either stray from this horrible path TypeScript has laid out for us and we
   * * can reminisce the past with a tear in eye, celebrating the progress the human
   * * being has made over the last decades. But anyway, it works, so we should just
   * * use this despicable lump of code... cause it works!
   * *
   * *                                                      — the intern, 2022-05-18
   *
   * @param {string} language
   * @param {string} values the enum in camelCase
   * @param {string} value the value in the enum
   *
   * @returns {string | boolean} the translated value or false if value was not found in translator
   */
  getTranslatedEnumValue = (language: string, values: string, value: string): string | boolean => {
    try {
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

      return TranslatorUtils.getTranslation(language, valueObject);
    } catch (e: any) {
      console.log(e);
      console.log(e.message);
      throw e.message;
    }
  };

  /**
   * Creates an array of options from an enum
   *
   * @param {enum} values
   * @returns {Array<{ string, string }>} an array of options
   */
  optionsFromEnum = (values: any) => {
    const options: any[] = [];
    (Object.keys(values) as (keyof typeof values)[]).map(
      (key, index) => options.push(
        { value: values[key], label: values[key] },
      ),
    );
    return options;
  };
}

export default TranslatorUtils;
