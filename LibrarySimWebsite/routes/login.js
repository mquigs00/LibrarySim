const path = require('path');
const mysql = require('mysql');
const express = require('express');
const router = express.Router();

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

/**
 * Determine if the new user data is fit to be entered to the user database.
 * 
 * @param {JSON} registerData - a JSON with all of the user attributes to be loaded
 */
function validateNewUser(registerData) {
    let first_name = registerData['first_name'];
    let last_name = registerData['last_name'];
    let birthday = registerData['birthday'];
    let address = registerData['address'];
    let city = registerData['city'];
    let zipcode = registerData['zipcode'];
    let username = registerData['username'];
    let password = registerData['password'];
    let password_conf = registerData['password_conf'];

    let sql = 'SELECT COUNT(Username) FROM users WHERE Username=?';

    connection.query(sql, [username], (err, result) => {
        if(err) throw err;
        console.log('Count of provided username: ' + JSON.stringify(result));
    });

    /*
    connection.query(sql, (err, result) => {
        if(err) throw err;
        console.log(result);
    });
    */

    // make sure password has certain attributes and is unique from others in the database and matches the confirmation password
}


router.get('/', (req, res) => {
    res.sendFile(path.resolve('public/html/login.html'));
});


router.post('/', (req, res) => {
    registerData = req.body;
    console.log('Calling register form from login.js!');
    console.log(registerData);
    validateNewUser(registerData);
});

  
module.exports = router;