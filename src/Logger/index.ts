import { createLogger, format as _format, transports as _transports } from 'winston';
import * as dotenv from 'dotenv';

dotenv.config();

const logger = createLogger({
    level: process.env.LOGGER_LEVEL,
    transports: [
        new _transports.Console(),
        new _transports.File({ filename: process.env.DEBUG_LOG, level: 'debug' }),
        new _transports.File({ filename:  process.env.ERROR_LOG, level: 'error' }),
        new _transports.File({ filename:  process.env.COMBINED_LOG }),
    ],
    exitOnError: false,
    format: _format.combine(
        _format.colorize(),
        _format.timestamp({ format: process.env.TIMESTAMP_FORMAT }),
        _format.printf(info => `################\n [${info.timestamp}] [${info.level}]: ${info.message}\n`)
      ),
});

export default logger;