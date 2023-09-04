const express = require('express');
const router = express.Router();

router.get('/createuserstable', (req, res) => {
    let sql = 'CREATE TABLE IF NOT EXISTS Users(ID SMALLINT(3) NOT NULL AUTO_INCREMENT, AccountNum int NOT NULL, Username VARCHAR(255) NOT NULL, Password VARCHAR(255) NOT NULL, FirstName VARCHAR(255) NOT NULL, LastName VARCHAR(255) NOT NULL, DOB DATE NOT NULL, Address VARCHAR(255) NOT NULL, City VARCHAR(255) NOT NULL, State VARCHAR(255) NOT NULL, Zipcode int NOT NULL, balanceDue FLOAT(5, 2) DEFAULT 0.00, email VARCHAR(255), CreatedAt DATETIME NOT NULL DEFAULT NOW(), PRIMARY KEY(ID), CONSTRAINT UC_User UNIQUE (ID, AccountNum, Username))';
  
    connection.query(sql, (err, result) => {
      if(err) throw err;
      console.log(result);
      res.send('Users Table Created');
    });
});

router.get('/dropuserstable', (req, res) => {
    let sql = 'DROP TABLE IF EXISTS users';

    connection.query(sql, (err, result) => {
        if(err) throw err;
        console.log(result);
        res.send('Users Table Dropped');
    });
});

router.get('/deleteusers', (req, res) => {
    let sql = 'DELETE FROM users';

    connection.query(sql, (err, result) => {
        if(err) throw err;
        console.log(result);
        res.send('All Users Deleted');
    });
});

module.exports = router;