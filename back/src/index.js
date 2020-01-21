const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const indexRouter = require('./routes/index');
const plantRouter = require('./routes/plants');
const { sendMail } = require('./sendMail');

console.log('sending email...');
sendMail("Hello world", "this is email body it can contain html also");
console.log('email sent ✓');

const port = 8000;

const app = express();
app.use(express.static('src/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors({
  origin: 'http://localhost:3000',
}));

app.use('/', indexRouter);
app.use('/plants', plantRouter);

app.listen(port, (err) => {
  if (err) {
    throw err;
  } else {
    console.log(`API listening on ${port}`);
  }
});
