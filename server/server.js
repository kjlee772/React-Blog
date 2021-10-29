const express = require('express');
const app = express();
const port = process.env.port || 4000;
const bodyParser = require('body-parser');

const router = require('./route');

const sequelize = require('./models').sequelize;
sequelize.sync();

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/', router);

const {
  Teacher,
  Sequelize: { Op }
} = require('./models');
sequelize.query(`SET NAMES utf8;`);

app.post('/add/data', (req, res) => {
  console.log(req.body);

  Teacher.create({
    name: req.body.data
  })
  .then(result => {
    res.send(result);
  })
  .catch(err => {
    console.log(err);
    throw err;
  })
})

app.get('/get/data', (req, res) => {
  Teacher.findAll()
  .then(result => {res.send(result)})
  .catch(err => {throw err})
})

app.get('/api/host', (req, res) => {
  res.send({ host : 'kjlee' });
})

app.listen(port, () => {
  console.log(`Server On : http://localhost:${port}/`);
})