const express = require('express');
const connection = require('../database/conf');
const multer = require('multer');
const path = require('path');
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

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './src/public/uploads');
  },
  filename: (req, file, cb) => {
    cb(null, `picture-${Date.now()}${path.extname(file.originalname)}`);
  },
});

const upload = multer({ storage });

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

plantRouter.post('/', upload.single('picture'), (req, res) => {
  const validation = schema.validate(req.body);
  const { name, spray, description } = req.body;

  if (validation.error) {
    return res.status(400).send({ error: validation.error.details[0].message });
  }
  const picture = req.file.filename;

  connection.query(`INSERT INTO plant (name, spray, description, picture) 
    VALUES(? , ? , ?, ? )`, [name, spray, description, picture], async (error, rows) => {
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

plantRouter.delete('/:id', (req, res) => {
  const idPlant = req.params.id;

  connection.query('DELETE FROM plant WHERE id = ?', [idPlant], err => {
    if (err) {
      res.status(400).send('error when deleting a plant');
    } else {
      res.sendStatus(200);
    }
  });
});

module.exports = plantRouter;
