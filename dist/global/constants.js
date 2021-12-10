"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.constants = void 0;
exports.constants = {
    CONSOLE_COLORS: {
        black: `\x1b[30m`,
        red: `\x1b[31m`,
        green: `\x1b[32m`,
        yellow: `\x1b[33m`,
        blue: `\x1b[34m`,
        magenta: `\x1b[35m`,
        cyan: `\x1b[36m`,
        white: `\x1b[37m`
    },
    DEFAULT_DUMMY_DATA: false,
    DEFAULT_LIVE_DATA_INTERVAL: 100,
    DEFAULT_SOCKET_PORT: 4000,
    DEFAULT_WEBFRONT_PORT: 8080,
    DUMMY_DATA_VALUES: {
        sensorCount: 6,
        start: 6048e5,
        end: 0,
        interval: 5000,
        startY: 750,
        minWalk: -2.99,
        maxWalk: 3,
        minAdditional: 1000,
        maxAdditional: 7500,
        liveDataMinAdd: -400,
        liveDataMaxAdd: 400
    },
    HOST: `0.0.0.0`,
    LOG_TYPES: {
        ERROR: `\x1b[31m`,
        INFO: `\x1b[36m`,
        WARN: `\x1b[33m`
    }
};
