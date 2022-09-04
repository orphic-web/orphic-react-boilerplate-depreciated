class UtilsService {
  /**
     * Convert string to color hex code
     * @param {string} string
     * @returns {string} hex color code
     */
  static stringToColor = (string: string) => {
    let hash = 0;
    let i;

    /* eslint-disable no-bitwise */
    for (i = 0; i < string.length; i += 1) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = '#';

    for (i = 0; i < 3; i += 1) {
      const value = (hash >> (i * 8)) & 0xff;
      color += `00${value.toString(16)}`.slice(-2);
    }
    /* eslint-enable no-bitwise */

    return color;
  };

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

    return {
      sx: {
        bgcolor: UtilsService.stringToColor(name),
      },
      children: child,
    };
  };
}

export default UtilsService;
