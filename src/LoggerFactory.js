import { loggers, format, transports } from 'winston';

class LoggerFactory {
  constructor(level) {
    this.level = level;
  }

  create(name) {
    return loggers.add(name, {
      level: this.level,
      format: format.combine(
        format.colorize(),
        format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        format.label({ label: name }),
        format.align(),
        format.printf(info => `${info.timestamp} ${info.level}: [${info.label}] ${info.message}`),
      ),
      transports: [
        new transports.Console(),
      ],
    });
  }
}

export default LoggerFactory;
