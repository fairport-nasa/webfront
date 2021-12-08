"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.log = void 0;
const constants_1 = require("../../global/constants");
const timestamp_1 = require("./timestamp");
const log = (color, type, msg) => {
    if (!color)
        throw new TypeError(`No logging color provided.`);
    if (!type)
        throw new TypeError(`No logging type provided`);
    console.log(`${constants_1.constants.CONSOLE_COLORS[`white`]}${(0, timestamp_1.timestamp)()} \x1b[2m|\x1b[0m \x1b[1m${constants_1.constants.LOG_TYPES[type]}${type}\x1b[0m \x1b[2m|\x1b[0m${constants_1.constants.CONSOLE_COLORS[color]}`, msg);
};
exports.log = log;
