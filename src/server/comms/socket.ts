import { constants } from '../../global/constants';
import { DataController } from '../controllers/DataController';
import { log } from '../utils/log';

import { WebSocketServer } from 'ws';

/**
 * Starts the socket server.
 * @param data The data controller to pull from.
 * @returns The created socket server.
 */
export const startSocket = async (data: DataController): Promise<WebSocketServer> => {
    const port = process.env.SOCKET_PORT ? parseInt(process.env.SOCKET_PORT) : constants.DEFAULT_SOCKET_PORT;
    const ws = new WebSocketServer({
        host: constants.HOST,
        port
    });

    ws.on(`connection`, (socket) => {
        log(`green`, `INFO`, `Socket connection opened`);

        const liveDataInterval = setInterval(() => {
            data.liveSensors.forEach((sensor) => socket.send(JSON.stringify({
                op: 1,
                d: sensor
            })));
        }, process.env.LIVE_DATA_INTERVAL ? parseInt(process.env.LIVE_DATA_INTERVAL) : constants.DEFAULT_LIVE_DATA_INTERVAL);

        socket.on(`close`, () => {
            log(`red`, `INFO`, `Socket connection closed`);
            clearInterval(liveDataInterval);
        });
    });

    return await new Promise((resolve) => {
        ws.on(`listening`, () => {
            log(`green`, `INFO`, `Socket listening on ws://${constants.HOST}:${port}`);
            resolve(ws);
        });
    });
};
