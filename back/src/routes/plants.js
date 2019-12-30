const express = require('express');
const connection = require('../database/conf');
const Joi = require('@hapi/joi');
const getPlant = require('../database/get-plant');

const schema = Joi.object({
  name: Joi.string()
    .min(3)
    .max(50)
    .required(),
  spray: Joi.number()
    .positive()
    .min(1)
    .max(30)
    .required(),
  description: Joi.string(),
  picture: Joi.string()
});

const plantRouter = express.Router();

plantRouter.get('/', (req, res) => {
  connection.query('SELECT * FROM plant', (err, results) => {
    if (err) {
      res.status(400).send('error wile retrieving a plant');
    } else {
      res.json(results);
    }
  });
});

plantRouter.get('/:id', async (req, res) => {
  const plant = await getPlant(req.params.id);
  res.status(200).send(plant);
});

plantRouter.post('/', (req, res) => {
  const validation = schema.validate(req.body);

  if (validation.error) {
    return res.status(400).send({ error: validation.error.details[0].message });
  }

  connection.query('INSERT INTO plant SET ?', req.body, async (error, rows) => {
    if (error) {
      res.status(400).send({ error: 'error when creating a plant' });
    } else {
      const plant = await getPlant(rows.insertId);
      res.status(200).send(plant);
    }
  });
});

plantRouter.put('/:id', (req, res) => {
  const idPlant = req.params.id;
  const formData = req.body;

  connection.query('UPDATE plant SET ? WHERE id = ?', [formData, idPlant], (err) => {
    if (err) {
      res.status(400).send('error when editing a plant');
    } else {
      res.sendStatus(200);
    }
  });
});

module.exports = plantRouter;
