import { constants } from '../../global/constants';
import { timestamp } from './timestamp';

/**
 * Simplified formatted logging.
 * @param color The color to log with.
 * @param msg The message to log.
 */
export const log = (color: keyof typeof constants.CONSOLE_COLORS, msg: any): void => {
    if (!color) throw new Error(`No logging color provided.`);
    console.log(`${constants.CONSOLE_COLORS[`white`]}${timestamp()} |${constants.CONSOLE_COLORS[color]}`, msg);
};
