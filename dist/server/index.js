"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const DataController_1 = require("./comms/DataController");
const log_1 = require("./utils/log");
const server_1 = require("./comms/server");
const socket_1 = require("./comms/socket");
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
if (process.env.WEBFRONT_PORT && isNaN(parseInt(process.env.WEBFRONT_PORT)))
    throw new Error(`WEBFRONT_PORT is not a number.`);
if (process.env.SOCKET_PORT && isNaN(parseInt(process.env.SOCKET_PORT)))
    throw new Error(`SOCKET_PORT is not a number.`);
if (process.env.LIVE_DATA_INTERVAL && isNaN(parseInt(process.env.LIVE_DATA_INTERVAL)))
    throw new Error(`LIVE_DATA_INTERVAL is not a number.`);
if (process.env.DUMMY_DATA && process.env.DUMMY_DATA !== `true` && process.env.DUMMY_DATA !== `false`)
    throw new Error(`DUMMY_DATA is not true or false.`);
const dataController = new DataController_1.DataController(process.env.DUMMY_DATA === `true`);
(0, log_1.log)(`green`, `Initialized data controller`);
(0, server_1.startServer)(dataController);
(0, socket_1.startSocket)(dataController);
