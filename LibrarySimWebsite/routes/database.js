var mysql = require('mysql');
const config = require('config');

//var connection = mysql.createConnection(config.get('db_info'));
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

/*
app.get('/createdb', (req, res) => {
    let sql = 'CREATE DATABASE IF NOT EXISTS LibrarySim';
    connection.query(sql, (err, result) => {
      if (err) throw err;
      res.send('database created...');
    });
});
*/

module.exports = connection;