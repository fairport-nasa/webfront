import { constants } from '../../global/constants';
import { DataController } from './DataController';

import fastify, { FastifyInstance } from 'fastify';
import fastifyStatic from 'fastify-static';
import { resolve } from 'path';

/**
 * Starts the webfront server.
 * @param data The data controller to pull from.
 * @returns The created webfront server.
 */
export const startServer = async (data: DataController): Promise<FastifyInstance> => {
    const server = fastify({ logger: true });

    await server.register(fastifyStatic, {
        prefix: `/`,
        root: resolve(__dirname, `../../client/public`)
    });

    server.get(`/`, (req, reply) => {
        return reply.sendFile(`index.html`) as any;
    });

    server.get(`/data`, (req, res) => void res.send(data.sensors));

    await server.listen(process.env.WEBFRONT_PORT ? parseInt(process.env.WEBFRONT_PORT) : constants.DEFAULT_WEBFRONT_PORT);

    return server;
};
