import PgBoss from 'pg-boss';
import chalk from 'chalk';

const cluster = require('cluster');
const cpus = require('os').cpus();

const options = {
  host: 'localhost',
  database: 'prisma',
  user: 'prisma',
  password: 'prisma',
  poolSize: 5
};

if (cluster.isMaster) {
  console.log(chalk`{black.bold  Worker Server is running }`);

  const boss = new PgBoss(options);

  cpus.forEach(() => cluster.fork());

  boss.start().then(() => {
    cluster.on('exit', ({ process: { pid } }: { process: { pid: number } }) => {
      console.log(`worker ${pid} died`);
    });
  });
} else {
  console.log(chalk`{black.bold  Worker ${process.pid.toString()} started }`);
  const queue = 'some-queue';

  const boss = new PgBoss(options);

  const someAsyncJobHandler = async (job: any) => {
    console.log(chalk`{black.bold  Worker:${process.pid.toString()}: } {blue.bold job received}: ${job.id}`);
    console.log(
      chalk`{black.bold  Worker:${process.pid.toString()}: } {magenta.bold Data:}{magenta ${JSON.stringify(job.data)}}`
    );
  };

  boss.connect().then(boss => {
    boss.subscribe(queue, someAsyncJobHandler);
  });
}
