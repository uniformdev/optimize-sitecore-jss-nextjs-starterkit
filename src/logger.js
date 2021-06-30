/**
 * Simple logger to display tracking details in the console.
 *
 * You can also use a logging package like
 * `loglevel` or `pino` to give better stack traces.
 *
 * https://github.com/pimterry/loglevel
 * https://getpino.io/
 *
 * @type Logger
 */
export const myLogger = {
  debug: (message, data) => {
    console.log(new Date().toISOString() + ' [Uniform Tracker  DEBUG] ' + message, data);
  },
  error: (message, data) => {
    console.log(new Date().toISOString() + ' [Uniform Tracker  ERROR] ' + message, data);
  },
  info: (message, data) => {
    console.log(new Date().toISOString() + ' [Uniform Tracker   INFO] ' + message, data);
  },
  trace: (message, data) => {
    console.log(new Date().toISOString() + ' [Uniform Tracker  TRACE] ' + message, data);
  },
  warn: (message, data) => {
    console.log(new Date().toISOString() + ' [Uniform Tracker   WARN] ' + message, data);
  },
};
