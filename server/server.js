const express = require('express');
const app = express();
const port = process.env.port || 3000;

app.get('/', (req, res) => {
  res.send(`Response Complete`);
})

app.listen(port, () => {
  console.log(`Server On : http://localhost:${port}/`);
})