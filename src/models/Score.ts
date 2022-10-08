type Player = {
    /** The displayed name of the score */
    name: string,

    /** The actual value of the score */
    value: string | boolean | number | undefined,

    /** The minimum value of the score */
    minValue?: number,

    /** The maximum value of the score */
    maxValue?: number,

    /** The default value of the score */
    defaultValue: string | boolean | number | undefined,

    /** The list of intervals at which the quick score editor increment or decrement the value of the score */
    scoreIntervals?: number[],

    /** For example, at molki if value is over 50, value drop to 25 */
    exceptions?: any,
 }

export default Player;
