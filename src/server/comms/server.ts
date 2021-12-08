import { constants } from '../../global/constants';
import { DataController } from './DataController';
import { log } from '../utils/log';

import fastify, { FastifyInstance } from 'fastify';
import fastifyStatic from 'fastify-static';
import { resolve } from 'path';

/**
 * Starts the webfront server.
 * @param data The data controller to pull from.
 * @returns The created webfront server.
 */
export const startServer = async (data: DataController): Promise<FastifyInstance> => {
    const port = process.env.WEBFRONT_PORT ? parseInt(process.env.WEBFRONT_PORT) : constants.DEFAULT_WEBFRONT_PORT;
    const server = fastify();

    server.addHook(`onReady`, () => log(`green`, `INFO`, `Webfront listening on http://127.0.0.1:${port}`));
    server.addHook(`onRequest`, (req, res, next) => {
        log(`cyan`, `INFO`, `Webfront ${req.method} ${req.url}`);
        next();
    });
    server.addHook(`onResponse`, (req, res, next) => {
        log(`white`, `INFO`, `Webfront successful response to ${req.method} ${req.url}`);
        next();
    });
    server.addHook(`onError`, (req, res, error) => log(`red`, `ERROR`, `Webfront error code ${error.code} "${error.message}" on ${req.method} ${req.url}`));

    await server.register(fastifyStatic, {
        prefix: `/`,
        root: resolve(__dirname, `../../client/public`)
    });

    server.get(`/`, (req, reply) => {
        return reply.sendFile(`index.html`) as any;
    });

    server.get(`/data`, (req, res) => void res.send(data.sensors));

    await server.listen(port);

    return server;
};
