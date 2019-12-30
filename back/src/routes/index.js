const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
  res.send('Home Page in /routes/index.js');
});

module.exports = router;
