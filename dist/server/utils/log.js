"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.log = void 0;
const constants_1 = require("../../global/constants");
const timestamp_1 = require("./timestamp");
const log = (color, msg) => {
    if (!color)
        throw new Error(`No logging color provided.`);
    console.log(`${constants_1.constants.CONSOLE_COLORS[`white`]}${(0, timestamp_1.timestamp)()} |${constants_1.constants.CONSOLE_COLORS[color]}`, msg);
};
exports.log = log;
