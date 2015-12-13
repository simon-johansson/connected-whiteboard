
import express from 'express';
import expressConfig from '../config/express'
import routes from './routes'

const app = express();
expressConfig(app);
routes(app);

// Expose app
export default app;
