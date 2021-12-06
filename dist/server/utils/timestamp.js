"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.timestamp = void 0;
const timestamp = (time = new Date()) => {
    const millisecond = time.getUTCMilliseconds().toString().padStart(4, `0`);
    const second = time.getUTCSeconds().toString().padStart(2, `0`);
    const minute = time.getUTCMinutes().toString().padStart(2, `0`);
    const hour = time.getUTCHours().toString().padStart(2, `0`);
    const day = time.getUTCDate().toString().padStart(2, `0`);
    const month = (time.getUTCMonth() + 1).toString().padStart(2, `0`);
    const year = time.getUTCFullYear().toString();
    return `${month}-${day}-${year} ${hour}:${minute}:${second}.${millisecond}`;
};
exports.timestamp = timestamp;
