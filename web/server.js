const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.static(__dirname + '/dist/todoapp'));

app.get('/*', (req, res) =>
  res.sendFile(__dirname + '/dist/todoapp/index.html'),
);

app.listen(PORT, () => {
  console.log('The server is running -- PORT: ' + PORT)
});
