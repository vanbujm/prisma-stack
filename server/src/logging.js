import chalk from 'chalk';
import morgan from 'morgan';

const statusOk = status => status >= 200 && status < 300;
const formatStatusCode = status => chalk`{${statusOk(status) ? 'blue' : 'red'}.bold ${status}}`;

const morganChalk = morgan((tokens, req, res) =>
  [
    chalk`{green.bold ${tokens.method(req, res)}}`,
    formatStatusCode(tokens.status(req, res)),
    chalk`{white ${tokens.url(req, res)}}`,
    chalk`{yellow ${tokens['response-time'](req, res)} ms}`,
    req.body !== undefined ? chalk`\n{cyan.bold BODY}\n{magenta ${JSON.stringify(req.body, null, 2)}}` : null
  ].join(' ')
);

export default morganChalk;
