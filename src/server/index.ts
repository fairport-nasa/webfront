import { startServer } from './comms/startServer';

import { config } from 'dotenv';

// Configure dotenv.
config();

// Check environment variables.
if (!process.env.WEBFRONT_PORT) throw new Error(`WEBFRONT_PORT is not set.`);
if (isNaN(parseInt(process.env.WEBFRONT_PORT))) throw new Error(`WEBFRONT_PORT is not a number.`);
if (!process.env.SOCKET_PORT) throw new Error(`SOCKET_PORT is not set.`);
if (isNaN(parseInt(process.env.SOCKET_PORT))) throw new Error(`SOCKET_PORT is not a number.`);

// Start the fastify server.
startServer();
