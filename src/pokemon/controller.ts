import { Request, Response } from 'express';
import db from '../../db';
import queries from './queries';
import abilities from './abilities';

/**
 * Gets all Pokemon.
 */
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

/**
 * Inserts new Pokemon with thier abilities.
 */
export const insert = (req: Request, res: Response) => {
  const reqBody = req.body as PokemonInsertDto[];

  if (reqBody.length) {
    const queriesList: Promise<any>[] = [];

    reqBody.forEach((dto) => {
      if (dto.name.length) {
        db.query(queries.insertPokemon, [dto.name], (error, result) => {
          if (error || !result.rows.length) {
            res.status(500).json(error);
          } else {
            // The ID of the new entity.
            const id = result.rows[0].id;

            if (dto.electricity) {
              queriesList.push(
                db.query(queries.insertPokemonAbility, [
                  id,
                  abilities.electricity,
                  dto.electricity,
                ]),
              );
            }

            if (dto.water) {
              queriesList.push(
                db.query(queries.insertPokemonAbility, [
                  id,
                  abilities.water,
                  dto.water,
                ]),
              );
            }

            if (dto.speed) {
              queriesList.push(
                db.query(queries.insertPokemonAbility, [
                  id,
                  abilities.speed,
                  dto.speed,
                ]),
              );
            }
          }
        });
      } else {
        res.status(400).send('Invalid pokemon name.');
      }
    });

    // Wait for all queries to finish.
    Promise.all(queriesList)
      .then(() => {
        res.status(201).send('Pokemon created.');
      })
      .catch((error) => {
        res.status(500).json(error);
      });
  } else {
    res.status(400).send('Invalid request body.');
  }
};
