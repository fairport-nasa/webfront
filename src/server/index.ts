import ExpressController from './controllers/ExpressController';

// Import modules.
import { config } from 'dotenv';

// Configure dotenv.
config();

// Check environment variables.
if (process.env.NODE_ENV !== `dev` && process.env.NODE_ENV !== `prod`) throw new Error(`NODE_ENV is not properly set.`);

// Create the express controller.
new ExpressController();
