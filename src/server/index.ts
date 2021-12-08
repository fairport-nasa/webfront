import { constants } from '../global/constants';
import { DataController } from './comms/DataController';
import { log } from './utils/log';
import { startServer } from './comms/server';
import { startSocket } from './comms/socket';

import { config } from 'dotenv';

// Configure dotenv.
config();

// Check environment variables.
if (!process.env.DUMMY_DATA) log(`yellow`, `WARN`, `LIVE_DATA_INTERVAL is not set. Defaulting to "${constants.DEFAULT_DUMMY_DATA}".`);
else if (process.env.DUMMY_DATA !== `true` && process.env.DUMMY_DATA !== `false`) throw new Error(`DUMMY_DATA is not true or false.`);

if (!process.env.LIVE_DATA_INTERVAL) log(`yellow`, `WARN`, `LIVE_DATA_INTERVAL is not set. Defaulting to "${constants.DEFAULT_LIVE_DATA_INTERVAL}".`);
else if (isNaN(parseInt(process.env.LIVE_DATA_INTERVAL))) throw new Error(`LIVE_DATA_INTERVAL is not a number.`);

if (!process.env.SOCKET_PORT) log(`yellow`, `WARN`, `SOCKET_PORT is not set. Defaulting to "${constants.DEFAULT_SOCKET_PORT}".`);
else if (isNaN(parseInt(process.env.SOCKET_PORT))) throw new Error(`SOCKET_PORT is not a number.`);

if (!process.env.WEBFRONT_PORT) log(`yellow`, `WARN`, `WEBFRONT_PORT is not set. Defaulting to "${constants.DEFAULT_WEBFRONT_PORT}".`);
else if (isNaN(parseInt(process.env.WEBFRONT_PORT))) throw new Error(`WEBFRONT_PORT is not a number.`);

// Create the data controller.
const dataController = new DataController(process.env.DUMMY_DATA ? process.env.DUMMY_DATA === `true` : constants.DEFAULT_DUMMY_DATA);
log(`green`, `INFO`, `Initialized data controller`);

// Start the webfront server.
startServer(dataController);

// Start the socket.
startSocket(dataController);
