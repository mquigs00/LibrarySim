const express = require('express');
const router = express.Router();

router.get('/createbookstable', (req, res) => {
    let sql = 'CREATE TABLE IF NOT EXISTS Books(ID SMALLINT(3) UNSIGNED NOT NULL AUTO_INCREMENT, Title VARCHAR(255) NOT NULL, AuthorID SMALLINT(3) UNSIGNED NOT NULL, Slug VARCHAR(255), Isbn13 int NOT NULL, Isbn10 VARCHAR(255) NOT NULL, Price FLOAT(5, 2) NOT NULL DEFAULT 0.00, Format VARCHAR(255) NOT NULL, PublisherID SMALLINT(3) UNSIGNED, SubjectID SMALLINT(3) UNSIGNED NOT NULL, Pages int, CreatedAt DATETIME NOT NULL DEFAULT NOW(), PRIMARY KEY(ID), FOREIGN KEY(AuthorID) REFERENCES authors(ID), FOREIGN KEY(SubjectID) REFERENCES subjects(ID), FOREIGN KEY(PublisherID) REFERENCES publishers(ID), CONSTRAINT UC_Book UNIQUE (ID, Isbn13, Isbn10))';
  
    connection.query(sql, (err, result) => {
      if(err) throw err;
      console.log(result);
      res.send('Books Table Created');
    });
  });
  
router.get('/fillbookstable', (req, res) => {
    const authorsData = "data/books.csv";

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
        let title = source[i]['title'],
            authorID = source[i]['author_id'],
            titleSlug = source[i]['title_slug'],
            isbn13 = source[i]['isbn13'],
            isbn10 = source[i]['isbn10']
            price = source[i]['price'],
            format = source[i]['format'],
            publisherID = source[i]['publisher_id'],
            subjectID = source[i]['subject_id'],
            numPages = source[i]['pages']

        let insertStatement =
        `INSERT INTO books (Title, AuthorID, Slug, Isbn13, Isbn10, Price, Format, PublisherID, SubjectID, Pages) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
        var items = [title, authorID, titleSlug, isbn13, isbn10, price, format, publisherID, subjectID, numPages];

        console.log(price);
        connection.query(insertStatement, items, (err, results, fields) => {
            if (err) {
            console.log('Unable to insert item at row ', i+1);
            console.log(err.message);
            }
        });
    }

    res.send('All items successfully inserted to books table');
    });
});
  
router.get('/dropbookstable', (req, res) => {
    let sql = 'DROP TABLE IF EXISTS books';

    connection.query(sql, (err, result) => {
        if(err) throw err;
        console.log(result);
        res.send('Books Table Dropped');
    });
});

module.exports = router;