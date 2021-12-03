import startServer from './comms/startServer';

// Import modules.
import { config } from 'dotenv';

// Configure dotenv.
config();

// Check environment variables.
if (process.env.NODE_ENV !== `dev` && process.env.NODE_ENV !== `prod`) throw new Error(`NODE_ENV is not properly set.`);

// Start the fastify server.
startServer();
