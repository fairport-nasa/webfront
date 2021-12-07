/**
 * Global constants.
 */
export const constants = {
    /**
     * Console logging colors.
     */
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
    /**
     * The default dummy data boolean.
     */
    DEFAULT_DUMMY_DATA: false,
    /**
     * The default live data interval.
     */
    DEFAULT_LIVE_DATA_INTERVAL: 100,
    /**
     * The default socket port.
     */
    DEFAULT_SOCKET_PORT: 4000,
    /**
     * The default webfront port.
     */
    DEFAULT_WEBFRONT_PORT: 8080,
    /**
     * Values to use when generating dummy data.
     */
    DUMMY_DATA_VALUES: {
        sensorCount: 6,
        /**
         * Should be subtracted from Date.now().
         */
        start: 6048e5,
        /**
         * Should be subtracted from Date.now().
         */
        end: 0,
        interval: 5000,
        startY: 750,
        minWalk: -2.99,
        maxWalk: 3,
        minAdditional: 1000,
        maxAdditional: 7500,
        liveDataMinAdd: -400,
        liveDataMaxAdd: 400
    }
} as const;
