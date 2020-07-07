import { Application } from '../declarations';
import morgan from 'morgan';
import chalk from 'chalk';
import logger from '../logger';
// Don't remove this comment. It's needed to format import lines nicely.

const stream = {
    write: (text: string) => {
        logger.info(text.trimRight())
    }
}


const morganMiddleware = morgan(function (tokens, req, res) {
    return [
        chalk.hex('#34ace0').bold(tokens.method(req, res)),
        chalk.hex('#ffb142').bold(tokens.status(req, res)),
        chalk.hex('#ff5252').bold(tokens.url(req, res)),
        chalk.hex('#2ed573').bold(tokens['response-time'](req, res) + ' ms'),
        chalk.hex('#f78fb3').bold('@ ' + tokens.date(req, res)),
        chalk.yellow(tokens['remote-addr'](req, res)),
        chalk.hex('#fffa65').bold('from ' + tokens.referrer(req, res)),
    ].join(' ');
},  { "stream": stream });

export default function (app: Application) {
    app.use(morganMiddleware)
}
