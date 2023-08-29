const path = require('path');
const express = require('express');
const app = express();
const port = 3000;

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.sendFile('public/html/home-page.html', {root: __dirname});
});

app.get('/header.html', (req, res) => {
  res.sendFile('public/html/header.html', {root: __dirname})
});

app.get('/footer.html', (req, res) => {
  res.sendFile('public/html/footer.html', {root: __dirname})
});


app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`);
});