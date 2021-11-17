// Import modules.
interface Config {
    port: number
}

/**
 * Program configuration.
 */
export default {
    dev: { port: 8080 },

    prod: { port: 80 }
} as {
    dev: Config
    prod: Config
};
