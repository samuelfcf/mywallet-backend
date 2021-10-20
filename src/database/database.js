import pg from "pg";

const { Pool } = pg

const connection = new Pool({
  user: 'postgres',
  password: 'semsenha',
  host: 'localhost',
  port: 5432,
  database: 'my_wallet'
});

export default connection;