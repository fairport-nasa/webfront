import { constants } from '../../global/constants';
import { DataController } from './DataController';
import { log } from '../utils/log';

import { WebSocketServer } from 'ws';

/**
 * Starts the socket server.
 * @param data The data controller to pull from.
 * @returns The created socket server.
 */
export const startSocket = async (data: DataController): Promise<WebSocketServer> => {
    const port = process.env.SOCKET_PORT ? parseInt(process.env.SOCKET_PORT) : constants.DEFAULT_SOCKET_PORT;
    const ws = new WebSocketServer({ port });

    ws.on(`connection`, (socket) => {
        log(`green`, `Socket connection opened`);

        const liveDataInterval = setInterval(() => {
            data.liveSensors.forEach((sensor) => socket.send(JSON.stringify({
                op: 0,
                d: sensor
            })));
        }, process.env.LIVE_DATA_INTERVAL ? parseInt(process.env.LIVE_DATA_INTERVAL) : constants.DEFAULT_LIVE_DATA_INTERVAL);

        socket.on(`close`, () => {
            log(`red`, `Socket connection closed`);
            clearInterval(liveDataInterval);
        });
    });

    return new Promise((resolve) => {
        ws.on(`listening`, () => {
            log(`green`, `Socket listening on ws://127.0.0.1:${port}`);
            resolve(ws);
        });
    });
};
