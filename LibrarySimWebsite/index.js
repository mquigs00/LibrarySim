const path = require('path');
const mysql = require('mysql');
const csvtojson = require('csvtojson');
const express = require('express');

const home = require('./routes/home');
const login = require('./routes/login');
const authors = require('./routes/authors');
const publishers = require('./routes/publishers');
const subjects = require('./routes/subjects');
const books = require('./routes/books');
const users = require('./routes/users');

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', home);
app.use('/login', login);
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

/*
app.get('/login', (req, res) => {
  console.log('Calling sendFile');
  res.sendFile(path.resolve('public/html/login.html'));
});

app.post('/registerform', (req, res) => {
  registerData = req.body;
  console.log(registerData);
  //validateNewUser(registerData);
});
*/

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`);
});