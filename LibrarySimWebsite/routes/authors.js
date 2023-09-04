const express = require('express');
const router = express.Router();

router.get('/createauthorstable', (req, res) => {
    let sql = 'CREATE TABLE IF NOT EXISTS Authors(ID SMALLINT(3) UNSIGNED NOT NULL AUTO_INCREMENT, firstName VARCHAR(255) NOT NULL, middleName VARCHAR(255), lastName VARCHAR(255) NOT NULL, Slug VARCHAR(255), bio VARCHAR(255), CreatedAt DATETIME NOT NULL DEFAULT NOW(), PRIMARY KEY(ID), UNIQUE(ID))';
  
    connection.query(sql, (err, result) => {
      if(err) throw err;
      console.log(result);
      res.send('Authors Table Created');
    });
});
  
router.get('/dropauthorstable', (req, res) => {
    let sql = 'DROP TABLE IF EXISTS authors';

    connection.query(sql, (err, result) => {
        if(err) throw err;
        console.log(result);
        res.send('Authors Table Dropped');
    });
});

router.get('/fillauthorstable', (req, res) => {
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

    res.send('All items successfully inserted to authors table');
    });
});

router.get('/getauthorstable', (req, res) => {
    let sql = 'SELECT * FROM authors';

    connection.query(sql, (err, results) => {
        if(err) throw err;
        console.log(results);
        res.send('Authors Table Selected');
    });
});

router.get('/deleteauthors', (req, res) => {
    let sql = 'DELETE FROM authors';

    connection.query(sql, (err, result) => {
        if(err) throw err;
        console.log(result);
        res.send('All Authors Deleted');
    });
});

module.exports = router;