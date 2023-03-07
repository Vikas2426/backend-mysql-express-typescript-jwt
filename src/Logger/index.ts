import { createLogger, format as _format, transports as _transports } from 'winston';

const logger = createLogger({
    level: 'debug',
    transports: [
    
        new _transports.Console(),
        new _transports.File({ filename: 'debug.log', level: 'debug' }),
        new _transports.File({ filename: 'error.log', level: 'error' }),
        new _transports.File({ filename: 'combined.log' }),
    ],
    exitOnError: false,
    format: _format.combine(
        _format.colorize(),
        _format.timestamp({ format: 'YY-MM-DD / HH:MM:SS' }),
        _format.printf(info => `######\n ${info.timestamp} ${info.level}: ${info.message}\n##### `)
      ),
});

export default logger;