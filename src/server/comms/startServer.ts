import Config from '../config/Config';
import createDummyData from '../utils/createDummyData';
import { RESTGetData } from '../../global/types';

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
        const data: RESTGetData = [];
        for (let i = 1; i <= 6; i++) {
            const dummyData = createDummyData(Date.now() - 30 * 86400 * 1e3, Date.now(), 5000, 750, -2.99, 3);
            data.push({
                color: `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)})`,
                data: dummyData,
                id: `example_id_${i}`,
                name: `Random Data ${i}`,
                max: dummyData[dummyData.length - 1].y + 2000,
                units: `Unit`
            });
        }
        res.send(data);
    });

    await server.listen(Config[process.env.NODE_ENV as `dev` | `prod`].port);
};
