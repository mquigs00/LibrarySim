const express = require('express');
const router = express.Router();

router.get('/createsubjectstable', (req, res) => {
    let sql = 'CREATE TABLE IF NOT EXISTS Subjects(ID SMALLINT(3) UNSIGNED NOT NULL AUTO_INCREMENT, Name VARCHAR(255) NOT NULL, CreatedAt DATETIME NOT NULL DEFAULT NOW(), PRIMARY KEY(ID), CONSTRAINT UC_Subject UNIQUE (ID, Name))';
  
    connection.query(sql, (err, result) => {
      if(err) throw err;
      console.log(result);
      res.send('Subjects Table Created');
    });
});
  
router.get('/dropsubjectstable', (req, res) => {
    let sql = 'DROP TABLE IF EXISTS subjects';

    connection.query(sql, (err, result) => {
        if(err) throw err;
        console.log(result);
        res.send('Subjects Table Dropped');
    });
});
  
router.get('/fillsubjectstable', (req, res) => {
    const subjectsData = "data/subjects.csv";

    csvtojson().fromFile(subjectsData).then(source => {
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
            let name = source[i]['name']

            let insertStatement =
            `INSERT INTO subjects (Name) VALUES (?)`;
            var items = [name];
            console.log(name);

            connection.query(insertStatement, items, (err, results, fields) => {
                if (err) {
                    console.log('Unable to insert item at row ', i+1);
                    console.log(err.message);
                }
            });
        }

        res.send('All items successfully inserted to subjects table');
    });
});

module.exports = router;