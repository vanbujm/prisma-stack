import chalk from 'chalk';
import morgan from 'morgan';

const statusOk = (status: string) => Number(status) >= 200 && Number(status) < 300;
const formatStatusCode = (status: string) => chalk`{${statusOk(status) ? 'blue' : 'red'}.bold ${status}}`;

const formatBody = (body: object) => JSON.stringify(body, null, 2);

const canDisplayBody = (body?: object): boolean => {
  const inDevelopment = process.env.NODE_ENV === 'development';
  const bodyIsNotEmpty = body !== undefined && Object.keys(<object>body).length > 0;
  return inDevelopment && bodyIsNotEmpty;
};

export const morganChalk = morgan((tokens, req, res) =>
  [
    chalk`{green.bold ${tokens.method(req, res)}}`,
    formatStatusCode(tokens.status(req, res)),
    chalk`{white ${tokens.url(req, res)}}`,
    chalk`{yellow ${tokens['response-time'](req, res)} ms}`,
    canDisplayBody(req.body) ? chalk`\n{cyan.bold BODY}\n{magenta ${formatBody(req.body)}}` : null
  ].join(' ')
);

export default morganChalk;
