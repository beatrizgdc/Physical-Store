//Configuração do Winston para logs
import { createLogger, format, transports } from 'winston';
import path from 'path';

const { combine, timestamp, label, printf, colorize } = format;

const customFormat = printf(({ level, message, label, timestamp }) => {
    return `${timestamp} [${label}] ${level}: ${message}`;
});

const logger = createLogger({
    format: combine(
        label({ label: 'Physical Store App' }), 
        timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),  
        colorize(),  
        customFormat 
    ),
    transports: [
        new transports.Console({  
            level: 'info'  
        }),
        new transports.File({ 
            filename: path.join(__dirname, '../logs/error.log'),
            level: 'error'  
        }),
        new transports.File({  
            filename: path.join(__dirname, '../logs/combined.log'),
            level: 'info'  
        })
    ]
});

export default logger;
