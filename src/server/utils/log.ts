import { timestamp } from './timestamp';

/**
 * Node.js console colors.
 */
const CONSOLE_COLORS = {
    black: `\x1b[30m`,
    red: `\x1b[31m`,
    green: `\x1b[32m`,
    yellow: `\x1b[33m`,
    blue: `\x1b[34m`,
    magenta: `\x1b[35m`,
    cyan: `\x1b[36m`,
    white: `\x1b[37m`
} as const;

/**
 * Simplified formatted logging.
 * @param color The color to log with.
 * @param msg The message to log.
 */
export const log = (color: keyof typeof CONSOLE_COLORS, msg: any): void => {
    if (!color) throw new Error(`No logging color provided.`);
    console.log(`${CONSOLE_COLORS[`white`]}${timestamp()} |${CONSOLE_COLORS[color]}`, msg);
};
