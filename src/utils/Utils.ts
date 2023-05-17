abstract class DateUtils {
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
   * Creates an array of options from an enum
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

export default DateUtils;
