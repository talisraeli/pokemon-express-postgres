import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import pokemonRoutes from './src/pokemon/routes';

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

app.use('/pokemon', pokemonRoutes);

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
