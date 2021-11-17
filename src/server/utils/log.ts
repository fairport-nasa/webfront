import Constants from '../config/Constants';
import timestamp from './timestamp';

/**
 * Simplified formatted logging.
 * @param color The color to log with.
 * @param msg The message to log.
 */
export default (color: keyof typeof Constants.CONSOLE_COLORS, msg: any): void => {
    if (!color) throw new Error(`No logging color provided.`);
    console.log(`${Constants.CONSOLE_COLORS[`white`]}${timestamp()} |${Constants.CONSOLE_COLORS[color]}`, msg);
};
