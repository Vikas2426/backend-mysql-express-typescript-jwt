import * as dotenv from 'dotenv';
import express, { Request, Response, NextFunction } from 'express';
import logger from './Logger';
import router from './routers';

dotenv.config();
const app = express();
const { PORT } = process.env;

const logRequest = (req: Request, _res: Response, next: NextFunction) => {
    logger.info(`${req.method} ${req.url} ${JSON.stringify(req.body) || ''}`);
    next();
};
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(logRequest);
app.use('/', router);

app.listen(PORT, () => {
    logger.info(`🚀 Listening on port ${PORT}\n 🔗 http://localhost:${PORT} 🔗`);
});
