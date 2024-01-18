import {createConnection} from 'mysql2/promise';
import mysql from 'mysql2/promise';
import {Connector} from '@google-cloud/cloud-sql-connector';

const {NODE_ENV, DB_HOST, DB_USER, DB_PASSWORD, DB_NAME, INSTANCE_CONNECT_NAME} = process.env;

async function executeQuery(sql) {
  if (NODE_ENV === 'production') {
    const connector = new Connector();
    const clientOpts = await connector.getOptions({
      instanceConnectionName: INSTANCE_CONNECT_NAME,
      ipType: 'PUBLIC',
    });
    const pool = await mysql.createPool({
      ...clientOpts,
      user: DB_USER,
      password: DB_PASSWORD,
      database: 'simple',
    });
    const conn = await pool.getConnection();
    const [result] = await conn.query(`SELECT NOW();`);
    console.table(result); // prints returned time value from server
    await pool.end();
    connector.close();
    return result;
  } else {
    const connection = await createConnection({
      host: DB_HOST,
      user: DB_USER,
      password: DB_PASSWORD,
      database: DB_NAME,
    });
  
    const [rows, fields] = await connection.execute(sql);
    console.table(rows);
    return rows;  
  }
}

export default { executeQuery };
