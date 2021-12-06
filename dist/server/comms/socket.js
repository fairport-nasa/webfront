"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.startSocket = void 0;
const constants_1 = require("../../global/constants");
const log_1 = require("../utils/log");
const ws_1 = require("ws");
const startSocket = async (data) => {
    const port = process.env.SOCKET_PORT ? parseInt(process.env.SOCKET_PORT) : constants_1.constants.DEFAULT_SOCKET_PORT;
    const ws = new ws_1.WebSocketServer({ port });
    ws.on(`connection`, (socket) => {
        (0, log_1.log)(`green`, `Socket connection opened`);
        const liveDataInterval = setInterval(() => {
            data.liveSensors.forEach((sensor) => socket.send(JSON.stringify({
                op: 0,
                d: sensor
            })));
        }, process.env.LIVE_DATA_INTERVAL ? parseInt(process.env.LIVE_DATA_INTERVAL) : constants_1.constants.DEFAULT_LIVE_DATA_INTERVAL);
        socket.on(`close`, () => {
            (0, log_1.log)(`red`, `Socket connection closed`);
            clearInterval(liveDataInterval);
        });
    });
    return new Promise((resolve) => {
        ws.on(`listening`, () => {
            (0, log_1.log)(`green`, `Socket listening on ws://127.0.0.1:${port}`);
            resolve(ws);
        });
    });
};
exports.startSocket = startSocket;
