const path = require('path');
const mysql = require('mysql');
const csvtojson = require('csvtojson');
const express = require('express');

const home = require('./routes/home');
const authors = require('./routes/authors');
const publishers = require('./routes/authors');
const subjects = require('./routes/authors');
const books = require('./routes/authors');
const users = require('./routes/authors');


const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', home);
app.use('/authors', authors);
app.use('/publishers', publishers);
app.use('/subjects', subjects);
app.use('/books', books);
app.use('/users', users);

var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'LibrarySim'
});

connection.connect(function(err) {
  if (err) {
    console.error('error connecting: ' + err.stack);
    return;
  }

  console.log('connected as id:' + connection.threadId);
});

app.get('/createdb', (req, res) => {
  let sql = 'CREATE DATABASE IF NOT EXISTS LibrarySim';
  connection.query(sql, (err, result) => {
    if (err) throw err;
    res.send('database created...');
  });
});


app.get('/login', (req, res) => {
  res.sendFile('public/html/login.html', {root: __dirname});
});

app.post('/register', (req, res) => {
  registerData = req.body;
  console.log(registerData['first_name']);


});


app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`);
});