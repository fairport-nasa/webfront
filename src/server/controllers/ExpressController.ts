import Config from '../config/Config';
import data from '../routes/data';
import log from '../utils/log';

// Import modules.
import express, { Express } from 'express';
import { json, urlencoded } from 'body-parser';
import { resolve } from 'path';

/**
 * The express controller.
 * Handles serving assets to the client, as well as routes.
 */
export default class ExpressController {
    /**
     * The controller's express app.
     */
    public app: Express = express();

    /**
     * Create an express controller.
     */
    constructor() {
        this.app.use(json({ limit: `10mb` }));
        this.app.use(urlencoded({
            extended: true, limit: `10mb`
        }));

        this.app.use((req, res, next) => {
            log(`white`, `${req.method} ${req.path}`);
            next();
        });

        this.app.get(`/`, (req, res) => res.sendFile(resolve(__dirname, `../../client/views/index.html`)));

        this.app.use(`/data`, data);

        this.app.use(express.static(resolve(__dirname, `../../client/public`)));
        this.app.listen(Config[process.env.NODE_ENV!].port, () => {
            log(`magenta`, `Express controller ready`);
            log(`magenta`, `Webfront listening at http://127.0.0.1:${Config[process.env.NODE_ENV!].port}`);
        });
    }
}
