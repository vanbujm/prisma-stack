// import {defaultQueue} from './bull';
import { defaultProcessor } from './jobs';
import Queue from 'bull';
import chalk from 'chalk';

const cluster = require('cluster');
const cpus = require('os').cpus();

const { REDIS_PORT, REDIS_HOST } = process.env || { REDIS_PORT: '', REDIS_HOST: '' };

if (cluster.isMaster) {
  console.log(chalk`{black.bold  Worker Server is running }`);

  cpus.forEach(() => cluster.fork());
} else {
  const defaultQueue = new Queue('default queue', `redis://${REDIS_HOST}:${REDIS_PORT}`);
  console.log(chalk`{black.bold  Worker ${process.pid.toString()} started }`);
  defaultQueue.process(defaultProcessor);
}
