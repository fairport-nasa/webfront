import { DataController } from './comms/DataController';
import { startServer } from './comms/server';
import { startSocket } from './comms/socket';

import { config } from 'dotenv';

// Configure dotenv.
config();

// Check environment variables.
if (process.env.WEBFRONT_PORT && isNaN(parseInt(process.env.WEBFRONT_PORT))) throw new Error(`WEBFRONT_PORT is not a number.`);
if (process.env.SOCKET_PORT && isNaN(parseInt(process.env.SOCKET_PORT))) throw new Error(`SOCKET_PORT is not a number.`);
if (process.env.LIVE_DATA_INTERVAL && isNaN(parseInt(process.env.LIVE_DATA_INTERVAL))) throw new Error(`LIVE_DATA_INTERVAL is not a number.`);
if (process.env.DUMMY_DATA && process.env.DUMMY_DATA !== `true` && process.env.DUMMY_DATA !== `false`) throw new Error(`DUMMY_DATA is not true or false.`);

// Create the data controller.
const dataController = new DataController(process.env.DUMMY_DATA === `true`);

// Start the webfront server.
startServer(dataController);

// Start the socket.
startSocket(dataController);
