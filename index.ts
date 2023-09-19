import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import db from './db';

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

app.get('/', (req: Request, res: Response) => {
  // Test
  db.query('SELECT * FROM abilities', (error, result) => {
    if (error) {
      res.status(500).json(error);
    } else {
      res.json(result.rows);
    }
  });
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
