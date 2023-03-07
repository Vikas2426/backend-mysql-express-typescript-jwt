import * as dotenv from 'dotenv';
import express, { NextFunction } from 'express';
import logger from './Logger';

dotenv.config();
const app = express();
const { PORT } = process.env;

const logRequest=(req: Request, res: Response, next: NextFunction)=>{
    logger.info(`${req.method} ${req.url} ${!!req.body}`);
    next();
};
app.use(logRequest as any);
app.get('/', (req, res)=>{
    res.status(200);
    res.send('🚀 running 🔥');
});
app.listen(PORT, ()=>{
   logger.info(`🚀 Listening on port ${PORT}\n 🔗 http://localhost:${PORT} 🔗`);
});
