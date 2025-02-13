const pinoLogger = require("pino");

const levels = {
  emerg: 80,
  alert: 70,
  crit: 60,
  error: 50,
  warn: 40,
  notice: 30,
  info: 20,
  debug: 10,
};
module.exports = pinoLogger({
  timestamp: () => {
    return ', "time":"' + new Date() + '"';
  },
  level: "error",
  customLevels: levels,
  useOnlyCustomLevels: true,
  formatters: {
    level: (label) => {
      return { level: label };
    },
  },
});
