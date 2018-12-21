import PgBoss from 'pg-boss';

const { DB_USER, DB_PASSWORD, DB_HOST, DB_DATABASE } = process.env;
const options = {
  host: DB_HOST,
  database: DB_DATABASE,
  user: DB_USER,
  password: DB_PASSWORD,
  poolSize: 5
};

export const queue = async () => {
  const boss = new PgBoss(options);

  boss.on('error', error => console.error(error));

  await boss.start();
  return boss;
};

export default queue;
