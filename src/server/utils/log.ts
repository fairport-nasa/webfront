import { constants } from '../../global/constants';
import { timestamp } from './timestamp';

/**
 * Simplified formatted logging.
 * @param color The color to log with.
 * @param type The log type.
 * @param msg The message to log.
 */
export const log = (color: keyof typeof constants.CONSOLE_COLORS, type: keyof typeof constants.LOG_TYPES, msg: any): void => {
    if (!color) throw new TypeError(`No logging color provided.`);
    if (!type) throw new TypeError(`No logging type provided`);
    console.log(`${constants.CONSOLE_COLORS[`white`]}${timestamp()} \x1b[2m|\x1b[0m \x1b[1m${constants.LOG_TYPES[type]}${type}\x1b[0m \x1b[2m|\x1b[0m${constants.CONSOLE_COLORS[color]}`, msg);
};
