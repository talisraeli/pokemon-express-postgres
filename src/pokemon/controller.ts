import { Request, Response } from 'express';
import db from '../../db';
import queries from './queries';

export const getAll = (req: Request, res: Response) => {
  db.query(queries.getAll, (error, result) => {
    if (error) {
      res.status(500).json(error);
    } else if (result.rows.length === 0) {
      res.status(404).send();
    } else {
      res.json(result.rows);
    }
  });
};
