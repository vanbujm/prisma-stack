import chalk from 'chalk';
import { Job } from 'bull';

declare module 'chalk' {
  interface Chalk {
    (text: TemplateStringsArray, ...placeholders: any[]): string
  }
}

export const defaultProcessor = async (job: Job): Promise<string> => {
  job.progress(50);



  console.log(chalk`{black.bold  Worker:${process.pid}: } {blue.bold job received}: ${job.id}`);
  job.progress(75);
  console.log(
    chalk`{black.bold  Worker:${process.pid}: } {magenta.bold Data:}{magenta ${JSON.stringify(job.data)}}`
  );
  job.progress(100);
  return 'OK';
};

export default { defaultProcessor };
