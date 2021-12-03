import Config from '../config/Config';
import createDummyData from '../utils/createDummyData';
import { GraphData } from '../../global/types';

// Import modules.
import fastify from 'fastify';
import fastifyStatic from 'fastify-static';
import { resolve } from 'path';

export default async (): Promise<void> => {
    const server = fastify({ logger: true });

    await server.register(fastifyStatic, {
        prefix: `/`,
        root: resolve(__dirname, `../../client/public`)
    });

    server.get(`/`, (req, reply) => {
        return reply.sendFile(`index.html`) as any;
    });

    server.get(`/data`, (req, res) => {
        const data: GraphData = [];
        for (let i = 0; i <= 9; i++) {
            data.push({
                color: `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)})`,
                data: createDummyData(Date.now() - 30 * 86400 * 1e3, Date.now(), 5000, 750, -2.99, 3),
                label: `Random data ${i}`,
                yLabel: `Unit`
            });
        }
        res.send(data);
    });

    await server.listen(Config[process.env.NODE_ENV as `dev` | `prod`].port);
};
