const path = require('path');
//const mongoose = require('mongoose');
const mysql = require('mysql');
const csvtojson = require('csvtojson');
const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname, 'public')));


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

app.get('/fillauthorstable', (req, res) => {
  const authorsData = "data/authors.csv";

  csvtojson().fromFile(authorsData).then(source => {
    /*
     sourse is now our json object
    
      [
        source[0] = {FirstName: 'Wally', MiddleName: '', LastName: 'Lamb', slug: 'wall-lamb, biography: Wally Lamb's books...}
        source[1]...
        source[2]...
      ]
    */
    for (let i = 0; i < source.length; i++) {
      // retrieve each attribute in the current row
      let firstName = source[i]['FirstName'],
          middlename = source[i]['MiddleName'],
          lastName = source[i]['LastName'],
          slug = source[i]['slug'],
          bio = source[i]['biography']

      let insertStatement =
      `INSERT INTO authors (firstName, middleName, lastName, Slug, bio) VALUES (?, ?, ?, ?, ?)`;
      var items = [firstName, middlename, lastName, slug, bio];

      connection.query(insertStatement, items, (err, results, fields) => {
        if (err) {
          console.log('Unable to insert item at row ', i+1);
          console.log(err.message);
        }
      });
    }

  res.send('All items successfully inserted to database')
  });
});

app.get('/getauthorstable', (req, res) => {
  let sql = 'SELECT * FROM authors';

  connection.query(sql, (err, results) => {
    if(err) throw err;
    console.log(results);
    res.send('Authors Table Selected');
  });
});


app.get('/createuserstable', (req, res) => {
  let sql = 'CREATE TABLE IF NOT EXISTS Users(ID int NOT NULL AUTO_INCREMENT, AccountNum int NOT NULL, Username VARCHAR(255) NOT NULL, Password VARCHAR(255) NOT NULL, FirstName VARCHAR(255) NOT NULL, LastName VARCHAR(255) NOT NULL, DOB DATE NOT NULL, Address VARCHAR(255) NOT NULL, City VARCHAR(255) NOT NULL, State VARCHAR(255) NOT NULL, Zipcode int NOT NULL, balanceDue FLOAT(5, 2) DEFAULT 0.00, email VARCHAR(255), CreatedAt DATETIME NOT NULL DEFAULT NOW(), PRIMARY KEY(ID))';

  connection.query(sql, (err, result) => {
    if(err) throw err;
    console.log(result);
    res.send('Users Table Created');
  });
});

app.get('/createbookstable', (req, res) => {
  let sql = 'CREATE TABLE IF NOT EXISTS Books(ID int NOT NULL AUTO_INCREMENT, Title VARCHAR(255) NOT NULL, AuthorID int NOT NULL, SubjectID int NOT NULL, Slug VARCHAR(255), Isbn13 int NOT NULL, Isbn10 VARCHAR(255) NOT NULL, Publisher VARCHAR(255) NOT NULL, DatePublished DATE NOT NULL, Price FLOAT(5, 2) NOT NULL Default 0.00, Format VARCHAR(255) NOT NULL, Zipcode int NOT NULL, balanceDue FLOAT(5, 2) DEFAULT 0.00, email VARCHAR(255), CreatedAt DATETIME NOT NULL DEFAULT NOW(), PRIMARY KEY(ID))';

  connection.query(sql, (err, result) => {
    if(err) throw err;
    console.log(result);
    res.send('Books Table Created');
  });
});

app.get('/createauthorstable', (req, res) => {
  let sql = 'CREATE TABLE IF NOT EXISTS Authors(ID int NOT NULL AUTO_INCREMENT, firstName VARCHAR(255) NOT NULL, middleName VARCHAR(255), lastName VARCHAR(255) NOT NULL, Slug VARCHAR(255), bio VARCHAR(255), CreatedAt DATETIME NOT NULL DEFAULT NOW(), PRIMARY KEY(ID))';

  connection.query(sql, (err, result) => {
    if(err) throw err;
    console.log(result);
    res.send('Authors Table Created');
  });
});

app.get('/dropauthorstable', (req, res) => {
  let sql = 'DROP TABLE IF EXISTS authors';

  connection.query(sql, (err, result) => {
    if(err) throw err;
    console.log(result);
    res.send('Authors Table Dropped');
  });
});

app.get('/deleteauthors', (req, res) => {
  let sql = 'DELETE FROM authors';

  connection.query(sql, (err, result) => {
    if(err) throw err;
    console.log(result);
    res.send('All Authors Deleted');
  });
});

app.get('/createsubjectstable', (req, res) => {
  let sql = 'CREATE TABLE IF NOT EXISTS Subjects(ID int NOT NULL AUTO_INCREMENT, Name VARCHAR(255) NOT NULL, Slug VARCHAR(255), CreatedAt DATETIME NOT NULL DEFAULT NOW(), PRIMARY KEY(ID))';

  connection.query(sql, (err, result) => {
    if(err) throw err;
    console.log(result);
    res.send('Subjects Table Created');
  });
});

app.get('/createpublisherstable', (req, res) => {
  let sql = 'CREATE TABLE IF NOT EXISTS Publishers(ID int NOT NULL AUTO_INCREMENT, Name VARCHAR(255) NOT NULL, CreatedAt DATETIME NOT NULL DEFAULT NOW(), PRIMARY KEY(ID))';

  connection.query(sql, (err, result) => {
    if(err) throw err;
    console.log(result);
    res.send('Publishers Table Created');
  });
});


app.get('/', (req, res) => {
  res.sendFile('public/html/home-page.html', {root: __dirname});
});

app.get('/header.html', (req, res) => {
  res.sendFile('public/html/header.html', {root: __dirname});
});

app.get('/footer.html', (req, res) => {
  res.sendFile('public/html/footer.html', {root: __dirname});
});


app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`);
});