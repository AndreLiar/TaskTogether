// src/config/logger.js
const { createLogger, format, transports } = require("winston");

// Define custom log format
const customFormat = format.printf(({ level, message, timestamp, stack }) => {
  return `${timestamp} [${level.toUpperCase()}]: ${stack || message}`;
});

// Create the Winston logger instance
const logger = createLogger({
  level: "info", // minimum level to log (info, error, warn, etc.)
  format: format.combine(
    format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
    format.errors({ stack: true }), // capture stack trace in error logs
    format.splat(),
    format.json(),
    customFormat
  ),
  transports: [
    new transports.Console(),
    // Optionally add a file transport:
    // new transports.File({ filename: 'logs/error.log', level: 'error' }),
    // new transports.File({ filename: 'logs/combined.log' }),
  ],
  exitOnError: false, // do not exit on handled exceptions
});

module.exports = logger;
