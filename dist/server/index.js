"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ConfigController_1 = require("./controllers/ConfigController");
const constants_1 = require("../global/constants");
const DataController_1 = require("./controllers/DataController");
const log_1 = require("./utils/log");
const server_1 = require("./comms/server");
const socket_1 = require("./comms/socket");
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
if (!process.env.DUMMY_DATA)
    (0, log_1.log)(`yellow`, `WARN`, `DUMMY_DATA is not set. Defaulting to "${constants_1.constants.DEFAULT_DUMMY_DATA}".`);
else if (process.env.DUMMY_DATA !== `true` && process.env.DUMMY_DATA !== `false`)
    throw new Error(`DUMMY_DATA is not true or false.`);
if (!process.env.LIVE_DATA_INTERVAL)
    (0, log_1.log)(`yellow`, `WARN`, `LIVE_DATA_INTERVAL is not set. Defaulting to "${constants_1.constants.DEFAULT_LIVE_DATA_INTERVAL}".`);
else if (isNaN(parseInt(process.env.LIVE_DATA_INTERVAL)))
    throw new Error(`LIVE_DATA_INTERVAL is not a number.`);
if (!process.env.SOCKET_PORT)
    (0, log_1.log)(`yellow`, `WARN`, `SOCKET_PORT is not set. Defaulting to "${constants_1.constants.DEFAULT_SOCKET_PORT}".`);
else if (isNaN(parseInt(process.env.SOCKET_PORT)))
    throw new Error(`SOCKET_PORT is not a number.`);
if (!process.env.WEBFRONT_PORT)
    (0, log_1.log)(`yellow`, `WARN`, `WEBFRONT_PORT is not set. Defaulting to "${constants_1.constants.DEFAULT_WEBFRONT_PORT}".`);
else if (isNaN(parseInt(process.env.WEBFRONT_PORT)))
    throw new Error(`WEBFRONT_PORT is not a number.`);
const configController = new ConfigController_1.ConfigController();
const dataController = new DataController_1.DataController(process.env.DUMMY_DATA ? process.env.DUMMY_DATA === `true` : constants_1.constants.DEFAULT_DUMMY_DATA);
(0, log_1.log)(`green`, `INFO`, `Initialized data controller`);
(0, server_1.startServer)(dataController, configController);
(0, socket_1.startSocket)(dataController);
