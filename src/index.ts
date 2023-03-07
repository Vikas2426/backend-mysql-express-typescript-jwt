import * as dotenv from 'dotenv';
import express, { Request, Response, NextFunction } from 'express';
import logger from './Logger';

dotenv.config();
const app = express();
const { PORT } = process.env;

const logRequest = (_error: Error, req: Request, _res: Response, next: NextFunction) => {
    logger.info(`${req.method} ${req.url} ${req.body || ''}`);
    next();
};
app.use(logRequest);
app.get('/', (_req, res) => {
    res.status(200);
    res.send('🚀 running 🔥');
});
app.listen(PORT, () => {
    logger.info(`🚀 Listening on port ${PORT}\n 🔗 http://localhost:${PORT} 🔗`);
});
