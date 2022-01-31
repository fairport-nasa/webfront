import { resolve } from 'path';

/**
 * The config controller.
 * Read / writes from the `config.json` file.
 */
export class ConfigController {
    /**
     * The path to the configuration file.
     */
    public readonly FILE_PATH: string = resolve(__dirname, `../../../config.json`);
}
